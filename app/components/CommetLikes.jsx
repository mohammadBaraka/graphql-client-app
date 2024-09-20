"use client";
import React, { useState } from "react";
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

import {
  Button,
  Input,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  CreateCommentMutation,
  DeleteComeent,
  UpdateCommentMutation,
} from "../graphql/Mutations/CommentMutation";
import { msgError, msgSucess } from "../utils/msg";
import CommetnsCard from "./CommetnsCard";
import Swal from "sweetalert2";
import { ToggleLike } from "../graphql/Mutations/LikeMutation";

const CommetLikes = ({ article, user }) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [mode, setMode] = useState(false);
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    postsId: article?.id,
    usersId: user?.sendToken?.id,
  });

  const { updateComment, loading } = UpdateCommentMutation();
  const { createComment, loading: loadingCreate } = CreateCommentMutation();
  const { deleteComment } = DeleteComeent();
  const { toggleLike } = ToggleLike();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleResetTitle = () => {
    setInputs({
      id: "",
      title: "",
      postsId: article?.id,
      usersId: user?.sendToken?.id,
    });
    setMode(false);
  };
  const handeSubmit = () => {
    mode
      ? updateComment({
          variables: inputs,
        })
          .then(() => {
            msgSucess("Comment updated successfully");
            handleResetTitle();
          })
          .catch((err) => {
            console.log();

            msgError(err?.message);
          })
      : createComment({
          variables: inputs,
        })
          .then(() => {
            msgSucess("Comment created successfully");
            handleResetTitle();
          })
          .catch((err) => {
            msgError(err?.message);
          });
  };

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't Delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteComment({
            variables: {
              id,
            },
          });
          msgSucess("Comment deleted successfully");
        }
      });
    } catch (error) {
      msgError(error?.message);
    }
  };

  const handleToggleLike = () => {
    toggleLike({
      variables: {
        postsId: inputs.postsId,
        usersId: inputs.usersId,
      },
    })
      .then((res) => {
        msgSucess(res?.data.toggleLike);
      })
      .catch((err) => {
        console.log("🚀 ~ handleToggleLike ~ err:", err);
        msgError(err?.message);
      });
  };
  const userLiked = article?.likes?.find(
    (like) => like?.usersId === user?.sendToken?.id
  );
  const userIsLiked = userLiked?.usersId === user?.sendToken?.id;

  return (
    <Accordion open={open === 0}>
      <AccordionHeader>
        <div className="w-full flex justify-between pl-4">
          <div
            onClick={() => handleOpen(1)}
            className="text-sm font-bold flex justify-center items-center gap-1 cursor-pointer"
          >
            Comments ({article?.comments?.length})
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-blue-500 " />
          </div>
          {userIsLiked ? (
            <div
              onClick={handleToggleLike}
              className="text-sm font-bold flex justify-center items-center gap-1"
            >
              Likes ({article?.likes?.length})
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-blue-500"
              >
                <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
              </svg>
            </div>
          ) : (
            <div
              onClick={handleToggleLike}
              className="text-sm font-bold flex justify-center items-center gap-1"
            >
              Likes ({article?.likes?.length})
              <HandThumbUpIcon
                className="h-6 w-6 text-blue-500"
                cursor-pointer
              />
            </div>
          )}
        </div>
      </AccordionHeader>

      <AccordionBody>
        <div className="flex gap-4 mb-4 px-4 justify-center ">
          <Input
            size="sm"
            name="title"
            value={inputs?.title}
            onChange={handleChange}
            variant="outlined"
            placeholder="name@mail.com"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          {mode ? (
            <Button
              loading={loadingCreate || loading ? true : false}
              className="w-40 h-10 flex justify-center place-items-center"
              onClick={handeSubmit}
              variant="gradient"
              size="sm"
              color="blue"
              type="submit"
            >
              Update
            </Button>
          ) : (
            <Button
              loading={loadingCreate || loading ? true : false}
              className="w-40 h-10 flex justify-center place-items-center"
              onClick={handeSubmit}
              variant="gradient"
              size="sm"
              color="teal"
              type="submit"
            >
              Add
            </Button>
          )}
        </div>
        <div className="w-full">
          <CommetnsCard
            article={article}
            handleDelete={handleDelete}
            user={user}
            setInputs={setInputs}
            setMode={setMode}
          />
        </div>
      </AccordionBody>
    </Accordion>
  );
};

export default CommetLikes;
