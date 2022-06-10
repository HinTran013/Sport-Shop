import { getDatabase, ref, child, get, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

export default (props) => {
  const db = getDatabase();
  let index = 0;
  const currentUser = getAuth().currentUser;
  const starCountRef = ref(db, "users/" + currentUser.uid + "/orders/index");
  onValue(starCountRef, (snapshot) => {
    index = snapshot.val();
  });
  if (index == null) {
    set(ref(db, "users/" + currentUser.uid + "/orders/index"), 1);
  } else {
    set(ref(db, "users/" + currentUser.uid + "/orders/index"), index + 1);
  }
  const date = new Date();
  const newOrder = {
    id: "order" + index,
    addressId: props.addressId,
    payment: props.payment,
    delivery: props.delivery,
    deliveryFee: props.deliveryFee,
    orderPrice: props.orderPrice,
    date: date,
    productList: props.cartList,
  };
  set(ref(db, "users/" + currentUser.uid + `/orders/order${index}`), newOrder);
  set(ref(db, "users/" + currentUser.uid + "/cart"), null);
};
