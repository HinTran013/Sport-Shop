import { database } from "../../firebase-config";
import {
  ref,
  onValue,
  query,
  limitToLast,
  equalTo,
  update,
  push,
  get,
  remove,
} from "firebase/database";
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
  const productsRef = ref(database, "data/products");

  onValue(productsRef, (snapShot) => {
    let data = snapShot.val();
    data.shift();

    setData(data);
  });
};

const getRecentProductNodes = (numberOfProducts, setDataFunc) => {
  const recentProductsQuery = query(
    ref(database, "/data/products"),
    limitToLast(numberOfProducts)
  );

  onValue(recentProductsQuery, (snapShot) => {
    let recentData = [];

    const recentNodes = snapShot.val();
    for (let childNodeKey in recentNodes) {
      recentData.push(recentNodes[childNodeKey]);
    }

    setDataFunc(recentData);
  });
};

const getHotProducts = (numberOfProducts, setDataFunc) => {
  const productRef = ref(database, "data/products");

  onValue(productRef, (snapShot) => {
    let hotProducts = [];

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
  const productRef = ref(database, "data/products");

  onValue(productRef, (snapShot) => {
    let saleProducts = [];

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

const addAFavoriteProduct = (
  userId,
  brand,
  category,
  colors,
  detailedDesc,
  id,
  images,
  name,
  numberOfReviews,
  price,
  shippingInfo,
  shortDesc,
  sizes,
  supportInfo,
  totalRating
) => {
  const favorRef = ref(database, `users/${userId}/favoriteProducts`);
  push(favorRef, {
    brand,
    category,
    colors,
    detailedDesc,
    id,
    images,
    name,
    numberOfReviews,
    price,
    shippingInfo,
    shortDesc,
    sizes,
    supportInfo,
    totalRating,
  });
};

const getFavoriteProducts = (userId, setData) => {
  const favorRef = ref(database, `users/${userId}/favoriteProducts`);

  onValue(favorRef, (snapShot) => {
    const data = [];
    snapShot.forEach((child) => {
      data.push(child.val());
    });
    setData(data);
  });
};

const isFavoriteProduct = (productId, userId) => {
  const favorRef = ref(database, `users/${userId}/favoriteProducts`);

  return get(favorRef).then((res) => {
    let result = false;

    res.forEach((child) => {
      if (child.val().id == productId) {
        result = true;
      }
    });
    return result;
  });
};

const deleteAFavoriteProduct = (productId, userId) => {
  const favorRef = ref(database, `users/${userId}/favoriteProducts`);

  get(favorRef)
    .then((res) => {
      let idToDelete;
      res.forEach((child) => {
        if (productId == child.val().id) {
          idToDelete = child.key;
        }
      });
      return idToDelete;
    })
    .then((idToDelete) => {
      remove(ref(database, `users/${userId}/favoriteProducts/${idToDelete}`));
    });
};

export {
  getAllProducts,
  getProductInfo,
  getRecentProductNodes,
  getHotProducts,
  getSaleProducts,
  getRelativeProducts,
  getFavoriteProducts,
  addAFavoriteProduct,
  isFavoriteProduct,
  deleteAFavoriteProduct,
};
