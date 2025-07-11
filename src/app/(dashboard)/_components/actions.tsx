"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

interface ActionProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}
export const Actions = ({ children, side, sideOffset, id }: ActionProps) => {
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={sideOffset}
        side={side}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
