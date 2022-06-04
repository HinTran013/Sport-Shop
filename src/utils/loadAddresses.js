import { getDatabase, ref, child, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { setAddress, resetAddress, setDefault } from "../redux/addressSlice";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  dispatch(resetAddress());
  const currentUser = getAuth().currentUser;
  if (currentUser != null) {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${currentUser.uid}/addresses`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach((key) => {
            if (key != "index") {
              dispatch(setAddress(data[key]));
            }
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
export const setDefaultAddress = (id) => {
  const dbRef = ref(getDatabase());
  const db = getDatabase();
  const userId = getAuth().currentUser.uid;
  get(child(dbRef, `users/${userId}/addresses`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        Object.keys(data).map((item) => {
          if (item != "index") {
            set(
              ref(db, `users/${userId}/addresses/${data[item].id}/default`),
              false
            );
          }
        });
        set(ref(db, `users/${userId}/addresses/${id}/default`), true);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
export const deleteAddressFromDatabase = (id) => {
  const db = getDatabase();
  const userId = getAuth().currentUser.uid;
  set(ref(db, `users/${userId}/addresses/${id}`), null);
};
