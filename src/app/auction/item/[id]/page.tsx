import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

async function getData(itemId: string) {
  const data = await prisma.auctionItem.findUnique({
    where: {
      id: itemId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      files: true,
      currentbid: true,
      staringbid: true,
      enddate: true,
      bidinterval: true,
    },
  });

  return data;
}

export default async function ItemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  if (!data) {
    return (
      <div className="space-y-8 flex flex-col items-center mt-12">
        <Image src="/package.svg" width="200" height="200" alt="Package" />

        <h1 className="tracking-tighter text-2xl font-bold">Item not found</h1>
        <p className="text-center">
          The item you&apos;re trying to view is invalid.
          <br />
          Please go back and search for a different auction item.
        </p>

        <Button asChild>
          <Link href={`/`}>View Auctions</Link>
        </Button>
      </div>
    );
  }
  return (
    <section className="mx-auto px-4 lg:mt-10 max-w-7xl lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <CarouselContent>
          {data?.files.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[300px]">
                <Image
                  alt="product image"
                  src={item}
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{data?.description}</p>

        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              End Date:
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(data?.enddate)}
            </h3>

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Current Bid:
            </h3>

            <h3 className="text-sm font-medium col-span-1">
              {data?.currentbid}
            </h3>

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Stating Bid:
            </h3>

            <h3 className="text-sm font-medium col-span-1">
              {data?.staringbid}
            </h3>

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Bid Interval:
            </h3>

            <h3 className="text-sm font-medium col-span-1">
              {data?.bidinterval}
            </h3>

            <form action="">
              <input type="hidden" name="id" value={data?.id} />
              <Button>Place a Bid</Button>
            </form>

          </div>
        </div>
      </div>

      
    </section>
  );
}
