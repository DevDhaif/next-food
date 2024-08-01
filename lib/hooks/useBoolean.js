"use client";
import { useState } from "react";

function useBoolean(initial = true) {
  const [value, setValue] = useState(initial);

  const toggle = () => setValue((prev) => !prev);

  return { value, toggle };
}
export default useBoolean;
