import MarkRead from "@/components/mark-read";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getNotifications() {
  noStore()
  const data = await prisma.notifications.findMany({
    where: {
      isRead: false,
    },
    select: {
      id: true,
      message: true,
      isRead: true,
      createdAt: true,
    },
    orderBy:{
        createdAt: "desc"
    }
  });
  return data;
}

export default async function Notifications() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getNotifications();
  if (!data) {
    return (
      <div className="space-y-8 flex flex-col items-center mt-12">
        <h1 className="tracking-tighter text-2xl font-bold">
          No Notification Yet
        </h1>
        <Image
          src="/no-notification.jpg"
          width="300"
          height="200"
          alt="no-notification-image"
        />
      </div>
    );
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          You have {data.length} unread notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-4">
          {data.map((notification, index) => (
            <li key={index} className="bg-gray-100 rounded-xl p-8">
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center">
                  <MessageCircleIcon className="h-4 w-4 mr-2"/>
                  <span>{notification.message}</span>
                </div>
                <div>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "long",
                    timeStyle: "short"
                  }).format(notification.createdAt)}
                </div>
                <div>
                   <MarkRead notificationId={notification.id}/>
                </div>
              </div>

            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
