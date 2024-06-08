import {
  sidebarDiscoverOptions,
  sidebarLibraryOptions,
} from "@/lib/dummy-data";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname?.split("/")[1] || "home";
  return (
      <div className="w-[250px] space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            {sidebarDiscoverOptions?.map((option) => {
              return (
                <Link to={option?.href} key={option?.id}>
                  <Button variant={option?.value === currentPath ? "secondary" : "ghost"} className="w-full justify-start">
                    {option?.icon}
                    {option?.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1">
            {sidebarLibraryOptions?.map((option) => {
              return (
                <Link to={option?.href} key={option?.id}>
                  <Button variant={option?.value === currentPath ? "secondary" : "ghost"} className="w-full justify-start mb-1">
                    {option?.icon}
                    {option?.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="py-2"></div>
      </div>
  );
}
