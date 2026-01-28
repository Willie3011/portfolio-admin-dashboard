import { Link } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaTools, FaCog } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";


function Sidebar({ open, setOpen }) {
    const { logout } = useAuth();
    return (
        <aside className={`fixed md:static top-0 md:top-15 left-0 w-64 z-40 h-dvh md:h-[100vh-60px] transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
            <section className="overflow-y-auto py-2 px-3 h-full flex flex-col bg-primary border-r border-gray-200">
                <div className="md:hidden flex items-center justify-between p-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Willem April</h2>
                    <button className="w-6 h-6 text-gray-400 dark:text-white rounded-lg flex items-center justify-center focus:border" onClick={() => setOpen(false)}>
                        <IoClose className="w-full h-full"/>
                    </button>
                </div>
                <ul className="space-y-2 my-4">
                    <li>
                        <Link to="/admin" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-accent/10 group">
                            <IoGrid className="w-6 h-6 text-accent transition duration-75 group-hover:text-secondary" />
                            <span className="ml-3">Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/projects" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-accent/10 group">
                            <FaLaptopCode className="w-6 h-6 text-accent transition duration-75 group-hover:text-secondary" />
                            <span className="ml-3">Projects</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/skills" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-accent/10 group">
                            <FaTools className="w-6 h-6 text-accent transition duration-75 group-hover:text-secondary" />
                            <span className="ml-3">Skills</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/socials" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-accent/10 group">
                            <IoMdPhonePortrait className="w-6 h-6 text-accent transition duration-75 group-hover:text-secondary " />
                            <span className="ml-3">Socials</span>
                        </Link>
                    </li>
                </ul>
                <ul className="pt-5 mt-5 space-y-2 border-t border-secondary ">
                    <li>
                        <Link className="flex items-center p-2 text-base font-normal text-white rounded-lg transition duration-75 hover:bg-accent/10 group" to="/settings">
                            <FaCog className="flex-shink-0 w-6 h-6 text-accent transition duration-75 group-hover:text-secondary" />
                            <span className="ml-3">Settings</span>
                        </Link>
                    </li>
                </ul>
                <ul className="pt-5 mt-auto md:mb-16">
                    <li>
                        <button type="button" onClick={() => logout()} className="flex items-center w-full p-2 mt-auto text-base font-normal text-white rounded-lg transition duration-75 hover:bg-accent/10 group">
                            <CiLogout className="flex-shink-0 w-6 h-6 text-accent transition duration-75 group-hover:text-secondary" />
                            <span className="ml-3">Logout</span>
                        </button>
                    </li>

                </ul>
            </section>
        </aside>
    )
}

export default Sidebar