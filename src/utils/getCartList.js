import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";

export const getCartListFromDatabase = async () => {
  const dbRef = ref(getDatabase());
  const userId = getAuth().currentUser.uid;
  const data = await get(child(dbRef, `users/${userId}/cart`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return Object.values(data);
};
