import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
interface FooterProps {
  title: string;
  authorLabel: string;
  isFavorite: boolean;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}
const Footer = ({
  title,
  authorLabel,
  isFavorite,
  createdAtLabel,
  onClick,
  disabled,
}: FooterProps) => {
  return (
    <div className="relative bg-white p-3 ">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p
        className={
          "opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate"
        }
      >
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75",
        )}
      >
        <Star
          onClick={onClick}
          className={cn(
            "h-4 w-4 cursor-pointer",
            isFavorite && "fill-blue-600 text-blue-600",
          )}
        />
      </button>
    </div>
  );
};

export default Footer;
