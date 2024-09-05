import { Checkbox } from "@material-tailwind/react";
import React from "react";

const Categoris = ({ categories, inputs, handleChange }) => {
  return (
    <div className="px-4 mt-2 flex flex-col">
      <h2 className="font-bold text-2xl">Category</h2>
      <span className="flex flex-col">
        {categories?.getAllCategories?.map((cat) => (
          <Checkbox
            key={cat?.id}
            color="teal"
            label={cat?.title}
            checked={inputs.categoryId.includes(cat?.id)}
            name={cat?.id}
            onChange={handleChange}
          />
        ))}
      </span>
    </div>
  );
};

export default Categoris;
