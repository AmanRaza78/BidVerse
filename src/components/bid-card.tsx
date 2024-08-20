import Link from "next/link";
import { Button } from "./ui/button";

interface BidCardProps {
  name: string;
  currentbid: number;
  id: string;
  files: string[]
}

export default function BidCard({ name, currentbid, files, id }: BidCardProps) {
  return (
    <div className="group grid gap-2 border rounded-md shadow-sm p-4">
      <img
        src={files[0]}
        alt="Auction Item"
        className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover object-center transition-all group-hover:scale-105"
        width="400"
        height="300"
      />
      <div className="space-y-1">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-muted-foreground">
          Current Bid: <span className="font-semibold">{currentbid}</span>
        </p>
        <Link href={`/auction/item/${id}`} className="px-auto">
          <Button>Details</Button>
        </Link>
      </div>
    </div>
  );
}
