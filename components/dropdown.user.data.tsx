interface Props {
  name: string;
  email: string;
}

export function UserData({ name, email }: Props) {
  return (
    <div className="px-4 py-3" role="none">
      <p className="text-sm text-gray-900 dark:text-white" role="none">
        {name}
      </p>
      <p
        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
        role="none"
      >
        {email}
      </p>
    </div>
  );
}
