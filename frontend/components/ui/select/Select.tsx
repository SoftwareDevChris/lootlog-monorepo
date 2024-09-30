"use client";
import { FC, useState } from "react";

import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { TCategory } from "@/types/types";
import OutsideClickHandler from "react-outside-click-handler";

type Props = {
  categories: TCategory[] | null;
  onSelect: (category: TCategory) => void;
};

export const Select: FC<Props> = ({ categories, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (category: TCategory) => {
    setSelected(category.name);
    setIsOpen(false);
    onSelect(category);
  };

  if (!categories) return null;

  return (
    <div className="select-wrapper">
      <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
        <button
          className={`select-button ${isOpen && "select-button--open"}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span style={{ marginRight: "1rem" }}>
            {selected ?? "Select category"}
          </span>
          {selected ? null : isOpen ? <FiArrowUp /> : <FiArrowDown />}
        </button>

        {isOpen && (
          <div className="select-options">
            {categories.map((category) => (
              <button
                key={category.id}
                className="select-option"
                onClick={() => handleSelect(category)}
                type="button"
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};
