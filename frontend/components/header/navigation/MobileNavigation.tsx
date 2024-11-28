"use client";

import { useState } from "react";
import Link from "next/link";

import { ROUTES } from "@/utils/routes";

import { HiMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

import { OutsideClickContainer } from "@/components/outsideClick/OutsideClick";

export const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        <OutsideClickContainer
          onClose={() => setIsMenuOpen(false)}
          isOpen={isMenuOpen}
        >
          <ul
            style={isMenuOpen ? { maxHeight: "500px" } : {}}
            className={`absolute left-0 top-full z-[99] mt-1 flex max-h-0 w-full flex-col items-center gap-6 overflow-hidden bg-neutral-800 transition-all duration-300 ease-linear`}
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
        </OutsideClickContainer>
      </div>
    </>
  );
};
