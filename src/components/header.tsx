"use client";

import { useAuth } from "@/hooks/useAuth";
import { signInWithGoogle, signOutWithGoogle } from "@/libs/firebase/auth";
import { createSession, removeSession } from "@/actions/authActions";
import Link from "next/link";

const Header = () => {
  const { uid, toggleSidebar, handleToggleSideBar } = useAuth();

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid);
    }
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };

  return (
    <header className="flex justify-between items-center py-4 px-10 bg-gray-900 text-white">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">Intra CMS</h1>
      </Link>

      <ul className="flex items-center cursor-pointer">
        {!uid ? (
          <li
            onClick={handleSignIn}
            className="px-4 py-2 bg-green-600 rounded-md"
          >
            Sign In
          </li>
        ) : (
          <>
            <Link href={"/admin"}>
              <li className="hover:text-gray-300">
                New Page
              </li>
            </Link>
            <li onClick={handleToggleSideBar} className="px-8 hover:text-gray-300">
              {toggleSidebar ? "Close Frame" : "Add Frame"}
            </li>
            <li
              onClick={handleSignOut}
              className="px-4 py-2 bg-green-600 rounded-md"
            >
              Sign out
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
