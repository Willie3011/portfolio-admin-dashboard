import Table from '../components/Table'
import { useQuery } from '@tanstack/react-query';
import { CiStar } from 'react-icons/ci';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import Loading from '../components/Loading';
import { useState } from 'react';
import Modal from '../components/Modal';
import AddSocialForm from '../components/AddSocialForm';
import UpdateSocialForm from '../components/UpdateSocialForm';

const fetchSocials = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/socials`);
  return res.data.data
}

function SocialPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [social, setSocial] = useState(null);

  const { data = [], isPending, error } = useQuery({
    queryKey: ["socials"],
    queryFn: fetchSocials
  });

  if (isPending) return <Loading />;
  if (error) return error.message;

  const columns = [
    { key: "name", label: "Social link name" },
    { key: "link", label: "Social link" }
  ]
  return (
    <section>
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="font-bold leading-5 tracking-tight text-xl md:text-2xl lg:text-4xl dark:text-white text-gray-900">My Social Links</h2>
        <button onClick={() => setOpenAddModal(true)} className="flex items-center px-5 py-3 shadow-xs rounded-lg bg-blue-500 text-white font-base hover:bg-blue-600 tracking-tight active:scale-95 transition duration-75 cursor-pointer">
          Add Social Link
          <FaPlus className="h-4 w-4 ml-2" />
        </button>
      </div>
      <Table
        columns={columns}
        data={data}
        onEdit={(social) => {
          setSocial(social);
          setOpenUpdateModal(true);
        }}
        onDelete={(social) => {
          setSkill(social)
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
      <Modal isOpen={openAddModal} onClose={setOpenAddModal} title="Add New Social Link" children={<AddSocialForm onClose={setOpenAddModal} />} />
      <Modal isOpen={openUpdateModal} onClose={setOpenUpdateModal} title="Update Social Link" children={<UpdateSocialForm social={social} onClose={setOpenUpdateModal} />} />
    </section>
  )
}

export default SocialPage