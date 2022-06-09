import { database } from "../../firebase-config";
import {
  ref,
  onValue,
  query,
  limitToLast,
  equalTo,
  push,
  update,
  get,
  remove,
} from "firebase/database";
import { nanoid } from "@reduxjs/toolkit";

export const getProductNumberOfRatings = (productId, setData) => {
  const productRef = ref(
    database,
    "/data/products/" + productId + "/numberOfReviews"
  );

  onValue(productRef, (snapShot) => {
    setData(snapShot.val());
  });
};

export const getProductTotalRating = (productId, setData) => {
  const productRef = ref(
    database,
    "/data/products/" + productId + "/totalRating"
  );

  onValue(productRef, (snapShot) => {
    setData(snapShot.val());
  });
};

export const writeReview = (
  comment,
  date,
  rating,
  user,
  userId,
  productId,
  productName
) => {
  // product comments
  const reviewRef = ref(database, "/data/products/" + productId + "/reviews");
  let reviewId = nanoid(8);

  return push(reviewRef, {
    comment,
    date,
    rating,
    user,
    productId,
    productName,
    reviewId,
    userId,
  })
    .then(() => {
      // update number of reviews and total rating
      get(ref(database, "/data/products/" + productId))
        .then((snapShot) => {
          return {
            totalRating: snapShot.val().totalRating,
            numberOfReviews: snapShot.val().numberOfReviews,
          };
        })
        .then((res) => {
          update(ref(database, "/data/products/" + productId), {
            numberOfReviews: res.numberOfReviews + 1,
            totalRating: res.totalRating + rating,
          });
        });
    })
    .then(() => {
      // save user comments
      const userReviewRef = ref(database, "/users/" + userId + "/reviews");
      push(userReviewRef, {
        comment,
        date,
        rating,
        user,
        productId,
        productName,
        reviewId,
        userId,
      });
    });
};

export const editReview = (
  comment,
  date,
  rating,
  user,
  userId,
  productId,
  productName,
  reviewId,
  oldRating
) => {
  const reviewRef = ref(database, "/data/products/" + productId + "/reviews");

  return get(reviewRef)
    .then((snapShot) => {
      snapShot.forEach((child) => {
        if (child.val().reviewId === reviewId) {
          update(child.ref, {
            comment,
            date,
            rating,
          });
        }
      });
    })
    .then(() => {
      // update in user comments
      const userReviewRef = ref(database, "/users/" + userId + "/reviews");

      get(userReviewRef).then((snapShot) => {
        snapShot.forEach((child) => {
          if (child.val().reviewId === reviewId) {
            update(child.ref, {
              comment,
              date,
              rating,
            });
          }
        });
      });
    })
    .then(() => {
      const productRef = ref(database, "/data/products/" + productId);

      get(productRef).then((snapShot) => {
        update(productRef, {
          totalRating: snapShot.val().totalRating - oldRating + rating,
        });
      });
    });
};

export const deleteReview = (productId, reviewId, userId, rating) => {
  const productRef = ref(database, "/data/products/" + productId);

  return get(productRef)
    .then((snapShot) => {
      update(productRef, {
        numberOfReviews: snapShot.val().numberOfReviews - 1,
        totalRating: snapShot.val().totalRating - rating,
      });
    })
    .then(() => {
      const reviewRef = ref(
        database,
        "/data/products/" + productId + "/reviews"
      );

      get(reviewRef).then((snapShot) => {
        snapShot.forEach((child) => {
          if (child.val().reviewId === reviewId) {
            remove(child.ref);
          }
        });
      });
    })
    .then(() => {
      const userReviewRef = ref(database, "/users/" + userId + "/reviews");

      get(userReviewRef).then((snapShot) => {
        snapShot.forEach((child) => {
          if (child.val().reviewId === reviewId) {
            remove(child.ref);
          }
        });
      });
    });
};

export const getAllProductReviews = (productId, setData) => {
  const ReviewRef = ref(database, "/data/products/" + productId + "/reviews");
  onValue(ReviewRef, (snapShot) => {
    let reviews = [];

    snapShot.forEach((child) => {
      reviews.push(child.val());
    });
    setData(reviews);
  });
};
