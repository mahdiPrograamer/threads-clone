"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";

import User from "../models/user.model";
import Thread from "../models/thread.model";
import Community from "../models/community.model";
import Like from "../models/like.model";

export async function addLikeToThread(
  threadId: string,
  userId: string,
  action: "like" | "delete",
  path: string
) {
  connectToDB();

  try {
    console.log(threadId);

    if (action === "like") {
      await Thread.findOneAndUpdate(
        {
          _id: threadId,
        },
        {
          $push: { likes: userId },
        }
      );

      await Like.create({ user: userId, thread: threadId });
    } else if (action === "delete") {
      await Thread.findOneAndUpdate(
        {
          _id: threadId,
        },
        {
          $pull: { likes: userId },
        },
        { new: true }
      );
      await Like.findOneAndDelete({ user: userId, thread: threadId });
    } else {
      throw new Error("unknow action");
    }

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}
