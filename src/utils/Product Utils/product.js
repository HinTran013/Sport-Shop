import { database } from "../../firebase-config";
import { ref, onValue, query, limitToLast, equalTo } from "firebase/database";
import { set } from "react-native-reanimated";

// const productRef = ref(database, "data/products");

const getProductInfo = (productId, setData) => {
  const productRef = ref(database, "data/products/" + productId);
  let productData;

  onValue(productRef, (snapShot) => {
    const data = snapShot.val();
    productData = data;
    setData(data);
  });

  return productData;
};

const getAllProducts = (setData) => {
  let productsList = [];
  const productsRef = ref(database, "data/products");

  onValue(productsRef, (snapShot) => {
    snapShot.forEach((item) => {
      productsList.push(item.val());
    });

    setData(productsList);
  });
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

// get relative items (the products which are the same category as the product you're viewing)
const getRelativeProducts = (numberOfProducts, category, setDataFunc) => {
  let relativeProducts = [];
  const productRef = ref(database, "data/products");

  onValue(productRef, (snapShot) => {
    snapShot.forEach((childSnapShot) => {
      if (childSnapShot.child("category").val() === category) {
        relativeProducts.push(childSnapShot.val());
      }
    });

    relativeProducts = relativeProducts.slice(0, numberOfProducts);
    setDataFunc(relativeProducts);
  });
};

const updateFavoriteProduct = (productId, isFavorite) => {
  const favoriteRef = ref(database, `data/products/${productId}/isFavorite`);

  set(favoriteRef, isFavorite);
};

export {
  getAllProducts,
  getProductInfo,
  getRecentProductNodes,
  getHotProducts,
  getSaleProducts,
  getRelativeProducts,
  updateFavoriteProduct,
};
