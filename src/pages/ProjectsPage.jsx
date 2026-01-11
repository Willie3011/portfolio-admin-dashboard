import { FaPlus, FaSearch } from "react-icons/fa";
import ProjectsTable from "../components/ProjectsTable";

function ProjectsPage() {
  return (
    <section>
      {/* navigation top section*/}
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="font-bold leading-5 tracking-tight text-xl md:text-2xl lg:text-4xl text-gray-900">Projects</h2>
        <button className="flex items-center px-3 py-3 shadow-xs rounded-lg bg-blue-500 text-white font-base hover:bg-blue-600 tracking-tight active:scale-95 transition duration-75 cursor-pointer"><FaPlus className="h-4 w-4 me-2"/> Add Project</button>
      </div>

      <ProjectsTable/>
    </section>
  )
}

export default ProjectsPage