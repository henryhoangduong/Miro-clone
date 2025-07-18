"use client";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewBoardButton = ({
  orgId,
  disabled = false,
}: {
  orgId: string;
  disabled?: boolean;
}) => {
  const { pending, mutate } = useApiMutation(api.board.create);
  const router = useRouter();

  const onClick = () => {
    mutate({
      orgId: orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`board/${id}`);
      })
      .catch(() => toast.error("Failed to create board"));
  };
  return (
    <button
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) && "opacity-75 hover:bg-blue-600",
      )}
      onClick={onClick}
      disabled={pending || disabled}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
};

export default NewBoardButton;
