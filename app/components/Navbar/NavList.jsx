"use client";
import { isLoggedInVar } from "@/app/graphql/Mutations/AuthMutation";
import { UseSendToken } from "@/app/graphql/Queris/SenTokn";
import { useReactiveVar } from "@apollo/client";
import { Input, List, ListItem } from "@material-tailwind/react";

import Link from "next/link";
import { useState } from "react";
import Search from "./Search";

export function NavList() {
  const { data, error, loading } = UseSendToken();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <>
      <List className="mt-4 flex gap-2 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 items-center">
        <Link href={"/"}>
          <ListItem className="flex items-center  py-2 pr-4">Home</ListItem>
        </Link>

        <Link href={"/pages/categories"}>
          <ListItem className="flex items-center  py-2 pr-4">
            Categories
          </ListItem>
        </Link>

        <Link href="/pages/articles">
          <ListItem className="flex items-center  py-2 pr-4">Articles</ListItem>
        </Link>

        <Search />

        {isLoggedIn || data ? (
          <Link href="/pages/write">
            <ListItem className="flex items-center  w-12 h-12 justify-center rounded-full bg-gray-200 font-bold text-black text-sm ">
              Write
            </ListItem>
          </Link>
        ) : null}
      </List>
    </>
  );
}
