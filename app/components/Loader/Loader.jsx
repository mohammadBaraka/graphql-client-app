import React from "react";
import styles from "./loader.module.css";
export const Loader = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center h-auto z-50 bg-[rgba(0,0,0,0.7)]">
      <div className="w-1/4 h-1/4 p-2 flex justify-center items-center rounded-xl">
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};
