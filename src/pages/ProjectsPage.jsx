import { FaPlus, FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { useState } from "react";
import AddProjectForm from "../components/AddProjectForm";
import DeleteProjectForm from "../components/DeleteProjectForm";
import UpdateProjectForm from "../components/UpdateProjectForm";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { useFetchProjects } from "../queries/queries";
import Button from "../components/Button";
import { useUpdateFeatureMutaion } from "../queries/mutations";
import ProjectCard from "../components/ProjectCard";

// Select Options
const options = [
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "tailwindcss", label: "Tailwind CSS" },
  { value: "js", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "csharp", label: "C#" },
  { value: "java", label: "Java" },
  { value: "react", label: "React Js" },
  { value: "express", label: "Express Js" },
  { value: "mongo", label: "Mongo DB" },
  { value: "firebase", label: "Firebase DB" },
  { value: "mongoose", label: "Mongoose" },
  { value: "sql", label: "SQL" },
  { value: "node", label: "Node Js" },
]

function IconSearch() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconFilter() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1l1.2 2.5 2.8.4-2 2 .5 2.8L6 7.4l-2.5 1.3.5-2.8-2-2 2.8-.4z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ITEMS_PER_PAGE = 6;

function ProjectsPage() {
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [project, setProject] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [search, setSearch] = useState("");

  const { data = [], isPending, error } = useFetchProjects(page, limit);
  const updateFeatureMutation = useUpdateFeatureMutaion();

  const { data: projects, pagination } = data;

  if (isPending) return <Loading />;
  if (error) return error.message;

  const handleFeature = async (id) => {
    updateFeatureMutation.mutate(id);
  }

  // Filtering
  const filtered = projects.filter(project => {
    const q = search.toLowerCase();
    const matchSearch = project.title.toLowerCase().includes(q) || project.shortDesc.toLowerCase().includes(q);
    const matchFeatured = !featuredOnly || project.featured;
    return matchSearch && matchFeatured;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFeaturedToggle = () => {
    setFeaturedOnly((prev) => !prev);
    setPage(1);
  };

  return (
    <section className="flex flex-1 flex-col overflow-hidden bg-[#0f0f0f] text-[#e8e2d4]">
      {/* top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#1e1e1e] px-7 py-5">
        <div>
          <h1 className="m-0 text-xl font-semibold tracking-[-0.3px]">Projects</h1>
          <p className="mt-0.5 text-xs text-[#555]">Manage and showcase my work</p>
        </div>
        <AddButton onClick={() => setAdding(true)}>
          <IconPlus/> Add project
        </AddButton>
      </div>

      {/* controls */}
      <div className="flex shrink-0 items-center gap-2.5 border-b border-[#1e1e1e] px-7 py-4">
        <div className="relative max-w-xs flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]">
            <IconSearch />
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={handleSearchChange}
            className="w-full rounded-md border border-[#2a2a2a] bg-[#161616] py-2 pl-9 pr-3 text-sm outline-none transition-colors duration-150 focus:border-[#c9922a44]"
          />
        </div>

        <FilterPill active={featuredOnly} onClick={handleFeaturedToggle}>
          <IconFilter /> Featured only
        </FilterPill>

        <span className="ml-auto text-xs text-[#888]">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* grid */}
      <div className="flex-1 overflow-y-auto px-7 py-5">
        {
          paginated.length === 0 ? (
            <div className="flex h-50 items-center justify-center text-sm text-[#888]">
              No projects match your search
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onToggleFeatured={handleFeature}
                  onEdit={(project) => {
                    setUpdating(true);
                    setProject(project);
                  }}
                  onDelete={() => {
                    setDeleting(true);
                    setProject(project);
                  }}
                />
              ))}
            </div>
          )
        }
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-[#1e1e1e] px-7 py-3.5">
        <span className="text-xs text-[#888]">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>

        <div className="flex items-center gap-1.5">
          <PageButton disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Prev
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <PageButton key={n} active={n === page} onClick={() => setPage(n)}>
              {n}
            </PageButton>
          ))}
          <PageButton disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            Next
          </PageButton>
        </div>
      </div>

      <Modal isOpen={adding} onClose={setAdding} title="Add New Project" children={<AddProjectForm onClose={setAdding} options={options}/>}/>
      <Modal isOpen={updating} onClose={setUpdating} title="Update Project" children={<UpdateProjectForm project={project} setProject={setProject} onClose={setUpdating} options={options}/>}/>
      <Modal isOpen={deleting} onClose={setDeleting} title="Delete Project" children={<DeleteProjectForm onClose={setDeleting} project={project}/>}/>
    </section>
  )
}

export default ProjectsPage

function AddButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-md px-4.5 py-2.5 text-sm text-[#0f0f0f] transition-colors duration-150 hover:bg-[#c9922a] bg-[#c0a838] cursor-pointer"
    >
      {children}
    </button>

  )
}

function PageButton({ children, active, onClick, disabled }) { 
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`rounded-md border px-3 py-1.5 text-sm transition-all duration-150 ${active ? "border-[#c9922a44] bg-[#1e1a14] text-[#c9922a]" : disabled ? "border-[#2a2a2a] bg-transparent text-[#2a2a2a]" : hovered ? "border-[#2a2a2a] bg-[#1a1a1a] text-[#e8e2d4]" : "border-[#2a2a2a] bg-transparent text-[#666]"} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  )
}

function FilterPill({ active, onClick, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md border px-3.5 py-1.5 text-sm transition-all duration-150 ${active ? "border-[#c9922a44] bg-[#1e1a14] text-[#c9922a]" : hovered ? "border-[#2a2a2a] bg-[#1a1a1a] text-[#b0aa9e]" : "border-[#2a2a2a] bg-transparent text-[#666]"}`}
    >
      {children}
    </button>
  )
}