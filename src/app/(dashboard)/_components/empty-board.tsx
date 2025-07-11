import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useOrganization } from "@clerk/nextjs";

export const EmptyBoard = () => {
  const create = useMutation(api.board.create);
  const { organization } = useOrganization();
  const onClick = () => {
    if (!organization) return;
    create({
      orgId: organization.id,
      title: "Untitled",
    });
  };
  return (
    <div className="h-full w-full justify-center items-center flex flex-col">
      <Image alt="emtpy board" src={"/note.svg"} height={140} width={140} />
      <h2 className="font-semibold text-2xl mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button onClick={onClick} size={"lg"}>
          Create Board
        </Button>
      </div>
    </div>
  );
};
