"use client";
import { useState } from "react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export const DropdownUser = ({ children }: { children: React.ReactNode }) => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { data: session, status, update } = useSession();

  return (
    <div className="flex items-center relative">
      <div className="flex items-center ml-3">
        <div>
          <button
            onClick={() => setOpenUserMenu(!openUserMenu)}
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
          >
            <span className="sr-only">Open user menu</span>
            {session?.user?.image ? (
              <img
                className="w-8 h-8 rounded-full"
                src={session?.user?.image}
                alt="user photo"
              />
            ) : (
              <img
                className="w-8 h-8 rounded-full"
                src="/user-icon.jpg"
                alt="user photo"
              />
            )}
          </button>
        </div>
        <div
          id="dropdown-user"
          className={clsx(
            "z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600",
            "absolute top-4 right-0",
            openUserMenu ? "block" : "hidden"
          )}
        >
          {children}
          <ul className="py-1" role="none">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Earnings
              </a>
            </li>
            <li>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                role="menuitem"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
