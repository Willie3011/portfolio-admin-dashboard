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

const fetchSkills = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/skills`);
  return res.data.data
}

function SkillsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [skill, setSkill] = useState(null);

  const { data = [], isPending, error } = useFecthSkills();

  if (isPending) return <Loading />;
  if (error) return error.message;

  const columns = [
    { key: "name", label: "Skill name" }
  ]
  return (
    <section>
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="font-bold leading-5 tracking-tight text-xl md:text-2xl lg:text-4xl dark:text-white text-gray-900">Skills</h2>
        <button onClick={() => setOpenAddModal(true)} className="flex items-center px-5 py-3 shadow-xs rounded-lg bg-blue-500 text-white font-base hover:bg-blue-600 tracking-tight active:scale-95 transition duration-75 cursor-pointer">
          Add Skill
          <FaPlus className="h-4 w-4 ml-2" />
        </button>
      </div>
      <Table
        columns={columns}
        data={data}
        onEdit={(skill) => {
          setSkill(skill);
          setOpenUpdateModal(true);
        }}
        onDelete={(skill) => {
          setSkill(skill)
          setOpenDeleteModal(true);
        }}
        renderCell={(key, row) => {
          if (key === "featured") {
            return (
              <button>
                <CiStar className={row.featured ? "text-yellow-400" : ""} />
              </button>
            )
          }

          return row[key]
        }}
      />
      <Modal isOpen={openAddModal} onClose={setOpenAddModal} title="Add New Skill" children={<AddSkillForm onClose={setOpenAddModal} />} />
      <Modal isOpen={openUpdateModal} onClose={setOpenUpdateModal} title="Update Skill" children={<UpdateSkillForm skill={skill} onClose={setOpenUpdateModal} />} />
      <Modal isOpen={openDeleteModal} onClose={setOpenDeleteModal} title="Delete Skill" children={<DeleteSkillForm skill={skill} onClose={setOpenDeleteModal} />} />
    </section>
  )
}

export default SkillsPage