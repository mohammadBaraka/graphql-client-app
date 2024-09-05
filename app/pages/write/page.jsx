"use client";
import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Input } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import {
  CreatePostMutation,
  UpdatePostMutation,
} from "@/app/graphql/Mutations/PostMutation";
import { UseSendToken } from "@/app/graphql/Queris/SenTokn";
import { msg } from "@/app/utils/msg";
import { GetAllCategories } from "@/app/graphql/Queris/Ctegory";
import { GetPost } from "@/app/graphql/Queris/Post";
import Bublish from "@/app/components/WriteComponents/Bublish";
import Categoris from "@/app/components/WriteComponents/Categoris";
import { Loader } from "@/app/components/Loader/Loader";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
export default function Home() {
  // ==================QUERY AND MUTATIONS================
  const params = useSearchParams().get("post");
  const { data: post, loading: loadingPost } = GetPost(params);
  const { data: token } = UseSendToken();
  const {
    updatePost,
    data: dataUpdate,
    loading: loadingUpdate,
  } = UpdatePostMutation();
  const userId = token?.sendToken?.id;
  const categorieIds = post?.getOnePost?.categories?.map((cat) => cat?.id);

  const [inputs, setInputs] = useState({
    title: post?.getOnePost?.title || "",
    desc: post?.getOnePost?.desc || "",
    userId: userId,
    img: post?.getOnePost?.img || null,
    categoryId: categorieIds || [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    params && setImagePreview(post?.getOnePost?.img);
  }, [params]);

  const {
    createPost,
    loading: loadingCreate,
    data,
    error: errorCreate,
  } = CreatePostMutation(inputs);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      id: params,
      title: inputs.title,
      desc: inputs.desc,
      img: inputs.img,
      categoryId: inputs.categoryId,
    });
    params
      ? updatePost({
          variables: {
            id: params,
            title: inputs.title,
            desc: inputs.desc,
            img: inputs.img,
            userId: userId,
            categoryId: inputs.categoryId,
          },
        })
          .then((res) => {
            console.log("🚀 ~ .then ~ res:", res);
            msg("success", "Post Updated Successfully");
          })
          .catch((err) => {
            console.log(err);
            msg("error", err?.message);
          })
      : createPost()
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
        [name]: files[0],
      }));

      setImagePreview(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      // Handle checkbox for category selection
      setInputs((prevState) => ({
        ...prevState,
        categoryId: prevState.categoryId.includes(name)
          ? prevState.categoryId.filter((id) => id !== name)
          : [...prevState.categoryId, name],
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

  const { data: categories, loading } = GetAllCategories();

  return (
    <Suspense>
      {loading || loadingPost ? <Loader /> : null}
      <Input
        type="hidden"
        color="teal"
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
          {/* Bublish Component */}
          <Bublish
            loadingUpdate={loadingUpdate}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            params={params}
            loadingCreate={loadingCreate}
            imagePreview={imagePreview}
          />
          <div className="border border-spacing-2 border-gray-200 h-full">
            {/*  Categories Component */}
            <Categoris
              categories={categories}
              handleChange={handleChange}
              inputs={inputs}
            />
          </div>
        </div>
      </main>
    </Suspense>
  );
}
