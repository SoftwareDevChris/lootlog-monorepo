import React, { useEffect, useRef } from "react";
import "./MyMenu.scss"; // Import your SCSS file

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const MyMenu = ({ isOpen, onClose, children }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose(); // Call the onClose function when clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return <>{isOpen && <div ref={menuRef}>{children}</div>}</>;
};

export default MyMenu;
