"use server";
import { z } from "zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export type State = {
  status: "success" | "error" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};


// Schema for the auction Items
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

// Shema for the user profile
const updateProfileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Minimum length of 3 required" })
    .or(z.literal(""))
    .optional(),

  lastname: z
    .string()
    .min(3, { message: "Minimum length of 3 required" })
    .or(z.literal(""))
    .optional(),
});

// Server Action which creates the Auction Item
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

// Server Action which create the bid
export async function CreateBid(formData:FormData){
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if(!user){
    return redirect("/api/auth/login")
  }

  const itemId = formData.get("itemId") as string

  const auctionData = await prisma.auctionItem.findFirst({
    where:{
      id: itemId
    }
  })

  if(!auctionData){
    throw new Error("Auction Item is not found")
  }
  
  const latestBidValue = auctionData?.currentbid + auctionData?.bidinterval

  await prisma.bids.create({
    data:{
      amount: latestBidValue,
      auctionItemId: itemId,
      userId: user.id
    }
  })

  await prisma.auctionItem.update({
    where:{
      id: itemId
    },
    data:{
      currentbid: latestBidValue
    }
  })

  revalidatePath(`/auction/item/${itemId}`)
}

// Server Action to get auction Item Data for a specific itemId
export async function getData(itemId: string) {
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
      userId: true,
      createdAt: true,
    },
  });

  return data;
}

//Server Action to get the bid data for a specific bidData
export async function getBidData(itemId: string) {
  const bidData = await prisma.bids.findMany({
    where: {
      auctionItemId: itemId,
    },

    select: {
      amount: true,
      createdAt: true,
      user: {
        select: {
          profilepicture: true,
          firstname: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return bidData;
}

//Server Action to update the profile
export async function UpdateProfile(prevState: any, formData: FormData){
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect("/api/auth/login");
  }

  const parsedFields = updateProfileSchema.safeParse({
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname")
  })

  if(!parsedFields.success){
    const state: State = {
      status: "error",
      errors: parsedFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs."
    }
    return state
  }

  const data = await prisma.user.update({
    where:{
      id: user.id
    },
    data:{
      firstname: parsedFields.data.firstname,
      lastname: parsedFields.data.lastname
    }
  })

  const state: State = {
    status: "success",
    message: "Your profile have been updated successfully"
  }

  return state

}
