import Image from "next/image";
import React from "react";

const CommetnsCard = ({
  article,
  handleDelete,
  user,
  setInputs,
  inputs,
  setMode,
}) => {
  const setTitle = (id, title) => {
    setInputs({
      id,
      title,
      postsId: article?.id,
      usersId: user?.sendToken?.id,
    });
    setMode(true);
  };

  return (
    <div className="w-full max-h-60 overflow-y-scroll scroll-arrow">
      {article?.comments.map((comment) => {
        const ownerComment = comment?.usersId === user?.sendToken?.id;

        return (
          <div
            className="flex justify-between items-center px-4 overflow-hidden"
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
                  onClick={() => handleDelete(comment?.id)}
                  src={"/delete.png"}
                  alt="delete"
                  width={100}
                  height={100}
                  className="w-6 h-6 rounded-full cursor-pointer"
                />
                <Image
                  onClick={() => setTitle(comment?.id, comment?.title)}
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
  );
};

export default CommetnsCard;
