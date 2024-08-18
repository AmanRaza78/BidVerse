import { AuctionItem } from "@prisma/client";

export function isBidOver(item:AuctionItem){
    return item.enddate < new Date()
}