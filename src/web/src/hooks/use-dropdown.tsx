import { useEffect, useRef, useState } from "react";

export const useDropdown = (): {
  isOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  ref: React.RefObject<HTMLDivElement>;
} => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, toggleDropdown, closeDropdown, ref };
};
