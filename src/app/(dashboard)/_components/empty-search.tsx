import Image from "next/image";

export const EmptySearch = () => {
  return (
    <div className="h-full w-full justify-center items-center flex flex-col">
      <Image
        alt="emtpy search"
        src={"/empty-search.svg"}
        height={140}
        width={140}
      />
      <h2 className="font-semibold text-2xl mt-6">No results found!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else
      </p>
    </div>
  );
};
