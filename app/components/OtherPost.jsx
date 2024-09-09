"use client";
import Image from "next/image";
import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useParams } from "next/navigation";
const OtherPost = ({ categories }) => {
  const { id } = useParams();

  const categoriesData = categories?.getPostByCategory.filter((catId) => {
    return catId.id !== id;
  });

  return (
    <div className="hidden lg:block w-1/3">
      <h3 className="mb-4 text-gray-500 font-bold text-xl">
        Other Posts will be here
      </h3>
      <div className="hidden lg:flex flex-col gap-8">
        {categoriesData?.slice(0, 3)?.map((post) => (
          <Card
            key={post?.id}
            className="w-full max-w-[48rem] flex-row h-[25%]"
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
              <Image
                src={post?.img}
                alt="user"
                width={100}
                height={100}
                className="h-full w-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {post.title.slice(0, 20)}
              </Typography>
              <Typography color="gray" className="mb-8 font-normal">
                <div
                  className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: post?.desc,
                  }}
                />
              </Typography>
              <Link
                href={`/pages/articles/${post?.id}`}
                className="inline-block"
              >
                <Button variant="text" className="flex items-center gap-2">
                  Read More
                  <ArrowLongRightIcon
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OtherPost;
