"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Loader } from "./Loader/Loader";
const GetPrams = () => {
  const params = useSearchParams().get("post");
  return <Suspense fallback={<Loader />}>{params}</Suspense>;
};

export default GetPrams;
