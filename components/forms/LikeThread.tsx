"use client";

import { addLikeToThread } from "@/lib/actions/like.action";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
interface Props {
  userId: string;
  threadId: string;
  isLike: boolean;
  likes: number;
}

const LikeThread = ({ userId, threadId, isLike, likes }: Props) => {
  const pathname = usePathname();

  const handleLikes = async (threadId: string, userId: string) => {
    let action: "like" | "delete";
    isLike ? (action = "delete") : (action = "like");
    await addLikeToThread(threadId, userId, action, pathname);
  };
  return (
    <Image
      src={`${isLike ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}`}
      alt="heart"
      width={24}
      height={24}
      className={`cursor-pointer object-contai text-red-600`}
      onClick={() => handleLikes(threadId, userId)}
    />
  );
};

export default LikeThread;
