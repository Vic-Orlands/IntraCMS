import ContentBuilder from "@/components/contentBuilder";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  return (
    <div className="min-w-screen bg-gray-50 flex gap-10 p-10">
      <ContentBuilder />
      <Sidebar />
    </div>
  );
};
export default Home;
