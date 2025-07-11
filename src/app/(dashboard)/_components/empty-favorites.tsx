import Image from "next/image";

export const EmptyFavorites = () => {
  return (
    <div className="h-full w-full justify-center items-center flex flex-col">
      <Image
        alt="emtpy favorite"
        src={"/empty-favorites.svg"}
        height={140}
        width={140}
      />
      <h2 className="font-semibold text-2xl mt-6">No favorites found!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else
      </p>
    </div>
  );
};
