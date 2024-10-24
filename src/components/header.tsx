"use client";

import { useUserSession } from "@/hooks/use-user-session";
import { signInWithGoogle, signOutWithGoogle } from "@/libs/firebase/auth";
import { createSession, removeSession } from "@/actions/auth-actions";

const Header = ({ session }: { session: string | null }) => {
  const userSessionId = useUserSession(session);

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
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">Intra CMS</h1>
      <div>
        {!userSessionId ? (
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-green-600 rounded-md"
          >
            Sign In
          </button>
        ) : (
          <>
            <button className="px-4 py-2 bg-blue-600 rounded-md">
              New Page
            </button>
            <button className="px-4 py-2 bg-green-600 rounded-md mx-4">
              Add Frame
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-green-600 rounded-md"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
