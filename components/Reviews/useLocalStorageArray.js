import { useState } from "react";

export const useLocalStorageArray = (key) => {
  const getArray = () => JSON.parse(localStorage.getItem(key) || "[]");
  const setArray = (array) => localStorage.setItem(key, JSON.stringify(array));

  return [getArray, setArray];
};
