import Link from "next/link";

import { FaUserCircle } from "react-icons/fa";

export const UserMenu = () => {
  return (
    <div className="z-50 order-3 w-fit items-center justify-self-end">
      <Link href={"/dashboard/user"}>
        <FaUserCircle size={28} className="cursor-pointer" />
      </Link>
    </div>
  );
};
