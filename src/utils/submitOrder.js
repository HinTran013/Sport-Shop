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
  const currentDate =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  let trackingNumber = "";
  for (let i = 0; i < 9; i++) {
    trackingNumber += Math.floor(Math.random() * 10);
  }
  const newOrder = {
    id: "order" + index,
    address: props.address,
    payment: props.payment,
    delivery: props.delivery,
    deliveryFee: props.deliveryFee,
    orderPrice: props.orderPrice,
    date: currentDate,
    trackingNumber: trackingNumber,
    status: "Processing",
    productList: props.cartList,
  };
  set(ref(db, "users/" + currentUser.uid + `/orders/order${index}`), newOrder);
  set(ref(db, "users/" + currentUser.uid + "/cart"), null);
};
