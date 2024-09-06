"use client";

import { useSearchParams } from "next/navigation";
const GetPrams = () => {
  const params = useSearchParams().get("post");
  return params;
};

export default GetPrams;
