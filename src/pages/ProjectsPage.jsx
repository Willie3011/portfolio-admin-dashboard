import { FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";
import Table from "../components/Table";
import { useQuery } from "@tanstack/react-query";
import { CiStar } from "react-icons/ci";
import Modal from "../components/Modal";
import { useState } from "react";
import AddProjectForm from "../components/AddProjectForm";

const fetchProjects = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);

  return res.data.data;
}

function ProjectsPage() {
  const [adding, setAdding] = useState(false);
  const { data = [], isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects
  });

  if (isPending) return "Loading...";

  if (error) return error.message;

  const columns = [
    { key: "title", label: "Project title" },
    { key: "desc", label: "Description" },
    { key: "featured", label: "Featured" }
  ];

  return (
    <section>
      {/* navigation top section*/}
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="font-bold leading-5 tracking-tight text-xl md:text-2xl lg:text-4xl dark:text-white text-gray-900">Projects</h2>
        <button onClick={() => setAdding(true)} className="flex items-center px-3 py-3 shadow-xs rounded-lg bg-blue-500 text-white font-base hover:bg-blue-600 tracking-tight active:scale-95 transition duration-75 cursor-pointer"><FaPlus className="h-4 w-4 me-2" /> Add Project</button>
      </div>

      <Table
        columns={columns}
        data={data}
        onEdit={(project) => console.log("edit", project)}
        onDelete={(project) => console.log("delete", project)}
        renderCell={(key, row) => {
          if (key === "featured") {
            return (
              <button>
                <CiStar className={row.featured ? "text-yellow-400" : ""} />
              </button>
            );
          }
          
          return row[key];
        }}
        />
      <Modal isOpen={adding} onClose={setAdding} title="Add New Project" children={<AddProjectForm onClose={ setAdding } />}/>
    </section>
  )
}

export default ProjectsPage