"use client";
import { GetPostByTitle } from "@/app/graphql/Queris/Post";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/solid";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Input,
  ListItem,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Loader } from "../Loader/Loader";

function Search() {
  const [title, setTitle] = useState("");
  const { data, loading } = GetPostByTitle(title);
  const postByTitle = data?.getPostByTitle;

  const handleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  return (
    <>
      <Popover>
        <PopoverHandler>
          <ListItem className="flex items-center justify-center py-2 pr-4">
            <MagnifyingGlassPlusIcon
              className="h-6 w-6 text-gray-600 cursor-pointer"
              title="Search for articles"
            />
          </ListItem>
        </PopoverHandler>

        <PopoverContent className="z-[999] flex flex-col gap-6 justify-center w-[28rem] grid-cols-2 overflow-hidden p-0 ">
          <div className="p-4">
            <Input
              onChange={handleChange}
              label="Search for articles"
              size="sm"
              icon={<MagnifyingGlassPlusIcon />}
            />
          </div>

          {loading ? (
            <h1>loading...</h1>
          ) : (
            title?.length > 2 && (
              <div className="felx flex-col">
                {postByTitle?.map((post) => {
                  return (
                    <div
                      key={post?.id}
                      className="mb-8 px-2 flex gap-4 hover:bg-gray-100 p-4"
                    >
                      <Image
                        src={post?.img}
                        width={100}
                        height={100}
                        alt="avatar"
                        className="w-16 h-16 rounded-md"
                      />
                      <Link
                        href={`/pages/articles/${post?.id}`}
                        className="flex flex-col"
                      >
                        <h3 className="text-xl font-bold">
                          {post?.title.slice(0, 20)}...
                        </h3>
                        <div
                          className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500"
                          dangerouslySetInnerHTML={{ __html: post?.desc }}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}

export default Search;
