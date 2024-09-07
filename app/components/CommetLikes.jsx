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
import Image from "next/image";
import {
  CreateCommentMutation,
  DeleteComeent,
  UpdateCommentMutation,
} from "../graphql/Mutations/CommentMutation";
import { msg, msgError, msgSucess } from "../utils/msg";
import CommetnsCard from "./CommetnsCard";
import Swal from "sweetalert2";
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
  console.log("🚀 ~ CommetLikes ~ inputs:", inputs);

  const { updateComment, loading } = UpdateCommentMutation();
  const { createComment, loading: loadingCreate } = CreateCommentMutation();
  const { deleteComment } = DeleteComeent();

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

          <div className="text-sm font-bold flex justify-center items-center gap-1">
            Likes(0)
            <HandThumbUpIcon
              className="h-6 w-6 text-blue-500 "
              cursor-pointer
            />
          </div>
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
