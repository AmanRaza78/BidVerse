import BidCard from "@/components/bid-card";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";
import prisma from "@/lib/db";

async function getData(searchParams: Record<string, string>) {
  const { page, query } = searchParams;
  const filters: any = {};

  if (query) {
    filters.OR = [{ name: { contains: query, mode: "insensitive" } }];
  }

  const [count, data] = await prisma.$transaction([
    prisma.auctionItem.count({
      where: filters,
    }),

    prisma.auctionItem.findMany({
      where: filters,
      take: 10,
      skip: page ? (Number(page) - 1) * 10 : 0,
      select: {
        id: true,
        name: true,
        currentbid: true,
        files: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);
  return { count, data };
}

export default async function AllAuctionItemsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { count, data } = await getData(searchParams);
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
      <div className="mt-20">
        <Pagination totalPages={Math.ceil(count / 10)} />
      </div>
    </section>
  );
}
