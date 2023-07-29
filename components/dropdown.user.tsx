import clsx from "clsx";

interface Props {
  openUserMenu: boolean;
}

export default function DropdownUser({ openUserMenu }: Props) {
  return (
    <div
      id="dropdown-user"
      className={clsx(
        "z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600",
        "absolute top-5 right-0",
        openUserMenu ? "block" : "hidden"
      )}
    >
      <div className="px-4 py-3" role="none">
        <p className="text-sm text-gray-900 dark:text-white" role="none">
          Neil Sims
        </p>
        <p
          className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
          role="none"
        >
          neil.sims@flowbite.com
        </p>
      </div>
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
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            role="menuitem"
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
}
