import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { routes } from "./sidebar";

const MobileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden">
        <MenuIcon className="text-black" />
      </SheetTrigger>
      <SheetContent className="bg-white w-52 pt-[4rem]">
        <SheetHeader>
          <SheetDescription className="mt-8 text-right">
            <div className="space-y-5 flex flex-col h-[70vh]">
              {routes.map((link, idx) => (
                <a
                  href={link.href}
                  key={idx}
                  className={
                    location.pathname === link.href
                      ? "text-primary font-bold text-lg"
                      : "text-black font-semibold text-base"
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
