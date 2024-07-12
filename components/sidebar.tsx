"use client";

import { HomeIcon, Image, ShoppingBag, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const routes = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    label: "Image Uploader",
    icon: Image,
    href: "/image-uploader",
  },
  {
    label: "Metaverse",
    icon: UsersIcon,
    href: "/metaverse",
  },
  {
    label: "Shopify",
    icon: ShoppingBag,
    href: "/shopify",
  },
];

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div
      className={`w-20 hidden fixed inset-y-0 md:flex flex-col space-y-2 py-2 bg-darkGray transition-all duration-300`}
    >
      <div className="space-y-1 px-4 pt-4">
        {routes.map((route, idx) => (
          <Link
            href={route.href}
            key={idx}
            className={cn(
              "text-sm group flex p-3 w-full justify-start rounded-r-full cursor-pointer transition duration-150",
              pathName === route.href
                ? "text-primary"
                : "text-gray hover:text-white",
            )}
          >
            <div className="flex items-center space-x-3">
              <route.icon className="w-5 h-5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
