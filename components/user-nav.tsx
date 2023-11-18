import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { LogoutButton } from "./button.components";

interface Props {
  image?: string;
  email: string;
  firstName: string;
  lastName: string;
}

export function UserNav({ image, email, firstName, lastName }: Props) {
  function getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={image} alt={`${firstName} ${lastName}`} />
            <AvatarFallback>{getInitials(firstName, lastName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{`${firstName} ${lastName}`}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <LogoutButton>
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
