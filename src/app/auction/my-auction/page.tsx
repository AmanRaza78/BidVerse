import BidCard from "@/components/bid-card";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.auctionItem.findMany({
    where: {
      userId: userId,
    },
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

export default async function MyAuction() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
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
