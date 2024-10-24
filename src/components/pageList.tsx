"use client";

import { useEffect, useState } from "react";
import { db } from "firebase";
import { collection, onSnapshot } from "firebase/firestore";

const PageList = () => {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pages"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPages(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Published Pages</h2>
      {pages.map((page) => (
        <div key={page.id} className="p-4 border rounded-md">
          <h3 className="text-lg font-bold">{page.title}</h3>
          <p>{page.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PageList;
