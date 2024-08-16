"use server";
import { z } from "zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export type State = {
  status: "success" | "error" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const ItemSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Item name should be of length 3 characters or more" }),
  description: z.string().min(10, {
    message: "Item description should be of length 10 characters or more",
  }),
  startingbid: z.number().min(1, { message: "Starting bid is required" }),
  enddate: z.date({ message: "End date is required" }),
  files: z
    .array(z.string())
    .min(1, { message: "At least one image is required" }),
});

export async function CreateItemAction(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const parsedFields = ItemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    startingbid: Number(formData.get("startingbid")),
    enddate: formData.get("enddate") ? new Date(formData.get("enddate") as string) : undefined,
    files: JSON.parse(formData.get("files") as string),
  });

  if (!parsedFields.success) {
    const state: State = {
      status: "error",
      errors: parsedFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };
    return state;
  }

  const data = await prisma.auctionItem.create({
    data: {
      name: parsedFields.data.name,
      description: parsedFields.data.description,
      staringbid: parsedFields.data.startingbid,
      enddate: parsedFields.data.enddate,
      files: parsedFields.data.files,
      userId: user.id,
    },
  });

  return redirect(`/auction/item/${data.id}`);
}
