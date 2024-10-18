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
    <OutsideClickContainer
      onClose={() => setIsMenuOpen(false)}
      isOpen={isMenuOpen}
    >
      <div className="mobile-menu-wrapper">
        {isMenuOpen ? (
          <IoCloseOutline size={30} onClick={() => setIsMenuOpen(false)} />
        ) : (
          <HiMenu size={30} onClick={() => setIsMenuOpen(true)} />
        )}

        <ul className={`mobile-nav-list ${isMenuOpen && "active"}`}>
          {ROUTES.map((route) => (
            <li onClick={() => setIsMenuOpen(false)} key={route.name}>
              <Link prefetch={false} href={route.path}>
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </OutsideClickContainer>
  );
};
