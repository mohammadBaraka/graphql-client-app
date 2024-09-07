import { Button } from "@material-tailwind/react";
import Image from "next/image";

const Bublish = ({
  params,
  handleChange,
  loadingCreate,
  handleSubmit,
  imagePreview,
  loadingUpdate,
}) => {
  return (
    <div className="border border-spacing-2 border-gray-200 h-auto py-4">
      <div className="px-4 flex flex-col gap-3 ">
        <h2 className="font-bold text-2xl">{params ? "Edit" : "bublish"}</h2>
        <span className="flex items-center gap-2">
          <h3 className="font-bold text-lg">Status:</h3>
          <p className="font-bold text-gray-400">Draft</p>
        </span>

        <span className="flex items-center gap-2">
          <h3 className="font-bold text-lg">Visibility:</h3>
          <p className="font-bold text-gray-400">Public</p>
        </span>

        <span className="flex items-center justify-between">
          <input
            type="file"
            id="html"
            hidden
            name="img"
            onChange={handleChange}
          />
          <label
            htmlFor="html"
            className="cursor-pointer tex-lg font-bold 
        border border-dashed px-2 py-1 border-teal-500 border-spacing-7 rounded-lg"
          >
            Upload Image
          </label>
          {params ? (
            <Button
              loading={loadingUpdate ? true : false}
              onClick={handleSubmit}
              color="blue"
              type="submit"
              className="rounded-lg p-2 w-1/3"
            >
              Edit
            </Button>
          ) : (
            <Button
              loading={loadingCreate ? true : false}
              onClick={handleSubmit}
              color="teal"
              type="submit"
              className="rounded-lg p-2 w-1/3"
            >
              Publish
            </Button>
          )}
        </span>
        {imagePreview && (
          <div className="w-full flex justify-center">
            <Image
              width={100}
              height={10}
              src={imagePreview}
              alt="image"
              className="rounded-full w-20 h-20 object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bublish;
