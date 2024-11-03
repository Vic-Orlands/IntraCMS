"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/libs/firebase/config";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export type AllContents = {
  id: string;
  title: string;
  coverImage: File;
  coverDescription: string;
  blogContent: string;
  createdAt: Date;
  updatedAt: Date;
};

// create/add new blog
export const createNewBlog = async (
  previousState: string | undefined | null,
  formData: FormData,
  content: string,
  coverImage: File | null,
  userId: string
) => {
  try {
    // store image to file storage and get the url as string
    const storage = getStorage();
    let coverImageUrl;

    if (coverImage) {
      const coverImageRef = ref(storage, `covers/${userId}/${coverImage.name}`);
      await uploadBytes(coverImageRef, coverImage);
      coverImageUrl = await getDownloadURL(coverImageRef);
    }

    const blogContent = content;
    const title = formData.get("title") as string;
    const coverDescription = formData.get("coverDescription") as string;

    // if (!title || !coverImage || !coverDescription || !blogContent) {
    //   return { message: "All fields are required!" };
    // }

    const data = {
      title,
      coverImage: coverImageUrl,
      coverDescription,
      blogContent,
    };
    const contentRef = collection(db, "users", userId, "blog");
    const newContentRef = await addDoc(contentRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    revalidatePath("/");

    return `Content published successfully! ${newContentRef.id}`;
  } catch (error) {
    console.error("Error uploading content:", error);
    return `Error uploading content: ${error}`;
  }
};