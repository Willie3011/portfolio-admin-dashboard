import { Link } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaTools } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function Sidebar({ open, setOpen }) {
    return (
        <aside className={`fixed md:static top-0 left-0 w-64 z-40 h-screen transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
            <section className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between pr-2">
                    <h2 className="p-2 mb-2 text-2xl font-bold text-gray-900 dark:text-white">Willem April</h2>
                    <button className="w-6 h-6 text-gray-400 dark:text-white rounded-lg flex items-center justify-center focus:border" onClick={() => setOpen(false)}>
                        <IoClose className="w-full h-full"/>
                    </button>
                </div>
                <ul className="space-y-2">
                    <li>
                        <Link to="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IoGrid className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ml-3">Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FaLaptopCode className="w-6 h-6 text-gray-400 transition duration-75dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ml-3">Projects</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/skills" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FaTools className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ml-3">Skills</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/socials" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IoMdPhonePortrait className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="ml-3">Socials</span>
                        </Link>
                    </li>
                </ul>
                <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-900"></ul>
            </section>
        </aside>
    )
}

export default Sidebar