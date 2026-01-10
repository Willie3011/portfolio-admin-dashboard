import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { IoMenu } from "react-icons/io5";

function MainLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="grid grid-rows-[60px_1fr] min-h-screen">
      <header className="bg-white dark:bg-gray-800 dark: text-white border-b px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-6 h-6" onClick={() => setOpenSidebar(true)}><IoMenu className="w-full h-full"/></button>
          <h1 className="font-bold text-xl">Willem April</h1>
        </div>
        <div>Profile</div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
        <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
        <main className="bg-gray-100 p-6">
          <Outlet />
        </main>
      </section>
    </div>
  )
}

export default MainLayout