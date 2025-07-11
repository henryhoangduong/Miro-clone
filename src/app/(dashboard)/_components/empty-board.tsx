import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
export const EmptyBoard = () => {
  const create = useMutation(api.board.create);
  const { organization } = useOrganization();
  const { pending, mutate } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
      })
      .catch(() => toast.error("Failed to create board"));
  };
  return (
    <div className="h-full w-full justify-center items-center flex flex-col">
      <Image alt="emtpy board" src={"/note.svg"} height={140} width={140} />
      <h2 className="font-semibold text-2xl mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size={"lg"}>
          {pending && <Loader2 className="animate-spin" />}
          Create Board
        </Button>
      </div>
    </div>
  );
};
