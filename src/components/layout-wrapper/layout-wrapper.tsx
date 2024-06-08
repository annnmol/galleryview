import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface LayoutWrapperProps extends PropsWithChildren<any> {
  className?: string;
}

const LayoutWrapper = ({ children, className = "" }: LayoutWrapperProps) => {
  return <div className={cn("h-full w-full p-12", className)}>{children}</div>;
};

export default LayoutWrapper;
