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
