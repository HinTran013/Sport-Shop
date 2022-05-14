import { database } from "../../firebase-config";
import {
  ref,
  onValue,
  query,
  limitToLast,
  equalTo,
  push,
} from "firebase/database";

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

export const writeReview = (comment, date, rating, user, userId, productId) => {
  // product comments
  const reviewRef = ref(database, "/data/products/" + productId + "/reviews");
  push(reviewRef, {
    comment,
    date,
    rating,
    user,
  });
  // save user comments
  const userReviewRef = ref(database, "/users/" + userId + "/reviews");
  push(userReviewRef, {
    comment,
    date,
    rating,
    user,
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
