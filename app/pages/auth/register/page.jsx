"use client";

import { RegisterMutatin } from "@/app/graphql/Mutations/AuthMutation";
import { msgError, msgSucess } from "@/app/utils/msg";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    img: null,
    password: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  console.log(inputs);

  // Target elements with the "name" attribute
  const { register, data, error, loading } = RegisterMutatin();
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setInputs((values) => ({
        ...values,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setInputs((values) => ({ ...values, [e.target.name]: e.target.value }));
    }
  };
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    register({
      variables: {
        name: inputs.name,
        email: inputs.email,
        img: inputs.img,
        password: inputs.password,
      },
    })
      .then(() => {
        msgSucess("user created successfully");
        router.push("/pages/auth/login");
      })
      .catch((err) => {
        msgError(err.message);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          {previewImage ? (
            <div className=" flex justify-center ">
              <Image
                src={previewImage}
                width={100}
                height={100}
                className="w-20 h-20 rounded-full"
              />
            </div>
          ) : (
            <div className=" flex justify-center ">
              <input
                type="file"
                id="avata"
                name="img"
                hidden
                onChange={handleChange}
              />
              <label htmlFor="avata" className="text-center ">
                <Image src={"/avatar-user.png"} width={100} height={100} />
              </label>
            </div>
          )}
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              onChange={handleChange}
              type="text"
              name="name"
              value={inputs?.name}
              size="lg"
              placeholder="your name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              onChange={handleChange}
              type="email"
              name="email"
              value={inputs?.email}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              onChange={handleChange}
              type="password"
              name="password"
              value={inputs?.password}
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button
            type="submit"
            className="mt-6"
            fullWidth
            loading={loading ? true : false}
          >
            sign up
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
