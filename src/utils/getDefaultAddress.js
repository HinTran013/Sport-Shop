import { useState } from "react";
import { useSelector } from "react-redux";

export default () => {
  let result = null;
  const list = useSelector((state) => state.address.listAddresses);

  if (list != null) {
    result = list[0];
    list.forEach((element) => {
      if (element.default == true) {
        result = element;
      }
    });
  }
  return result;
};
