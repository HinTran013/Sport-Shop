import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProvince, resetProvince } from "../redux/provinceSlice";

export default function getProvinceList() {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
    dispatch(resetProvince());
  }, []);
  if (data != null) {
    for (let i = 0; i < data.length; i++) {
      dispatch(setProvince(data[i]).name);
    }
  }
}
