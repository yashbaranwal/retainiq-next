"use client";

import { cn } from "@/lib/utils";
import {
  HomeIcon,
  Image,
  Menu,
  ShoppingBag,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const Sidebar = ({ toggle, setToggle }) => {
  const pathName = usePathname();

  return (
    <div
      className={`${
        toggle ? "w-[5%] px-0" : "w-[20%] px-3"
      } sticky top-0 h-screen flex flex-col space-y-2 py-2 bg-darkGray transition-all duration-300`}
    >
      <div className={`flex p-4 ${toggle ? "justify-center" : "justify-end"}`}>
        <Menu onClick={() => setToggle(!toggle)} className="cursor-pointer text-white" />
      </div>

      <div className="space-y-1 px-4">
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
              {!toggle && <p>{route.label}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
