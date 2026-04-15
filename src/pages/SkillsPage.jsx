import Table from '../components/Table'
import { useQuery } from '@tanstack/react-query';
import { CiStar } from 'react-icons/ci';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import Loading from '../components/Loading';
import { useState } from 'react';
import Modal from '../components/Modal';
import AddSkillForm from '../components/AddSkillForm';
import UpdateSkillForm from '../components/UpdateSkillForm';
import DeleteSkillForm from '../components/DeleteSkillForm';
import { useFecthSkills } from '../queries/queries';
import Button from '../components/Button';

const fetchSkills = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/skills`);
  return res.data.data
}

const ALL_CATEGORIES = ["Frontend", "Backend", "Database", "Tools", "Other"];

const CAT_COLORS = {
  Frontend: "#3b82f6",
  Backend: "#10b981",
  Database: "#8b5cf6",
  Tools: "#f59e0b",
  Other: "#6b7280",
};

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

function IconEdit() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M7.5 1.5l2 2-5 5H2.5v-2l5-5z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M2 2l7 7M9 2L2 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

// subcomponents
function SkillPill({ skill, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [editHovered, setEditHovered] = useState(false);
  const [deleteHovered, setDeleteHovered] = useState(false);
  const color = CAT_COLORS[skill.category] || "#6b7280";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center gap-2 rounded-lg bg-[#161616] px-3.5 py-2 transition-all duration-150 ${hovered ? '-translate-y-px border-[#c9922a33]' : 'border-[#222]'} border`}
    >
      {/* category dot */}
      <div className='h-1.5 w-1.5 shrink-0 rounded-full opacity-70' style={{ background: color }} />

      {/* skill name */}
      <span className='text-sm font-normal text-[#c4bfb5]'>{skill.name}</span>

      <div className={`ml-1.5 flex items-center gap-1 transition-opacity duration-150 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onMouseEnter={() => setEditHovered(true)}
          onMouseLeave={() => setEditHovered(false)}
          onClick={() => onEdit(skill)}
          title='Edit'
          className={`flex w-5 h-5 items-center justify-center rounded-sm border-r-none transition-all duration-150 ${editHovered ? 'bg-[#1e1e1e] text-[#e8e2d4]' : 'bg-transparent text-[#666]'}`}
        >
          <IconEdit />
        </button>
        <button
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
          onClick={() => onDelete(skill)}
          title='Delete'
          className={`flex w-5 h-5 items-center justify-center rounded-sm border-r-none transition-all duration-150 ${deleteHovered ? 'bg-[#1a1212] text-[#e24b4a]' : 'bg-transparent text-[#663333]'}`}
        >
          <IconClose />
        </button>
      </div>
    </div>
  )
}

function CategorySection({ category, skills, onEdit, onDelete }) {
  const color = CAT_COLORS[category] || "#6b7280";

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[1.5px] text-[#3a3a3a]">
        <span className='inline-block h-1.5 w-1.5 rounded-full' style={{ background: color }} />
        {category}
        <span className='ml-0.5 text-[11px] tracking-normal text-[#2a2a2a]'>{skills.length}</span>
      </div>

      {/* pills */}
      <div className="flex flex-wrap gap-2">
        {
          skills.map((skill) => (
            <SkillPill
              key={skill._id}
              skill={skill}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        }
      </div>
    </div>
  )
}

function CategoryTab({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-3 py-1.5 capitalize text-xs transition-all duration-150 ${active ? 'border-[#c9922a44] bg-[#1e1a14] text-[#c9922a]' : hovered ? 'border-[#2a2a2a] bg-[#1a1a1a] text-[#b0aa9e]' : 'border-[#2a2a2a] bg-transparent text-[#555]'} border`}
    >
      {label}
    </button>
  )
}




function SkillsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  // const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [skill, setSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const { data = [], isPending, error } = useFecthSkills();

  if (isPending) return <Loading />;
  if (error) return error.message;

  const usedCategories = [
    "All",
    ...ALL_CATEGORIES.filter((cat) => data.some((skill) => skill.category === cat))
  ]

  // filter
  const filteredSkills = data.filter((skill) => {
    const matchCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchSearch = skill.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const grouped = ALL_CATEGORIES.reduce((acc, category) => {
    const items = filteredSkills.filter((skill) => skill.category === category);
    if (items.length > 0) {
      acc[category] = items;
    }

    return acc
  }, {});

  // Handlers
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setActiveCategory("All");
  }

  return (
    <section className='flex flex-1 flex-col overflow-hidden bg-[#0f0f0f] text-[#e8e2d4]'>
      {/* top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#1e1e1e] px-7 py-4.5">
        <div>
          <h1 className='m-0 text-xl font-semibold tracking-[0.3px]'>Skills</h1>
          <p className='mt-0.5 text-xs text-[#555]'>My technical toolkit</p>
        </div>

        <AddButton onClick={() => setOpenAddModal(true)}>
          <IconPlus /> Add Skill
        </AddButton>
      </div>

      {/* controls */}
      <div className="flex shrink-0 flex-wrap items-center gap-2.5 border-b border-[#1e1e1e] px-7 py-3.5">
        {/* search */}
        <div className="relative max-w-70 flex-auto">
          <span className='absolute left-3 top-1/2 flex -translate-y-1/2 text-[#444]'>
            <IconSearch />
          </span>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder='Search skills...'
            className='w-60 rounded-md border border-[#2a2a2a] bg-[#161616] py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#c9922a55]'
          />
        </div>

        {/* category tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {
            usedCategories.map((category) => (
              <CategoryTab
                key={category}
                label={category}
                active={activeCategory === category}
                onClick={() => handleCategoryChange(category)}
              />
            ))
          }
        </div>
      </div>

      {/* Grouped pill grid */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-7 py-6">
        {
          Object.keys(grouped).length === 0 ? (
            <div className="flex h-50 items-center justify-center text-sm text-[#444]">
              No skills match your search
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <CategorySection
                key={category}
                category={category}
                skills={items}
                onEdit={(skill) => {
                  setSkill(skill)
                  setOpenUpdateModal(true)
                }}
                onDelete={(skill) => {
                  setSkill(skill)
                  setOpenDeleteModal(true)
                }}
              />
            ))

          )
        }
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-[#1e1e1e] px-7 py-3.5">
        <span className='text-xs text-[#444]'>
          {filteredSkills.length} skill{filteredSkills.length !== 1 ? "s" : ""}
        </span>
        <span className='text-xs text-[#333]'>
          {Object.keys(grouped).length} categor{Object.keys(grouped).length !== 1 ? "ies" : "y"}
        </span>
      </div>

      <Modal isOpen={openAddModal} onClose={setOpenAddModal} title="Add New Skill" children={<AddSkillForm onClose={setOpenAddModal} />} />
      <Modal isOpen={openUpdateModal} onClose={setOpenUpdateModal} title="Update Skill" children={<UpdateSkillForm skill={skill} onClose={setOpenUpdateModal} />} />
      <Modal isOpen={openDeleteModal} onClose={setOpenDeleteModal} title="Delete Skill" children={<DeleteSkillForm skill={skill} onClose={setOpenDeleteModal} />} />
    </section>
  )
}

export default SkillsPage

function AddButton({ children, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md px-4.5 py-2.5  text-sm font-semibold text-[#0f0f0f] transition-colors duration-150 ${hovered ? "bg-[#e0a838]" : "bg-[#c9922a]"
        }`}
    >
      {children}
    </button>
  );
}