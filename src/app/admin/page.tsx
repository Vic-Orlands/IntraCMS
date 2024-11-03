"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/libs/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { AllContents } from "@/actions/actions";
import PageList from "@/app/admin/pageList";

type ContentType = { id: string };

const ContentPage = () => {
  const { uid } = useAuth();
  const [contents, setContents] = useState<AllContents[]>([]);

  useEffect(() => {
    const loadContents = async () => {
      const contentRef = collection(db, "users", uid, "blog");
      onSnapshot(contentRef, (snapshot) => {
        if (!snapshot.empty) {
          const contents: ContentType[] = [];
          snapshot.forEach((doc) => {
            contents.push({ id: doc.id, ...doc.data() });
          });
          setContents(contents as AllContents[]);
        }
      });
    };
    loadContents();

    return () => {
      loadContents();
    };
  }, [uid]);

  if (contents.length <= 0) {
    return (
      <div className="w-full p-8 bg-white rounded-md">
        <h1 className="text-2xl font-bold mb-4">Published Blogs</h1>

        <p className="text-gray-600 text-lg font-medium mb-4 mt-2">
          Loading blog contents...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-8 bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-4">Published Blogs</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 w-full">
        {contents.map((content) => (
          <PageList {...content} key={content.id} />
        ))}
      </section>
    </div>
  );
};

export default ContentPage;
