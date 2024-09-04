"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Button, Checkbox, Input } from "@material-tailwind/react";

import Image from "next/image";
import { CreatePostMutation } from "@/app/graphql/Mutations/PostMutation";
import { UseSendToken } from "@/app/graphql/Queris/SenTokn";
import { msg } from "@/app/utils/msg";
import { GetAllCategories } from "@/app/graphql/Queris/ctegory";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Home() {
  const { data: token } = UseSendToken();
  const userId = token?.sendToken?.id;
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    userId: userId,
    img: null,
    categoryId: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const {
    createPost,
    loading: loadingCreate,
    data,
    error: errorCreate,
  } = CreatePostMutation(inputs);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({
      variables: {
        title: inputs.title,
        desc: inputs.desc,
        img: inputs.img, // Ensure this is passed correctly
        categoryId: inputs.categoryId,
      },
    })
      .then(() => {
        msg("success", "Post Created Successfully");
      })
      .catch((err) => {
        console.log(err?.message);
        msg("error", err?.message);
      });
  };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setInputs((prevState) => ({
        ...prevState,
        [name]: files[0], // Set the file object
      }));

      setImagePreview(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      // Handle checkbox for category selection
      setInputs((prevState) => ({
        ...prevState,
        categoryId: prevState.categoryId.includes(name)
          ? prevState.categoryId.filter((id) => id !== name) // Remove if already selected
          : [...prevState.categoryId, name], // Add if not selected
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleDescChange = (value) => {
    setInputs((prevState) => ({
      ...prevState,
      desc: value,
    }));
  };

  const { data: categories, loading, error } = GetAllCategories();

  return (
    <>
      <Input
        type="hidden"
        color="teal"
        label="User Id"
        value={inputs.userId}
        name="usersId"
        onChange={handleChange}
      />
      <main className="flex justify-between w-[70%] mx-auto gap-8 mt-marginGlobal">
        <div className="flex flex-col gap-4 h-[59vh] w-2/3">
          <Input
            color="teal"
            label="Title"
            value={inputs.title}
            name="title"
            onChange={handleChange}
          />
          <QuillEditor
            className="h-full"
            value={inputs.desc}
            onChange={handleDescChange} // Use handleDescChange for QuillEditor
          />
        </div>

        <div className="w-[40%] h-[65vh] flex flex-col gap-4">
          <div className="border border-spacing-2 border-gray-200 h-auto py-4">
            <div className="px-4 flex flex-col gap-3">
              <h2 className="font-bold text-2xl">Publish</h2>
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
                <Button
                  loading={loadingCreate ? true : false}
                  onClick={handleSubmit}
                  color="teal"
                  type="submit"
                  className="rounded-lg p-2 w-1/3"
                >
                  Publish
                </Button>
              </span>
              {imagePreview && (
                <Image
                  width={100}
                  height={10}
                  src={imagePreview}
                  alt="image"
                  className="rounded-full"
                />
              )}
            </div>
          </div>
          <div className="border border-spacing-2 border-gray-200 h-full">
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
          </div>
        </div>
      </main>
    </>
  );
}
