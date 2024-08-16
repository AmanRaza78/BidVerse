"use client";
import { useEffect, useState } from "react";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DatePicker } from "./date-picker";
import { Textarea } from "./ui/textarea";
import { UploadDropzone } from "@/utils/uploadthing";
import { CreateItemAction, type State } from "@/app/action";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import SubmitButton from "./submit-button";

export default function CreateAuctionForm() {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(CreateItemAction, initialState);
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [files, setFiles] = useState<null | string[]>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
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
          {state?.errors?.["name"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
          )}
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
          {state?.errors?.["description"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["description"]?.[0]}
            </p>
          )}
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
          {state?.errors?.["startingbid"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["startingbid"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <input
            type="hidden"
            name="enddate"
            value={endDate ? endDate.toISOString() : ""}
          />
          <Label htmlFor="enddate">Auction End-Date</Label>
          <DatePicker endDate={endDate} setEndDate={setEndDate} />
          {state?.errors?.["enddate"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["enddate"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="files" value={JSON.stringify(files)} />
          <Label>Item Images Note: Can Upload at max 3 images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setFiles(res.map((item) => item.url));
              toast.success("Your images have been uploaded");
            }}
            onUploadError={(error: Error) => {
              toast.error("Something went wrong, try again");
            }}
          />
          {state?.errors?.["files"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["files"]?.[0]}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton title="Create Auction"/>
      </CardFooter>
    </form>
  );
}
