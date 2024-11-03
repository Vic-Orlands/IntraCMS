import Image from "next/image";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";

export type Blog = {
  id: string,
  title: string,
  coverImage: File,
  coverDescription: string,
  createdAt: Date,
  blogContent: string,
}

const PageList: React.FC<Blog> = (props) => {
  const { id, title, coverImage, coverDescription, createdAt } = props

  const link = title.toLowerCase().replace(/ /g, "-");

  return (
    <div className="border rounded-lg shadow-sm p-4">
      <Image
        src={coverImage.toString()}
        alt={title}
        width={500}
        height={400}
        className="w-full h-50 object-cover rounded-t-lg"
      />
      <div className="flex justify-between items-center mt-4">
        <Link href={`/admin/${link}&${id}`}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </Link>
        <span className="text-sm text-gray-500">{(createdAt as unknown as Timestamp).toDate().toDateString()}</span>
      </div>
      <p className="text-gray-700 mt-2">{coverDescription}</p>
    </div>
  );
};

export default PageList;
