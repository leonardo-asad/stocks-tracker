"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Portfolio } from "@prisma/client";
import { useRouter } from "next/navigation";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface PortfolioSwitcherProps extends PopoverTriggerProps {
  portfolios: Portfolio[];
}

export default function PortfolioSwitcher({
  className,
  portfolios,
}: PortfolioSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewPortfolioDialog, setShowNewPortfolioDialog] =
    React.useState(false);
  const [portfolioList, setPortfolioList] = React.useState(portfolios);
  const [selectedPortfolio, setSelectedPortfolio] =
    React.useState<Portfolio | null>(null);
  const [portfolioName, setPortfolioName] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    setPortfolioList(portfolios);
  }, [portfolios]);

  function getPortfolioInitial(name: string) {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials;
  }

  async function handleSubmit() {
    console.log("Click client side");
    if (portfolioName === "") {
      return alert("Empty name is not valid");
    }

    try {
      const data = new FormData();
      data.append("name", portfolioName);

      const res = await fetch("http://localhost:3000/api/dashboard/portfolio", {
        method: "post",
        body: data,
      });

      const newPortfolio = await res.json();
      //console.log("Response: ", newPortfolio);

      portfolioList.push(newPortfolio);
      setShowNewPortfolioDialog(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog
      open={showNewPortfolioDialog}
      onOpenChange={setShowNewPortfolioDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={"avatars/acme-inc.png"}
                alt={
                  selectedPortfolio === null
                    ? "All Portfolios"
                    : selectedPortfolio.name
                }
              />
              <AvatarFallback>
                {selectedPortfolio === null
                  ? "AP"
                  : getPortfolioInitial(selectedPortfolio.name)}
              </AvatarFallback>
            </Avatar>
            {selectedPortfolio === null
              ? "All Portfolios"
              : selectedPortfolio.name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup heading="All">
                <CommandItem
                  onSelect={() => {
                    setSelectedPortfolio(null);
                    setOpen(false);
                    router.push(`/dashboard`);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={"avatars/acme-inc.png"}
                      alt="all portfolios"
                      className="grayscale"
                    />
                    <AvatarFallback>AP</AvatarFallback>
                  </Avatar>
                  All Portfolios
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedPortfolio === null ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Portfolio List">
                {portfolios.map((portfolio) => (
                  <CommandItem
                    key={portfolio.id}
                    onSelect={() => {
                      setSelectedPortfolio(portfolio);
                      setOpen(false);
                      router.push(`/dashboard/${portfolio.id}`);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={"avatars/acme-inc.png"}
                        alt={portfolio.name}
                        className="grayscale"
                      />
                      <AvatarFallback>
                        {getPortfolioInitial(portfolio.name)}
                      </AvatarFallback>
                    </Avatar>
                    {portfolio.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedPortfolio?.name === portfolio.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewPortfolioDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Portfolio
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Portfolio</DialogTitle>
          <DialogDescription>
            Add a new portfolio to track your financial assets.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Portfolio name</Label>
              <Input
                id="name"
                placeholder="Equity, Bonds, Growth, etc.."
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewPortfolioDialog(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
