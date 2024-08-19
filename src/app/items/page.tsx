import BidCard from "@/components/bid-card";
import SearchBar from "@/components/search-bar";
import prisma from "@/lib/db";

async function getData(searchParams: Record<string, string>) {
  const {query} = searchParams
  const filters: any = {}

  if(query){
    filters.OR=[
      {name: {contains: query, mode:"insensitive"}}
    ]
  }
  const data = await prisma.auctionItem.findMany({
    where: filters,
    select: {
      id: true,
      name: true,
      currentbid: true,
      files: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function AllAuctionItemsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const data = await getData(searchParams);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="pt-4">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {data.map((item, index) => (
          <BidCard
            key={index}
            name={item.name}
            currentbid={item.currentbid}
            id={item.id}
            files={item.files}
          />
        ))}
      </div>
    </section>
  );
}
