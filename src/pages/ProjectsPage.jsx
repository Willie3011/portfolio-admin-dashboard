import { FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";
import Table from "../components/Table";
import { useQuery } from "@tanstack/react-query";
import { CiStar } from "react-icons/ci";
import Modal from "../components/Modal";
import { useState } from "react";
import AddProjectForm from "../components/AddProjectForm";
import DeleteProjectForm from "../components/DeleteProjectForm";
import UpdateProjectForm from "../components/UpdateProjectForm";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { useFetchProjects } from "../queries/queries";
import Button from "../components/Button";



function ProjectsPage() {
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [project, setProject] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data = [], isPending, error } = useFetchProjects(page, limit)

  const { data: projects, pagination } = data;

  if (isPending) return <Loading />;
  if (error) return error.message;

  const columns = [
    { key: "title", label: "Project title" },
    { key: "shortDesc", label: "Description" },
    { key: "projectLink", label: "Live Link" },
    { key: "featured", label: "Featured" }
  ];

  return (
    <section>
      {/* navigation top section*/}
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="font-bold leading-5 text-xl md:text-2xl lg:text-4xl text-primary">Projects</h2>
        <Button name="Add Project" icon={<FaPlus className="h-4 w-4 me-2" />} onClick={() => setAdding(true)} />
      </div>

      <Table
        columns={columns}
        data={projects}
        onEdit={(project) => {
          setUpdating(true);
          setProject(project);
        }}
        onDelete={(project) => {
          setDeleting(true);
          setProject(project);
        }}
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
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        total={pagination.total}
        limit={pagination.limit}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          SiRelianceindustrieslimited(newLimit);
          setPage(1);
        }}
      />
      <Modal isOpen={adding} onClose={setAdding} title="Add New Project" children={<AddProjectForm onClose={ setAdding } />}/>
      <Modal isOpen={deleting} onClose={setDeleting} title="Confirm Project Deletion" children={<DeleteProjectForm project={project} setProject={ setProject } onClose={ setDeleting } />}/>
      <Modal isOpen={updating} onClose={setUpdating} title="Update Project" children={<UpdateProjectForm project={project} setProject={ setProject } onClose={ setUpdating } />}/>
    </section>
  )
}

export default ProjectsPage