"use client";
import { GetPost } from "@/app/graphql/Queris/Post";
import { UseSendToken } from "@/app/graphql/Queris/SenTokn";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const SinglePost = () => {
  const search = useSearchParams();
  console.log("🚀 ~ singlePost ~ search:", search);
  const param = useParams();
  const { data, loading, error } = GetPost(param.id);
  const post = data?.getOnePost;
  const { data: user } = UseSendToken();
  const ownerPost = post?.usersId === user?.sendToken?.id;

  return (
    <div className="flex w-[80%] mx-auto mt-marginGlobal justify-between">
      {/* Main Post */}
      <div className="w-1/2 flex flex-col gap-6">
        <Image
          src={post?.img}
          alt="user"
          width={100}
          height={100}
          className="w-full h-1/2 rounded-md"
        />

        <div className="flex items-center gap-4">
          <Image
            src={post?.Users?.img}
            alt="user"
            width={100}
            height={100}
            className="rounded-full w-24 h-24"
          />
          <div className="">
            <h4 className="text-xl font-bold text-gray-700">
              {post?.Users?.name}
            </h4>
            {ownerPost && (
              <div className="flex items-center gap-2">
                <Image
                  alt="delete"
                  src="/delete.png"
                  width={50}
                  height={50}
                  className="w-6 h-6 cursor-pointer"
                />
                <Image
                  alt="edit"
                  src="/edit.png"
                  width={50}
                  height={50}
                  className="w-8 h-8 cursor-pointer"
                  state={post}
                />
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
      <div className="w-1/3">2</div>
    </div>
  );
};

export default SinglePost;
