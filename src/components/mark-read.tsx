import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import { UpdateIsRead } from "@/app/action";

interface MarkReadProps {
  notificationId: string;
}

export default function MarkRead({ notificationId }: MarkReadProps) {
  return (
    <form action={UpdateIsRead}>
      <input type="hidden" name="markread" value={notificationId}></input>
      <Button variant="secondary" type="submit">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CheckCheck className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark Read</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    </form>
  );
}
