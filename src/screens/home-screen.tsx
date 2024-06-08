import LayoutWrapper from "@/components/layout-wrapper/layout-wrapper";
import RecentFiles from "@/components/table/recent-files";
import { AppStoreContext } from "@/store/app-store-context";
import { useContext } from "react";

const HomeScreen = () => {
  const { filesData } = useContext(AppStoreContext);
  return (
    <LayoutWrapper>
      <RecentFiles data={filesData} />
    </LayoutWrapper>
  );
};

export default HomeScreen;
