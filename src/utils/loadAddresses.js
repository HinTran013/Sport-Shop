import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { setAddress, resetAddress } from "../redux/addressSlice";
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
