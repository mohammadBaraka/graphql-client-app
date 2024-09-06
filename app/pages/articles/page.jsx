"use client";
import { GtAllPosts } from "@/app/graphql/Queris/Post";
import { UseSendToken } from "@/app/graphql/Queris/SenTokn";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Loader } from "@/app/components/Loader/Loader";
import CommetLikes from "@/app/components/CommetLikes";
const Articles = () => {
  const { data, loading, error } = GtAllPosts();
  const { data: user } = UseSendToken();
  const post = data?.getAllPosts;

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="w-[90%] mx-auto mt-marginGlobal flex flex-col justify-center">
        <div
          className=" 
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {post?.map((article) => {
            const ownerPost = article?.Users?.id === user?.sendToken?.id;

            return (
              <article
                key={article?.id}
                className="mb-6 flex flex-col justify-between  overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm relative"
              >
                {ownerPost && (
                  <div className="absolute -top-0 left-0">
                    <Image
                      src="/owner.png"
                      alt={"Croun"}
                      width={150}
                      height={150}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                )}
                {article?.img && (
                  <Image
                    alt={article?.title}
                    src={article?.img}
                    width={100}
                    height={100}
                    className="h-56 w-full object-cover"
                  />
                )}

                <div className="p-4 sm:p-6">
                  <Link href="#">
                    <h3 className="text-md font-medium text-gray-900">
                      {article?.title.slice(0, 20)}...
                    </h3>
                  </Link>

                  <div
                    className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500"
                    dangerouslySetInnerHTML={{ __html: article?.desc }}
                  />

                  <Link
                    href={`/pages/articles/${article?.id}`}
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600"
                  >
                    Read More
                    <span
                      aria-hidden="true"
                      className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
                <CommetLikes article={article} user={user} />
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Articles;
