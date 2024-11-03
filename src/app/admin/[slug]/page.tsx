"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/libs/firebase/config";
import { useAuth } from "@/hooks/useAuth";

type Blog = {
    title: string;
    coverImage: string;
    createdAt: Timestamp;
    blogContent: string;
};

const BlogDetail = () => {
    const { uid } = useAuth()
    const pathname = usePathname();
    const stripId = pathname.split('&')[1]
    const [blogData, setBlogData] = useState<Blog | null>(null);

    useEffect(() => {
        if (stripId) {
            const fetchBlog = async () => {
                const blogRef = doc(db, "users", uid, "blog", stripId as string);
                const blogSnap = await getDoc(blogRef);

                if (blogSnap.exists()) {
                    setBlogData(blogSnap.data() as Blog);
                } else {
                    console.error("No such blog found!");
                }
            };

            fetchBlog();
        }
    }, [stripId]);

    if (!blogData) {
        return <p className="p-14 font-semibold text-xl">Loading...</p>;
    }

    const { title, coverImage, createdAt, blogContent } = blogData;

    return (
        <section className="p-14">
            <div className="border rounded-lg p-10">
                <h3 className="text-3xl font-bold">{title}</h3>
                <Image
                    src={coverImage}
                    alt={title}
                    width={500}
                    height={400}
                    className="w-full h-50 object-cover rounded-t-lg"
                />
                <span className="text-sm text-gray-500">
                    {createdAt.toDate().toDateString()}
                </span>
                <div
                    className="text-gray-700 mt-2"
                    dangerouslySetInnerHTML={{ __html: blogContent }}
                ></div>
            </div>
        </section>
    );
};

export default BlogDetail;
