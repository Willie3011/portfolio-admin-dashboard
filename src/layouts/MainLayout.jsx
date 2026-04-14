import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {

  return (
    <div className="font-Poppins flex overflow-hidden">
      <Sidebar />
      {/* <Sidebar open={openSidebar} setOpen={setOpenSidebar} /> */}
      <main className="bg-[#0f0f0f] h-screen overflow-y-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default MainLayout