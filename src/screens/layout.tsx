import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <main className="flex flex-col overflow-hidden flex-1 h-screen">
      <header className="sticky top-0 flex h-8 items-center gap-4 border-b px-4 md:px-6 bg-slate-300">
        <Header />
      </header>
      <div className="flex flex-1 max-h-[calc(100vh - 2rem)] gap-0 overflow-x-hidden overflow-y-auto ">
      <section className="fixed w-[250px] h-full bg-slate-300 pb-12">
          <Sidebar />
        </section>
        <div className="ml-[250px] flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
