"use client";

import MobileSheet from "@/components/mobile-sheet";
import Sidebar from "@/components/sidebar";
import useDeviceType from "@/hooks/useDeviceType";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isMobile } = useDeviceType();

  return (
    <div className="flex items-start">
      {!isMobile && <Sidebar />}

      <main className={`w-full ${!isMobile && "pl-20"}`}>
        <div className="p-6 bg-white">
          {isMobile && <MobileSheet />}
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
