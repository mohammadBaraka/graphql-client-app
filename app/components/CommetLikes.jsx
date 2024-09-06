"use client";
import React, { useState } from "react";
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import Image from "next/image";
import { CreateCommentMutation } from "../graphql/Mutations/CommentMutation";
import { msg } from "../utils/msg";
const CommetLikes = ({ article, user }) => {
  const [inputs, setInputs] = useState({
    title: "",
    postsId: article?.id,
    usersId: user?.sendToken?.id,
  });

  const { createComment, error } = CreateCommentMutation();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handeSubmit = () => {
    createComment({
      variables: inputs,
    })
      .then((res) => {
        msg("success", "Comment created successfully");
      })
      .catch((err) => {
        msg("error", err.message);
      });
  };
  return (
    <div className="px-4 py-1 flex justify-between w-full">
      <Popover placement="bottom-start">
        <PopoverHandler>
          <div className="text-sm font-bold flex justify-center items-center gap-1 cursor-pointer">
            Comments ({article?.comments?.length})
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-blue-500 " />
          </div>
        </PopoverHandler>
        <PopoverContent className="w-auto">
          <div className="">
            <div className="flex gap-3">
              <input
                type="hidden"
                value={inputs?.postsId}
                name="postsId"
                onChange={handleChange}
              />

              <input
                type="hidden"
                value={inputs?.usersId}
                name="usersId"
                onChange={handleChange}
              />
              <Input
                name="title"
                value={inputs?.title}
                onChange={handleChange}
                variant="outlined"
                size="sm"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Button
                onClick={() => handeSubmit(article?.comments?.postsId)}
                variant="gradient"
                className="flex-shrink-0"
                size="sm"
                color="teal"
                type="submit"
              >
                Add Comment
              </Button>
            </div>

            <div className="mt-4">
              {article?.comments?.map((comment) => {
                const ownerComment = comment?.usersId === user?.sendToken?.id;

                return (
                  <div
                    className="flex justify-between items-center"
                    key={comment?.id}
                  >
                    <div className="flex gap-2 items-center mb-6">
                      <Image
                        src={comment?.user?.img}
                        alt=""
                        width={100}
                        height={100}
                        className="w-14 h-14 rounded-full "
                      />
                      <div className="">
                        <h3 className="text-lg font-bold capitalize">
                          {comment?.user?.name}
                        </h3>
                        <p className="">{comment?.title}</p>
                      </div>
                    </div>
                    {ownerComment && (
                      <div className="flex gap-2 items-center">
                        <Image
                          src={"/delete.png"}
                          alt="delete"
                          width={100}
                          height={100}
                          className="w-6 h-6 rounded-full cursor-pointer"
                        />
                        <Image
                          src={"/edit.png"}
                          alt="delete"
                          width={100}
                          height={100}
                          className="w-6 h-6  cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className="text-sm font-bold flex justify-center items-center gap-1 cursor-pointer">
        Likes(0)
        <HandThumbUpIcon className="h-6 w-6 text-blue-500 " cursor-pointer />
      </div>
    </div>
  );
};

export default CommetLikes;
