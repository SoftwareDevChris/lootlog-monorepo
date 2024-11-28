"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { ROUTES } from "@/utils/routes";

import { HiMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

export const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <>
      <div className="flex w-full md:hidden">
        {isMenuOpen ? (
          <IoCloseOutline
            className="cursor-pointer"
            size={30}
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <HiMenu
            className="cursor-pointer"
            size={30}
            onClick={() => setIsMenuOpen(true)}
          />
        )}

        <ul
          ref={menuRef}
          style={isMenuOpen ? { maxHeight: "300px" } : { maxHeight: "0px" }}
          className={`absolute left-0 top-full z-[99] mt-1 flex w-full flex-col items-center gap-6 overflow-hidden bg-neutral-800 transition-[max-height] duration-300 ease-linear`}
        >
          {ROUTES.map((route) => (
            <li
              className="cursor-pointer rounded-md first:mt-4 last:mb-4"
              onClick={() => setIsMenuOpen(false)}
              key={route.name}
            >
              <Link className="hover:underline" href={route.path}>
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
