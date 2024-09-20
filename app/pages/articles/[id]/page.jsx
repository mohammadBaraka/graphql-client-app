"use client";
import { Loader } from "@/app/components/Loader/Loader";
import { DeltePostMutation } from "@/app/graphql/Mutations/PostMutation";
import { GetPost, GetPostByCategory } from "@/app/graphql/Queris/Post";
import { UseSendToken } from "@/app/graphql/Queris/SenTokn";
import { msg } from "@/app/utils/msg";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import React from "react";
import Swal from "sweetalert2";
import OtherPost from "@/app/components/OtherPost";
const SinglePost = () => {
  const navigate = useRouter();
  const param = useParams();
  const { deletePost, loading: deleteLoading } = DeltePostMutation();
  const { data, loading, error } = GetPost(param.id);
  const { data: categories } = GetPostByCategory(
    data?.getOnePost?.categories[0]?.id
  );
  const post = data?.getOnePost;
  console.log("🚀 ~ SinglePost ~ post:", post?.Users.id);
  const { data: user } = UseSendToken();
  const ownerPost = post?.usersId === user?.sendToken?.id;
  // categories
  const handleDelte = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deletePost({
            variables: {
              id: param?.id,
            },
          });
          msg("success", "Post deleted successfully");
          setTimeout(() => {
            navigate.push("/pages/articles");
          }, 2000);
        }
      });
    } catch (error) {
      msg("error", error?.message);
    }
  };

  if (loading || deleteLoading) {
    return <Loader />;
  }
  return (
    <div className="flex w-[90%] mx-auto mt-marginGlobal justify-between">
      <div className="w-1/2 flex flex-col gap-6">
        <Image
          src={post?.img}
          alt="user"
          width={100}
          height={100}
          className="w-full h-1/2 rounded-md"
        />

        <div className="flex items-center gap-4">
          <Link href={`/pages/profile?id=${post?.Users.id}`}>
            <Image
              src={post?.Users?.img}
              alt="user"
              width={100}
              height={100}
              className="rounded-full w-24 h-24"
            />
          </Link>
          <div className="">
            <h4 className="text-xl font-bold text-gray-700">
              {post?.Users?.name}
            </h4>
            {ownerPost && (
              <div className="flex items-center gap-8">
                <Image
                  onClick={handleDelte}
                  alt="delete"
                  src="/delete.png"
                  width={50}
                  height={50}
                  className="w-6 h-6 cursor-pointer"
                />
                <Link href={`/pages/write/?post=${post?.id}`}>
                  <Image
                    alt="edit"
                    src="/edit.png"
                    width={50}
                    height={50}
                    className="w-8 h-8 cursor-pointer"
                    state={post}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-500">{post?.title}</h3>
        <div
          className="font-bold text-xl"
          dangerouslySetInnerHTML={{ __html: post?.desc }}
        />
      </div>
      {/* Other Posts */}
      <OtherPost categories={categories} />
    </div>
  );
};

export default SinglePost;
