"use client";
import { useState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DatePicker } from "./date-picker";
import { Textarea } from "./ui/textarea";
import { UploadDropzone } from "@/utils/uploadthing";

export default function CreateAuctionForm() {
  const [date, setDate] = useState<Date | undefined>();
  const [files, setFiles] = useState<null | string[]>(null);
  return (
    <form action="">
      <CardHeader>
        <CardTitle>
          Create Your Auction with{" "}
          <span className="text-primary text-xl">BidVerse</span>
        </CardTitle>
        <CardDescription>
          Describe the item you want to sell. Note: All Fields are mandatory
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Item Name"
            required
            minLength={3}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Item Description"
            required
            minLength={10}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="startingbid">Starting Bid Price</Label>
          <Input
            id="startingbid"
            name="startingbid"
            type="number"
            placeholder="Starting Bidding Price. (Eg:1000)"
            required
            minLength={1}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="enddate">Auction End-Date</Label>
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="files" value={JSON.stringify(files)} />
          <Label>Item Images Note: Can Upload at max 3 images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setFiles(res.map((item) => item.url));
            }}
            onUploadError={(error: Error) => {
              alert("Something went wrong");
            }}
          />
        </div>
      </CardContent>
    </form>
  );
}
