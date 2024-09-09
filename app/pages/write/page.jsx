"use client";
import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Input } from "@material-tailwind/react";
import {
  CreatePostMutation,
  UpdatePostMutation,
} from "@/app/graphql/Mutations/PostMutation";
import { UseSendToken } from "@/app/graphql/Queris/SenTokn";
import { msg, msgError, msgSucess } from "@/app/utils/msg";
import { GetAllCategories } from "@/app/graphql/Queris/Ctegory";
import { GetPost } from "@/app/graphql/Queris/Post";
import Bublish from "@/app/components/WriteComponents/Bublish";
import Categoris from "@/app/components/WriteComponents/Categoris";
import { Loader } from "@/app/components/Loader/Loader";
import { useParams, useSearchParams } from "next/navigation";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Home() {
  const param = useParams();
  console.log("🚀 ~ Home ~ param:", param.post);
  const postId = useSearchParams().get("post");

  const { data: postData, loading: loadingPost } = GetPost(postId);
  const { data: token } = UseSendToken();
  const {
    updatePost,
    data: dataUpdate,
    loading: loadingUpdate,
  } = UpdatePostMutation();
  const userId = token?.sendToken?.id;
  const categorieIds = postData?.getOnePost?.categories?.map((cat) => cat?.id);

  const [inputs, setInputs] = useState({
    title: postData?.getOnePost?.title || "",
    desc: postData?.getOnePost?.desc || "",
    userId: userId,
    img: postData?.getOnePost?.img || null,
    categoryId: categorieIds || [],
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (postId && postData?.getOnePost?.img) {
      setImagePreview(postData?.getOnePost?.img);
    }
  }, [postId, postData]);

  const {
    createPost,
    loading: loadingCreate,
    data,
    error: errorCreate,
  } = CreatePostMutation(inputs);

  const handleSubmit = (e) => {
    e.preventDefault();
    postId
      ? updatePost({
          variables: {
            id: postId,
            title: inputs.title,
            desc: inputs.desc,
            img: inputs.img,
            userId: userId,
            categoryId: inputs.categoryId,
          },
        })
          .then((res) => {
            msgSucess("Post Updated Successfully");
            setInputs({
              title: "",
              desc: "",
              img: null,
              categoryId: [],
            });
          })
          .catch((err) => {
            msgError(err?.message);
          })
      : createPost()
          .then(() => {
            msgSucess("Post Created Successfully");
            setInputs({
              title: "",
              desc: "",
              img: null,
              categoryId: [],
            });
            setImagePreview(null);
          })
          .catch((err) => {
            msgError(err?.message);
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
    <Suspense fallback={<Loader />}>
      {loading || loadingPost ? <Loader /> : null}
      <Input
        type="hidden"
        color="teal"
        value={inputs.userId}
        name="usersId"
        onChange={handleChange}
      />
      <main
        className="flex flex-col lg:flex-row  w-[100%] items-center lg:items-stretch
      lg:w-[70%] mx-auto gap-8 lg:mt-marginGlobal"
      >
        <div className="flex flex-col gap-4 lg:h-[59vh] w-2/3">
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
            onChange={handleDescChange}
          />
        </div>

        <div className="lg:w-[40%] w-2/3 h-[65vh] flex flex-row justify-between lg:flex-col gap-4">
          <div className="w-1/2 lg:w-full">
            <Bublish
              loadingUpdate={loadingUpdate}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              params={postId}
              loadingCreate={loadingCreate}
              imagePreview={imagePreview}
            />
          </div>
          <div className="border border-spacing-2 border-gray-200 h-full w-1/2 lg:w-full">
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
