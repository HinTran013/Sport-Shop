import { database } from "../../firebase-config";
import { ref, onValue, query, limitToLast, equalTo } from "firebase/database";

// const productRef = ref(database, "data/products");

const getProductInfo = (productId) => {
  const productRef = ref(database, "data/products/" + productId);
  let productData;

  onValue(productRef, (snapShot) => {
    const data = snapShot.val();
    productData = data;
  });

  console.log(productData);
  return productData;
};

const getRecentProductNodes = (numberOfProducts, setDataFunc) => {
  let recentData = [];

  const recentProductsQuery = query(
    ref(database, "/data/products"),
    limitToLast(numberOfProducts)
  );

  onValue(recentProductsQuery, (snapShot) => {
    const recentNodes = snapShot.val();
    for (let childNodeKey in recentNodes) {
      recentData.push(recentNodes[childNodeKey]);
    }

    setDataFunc(recentData);
  });
};

const getHotProducts = (numberOfProducts, setDataFunc) => {
  let hotProducts = [];

  const productRef = ref(database, "data/products");

  onValue(productRef, (snapShot) => {
    snapShot.forEach((childSnapShot) => {
      if (childSnapShot.child("hot").val() === true) {
        hotProducts.push(childSnapShot.val());
      }
    });

    hotProducts = hotProducts.slice(0, numberOfProducts - 1);
    setDataFunc(hotProducts);
  });
};

const getSaleProducts = (numberOfProducts, setDataFunc) => {
  let saleProducts = [];

  const productRef = ref(database, "data/products");

  onValue(productRef, (snapShot) => {
    snapShot.forEach((childSnapShot) => {
      if (childSnapShot.child("sale").val() === true) {
        saleProducts.push(childSnapShot.val());
      }
    });

    saleProducts = saleProducts.slice(0, numberOfProducts);
    setDataFunc(saleProducts);
  });
};

export {
  getProductInfo,
  getRecentProductNodes,
  getHotProducts,
  getSaleProducts,
};
