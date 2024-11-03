"use client"

import ContentBuilderComponent from "@/components/contentBuilder";
import SidebarComponent from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { toggleSidebar } = useAuth();

  return (
    <div className="min-w-screen bg-gray-50 flex gap-10 p-10">
      <ContentBuilderComponent />
      {toggleSidebar && <SidebarComponent />}
    </div>
  );
};
export default Home;
