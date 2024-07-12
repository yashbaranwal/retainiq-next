"use client";

import Sidebar from "@/components/sidebar";
import { useState } from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [toggle, setToggle] = useState(true);

  return (
      <div className="flex items-start">
        <Sidebar
          toggle={toggle}
          setToggle={setToggle}
        />

        <main className={`${toggle ? "w-[95%]" : "w-[80%]"}`}>
          <div className="p-6 bg-white">{children}</div>
        </main>
      </div>
  );
};

export default DashboardLayout;
