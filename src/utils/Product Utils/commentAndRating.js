import { database } from "../../firebase-config";
import { ref, onValue, query, limitToLast, equalTo } from "firebase/database";

export const getProductNumberOfRatings = (productId, setData) => {
  const productRef = ref(database, "/data/products" + productId);
  onValue(productRef, (snapShot) => {
    const reviews = snapShot.child("numberOfReviews").val();
    setData(reviews);
  });
};
