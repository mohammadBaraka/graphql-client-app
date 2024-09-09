"use client";
import {
  isLoggedInVar,
  LoginMutation,
} from "@/app/graphql/Mutations/AuthMutation";
import { msgError, msgSucess } from "@/app/utils/msg";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login, data, error, loading } = LoginMutation(inputs);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login();
      isLoggedInVar(true);
      msgSucess("Login Success");
      setTimeout(() => {
        router.push("/");
      });
    } catch (error) {
      msgError(error?.message);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welocome Again to our article site
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              onChange={handleChange}
              type="email"
              name="email"
              value={inputs.email}
              size="lg"
              placeholder="example@mail.com"
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
              value={inputs.password}
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
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
