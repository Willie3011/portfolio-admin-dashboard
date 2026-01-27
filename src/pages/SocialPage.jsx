import Table from '../components/Table'
import { FaPlus } from 'react-icons/fa';
import Loading from '../components/Loading';
import { useState } from 'react';
import Modal from '../components/Modal';
import AddSocialForm from '../components/AddSocialForm';
import UpdateSocialForm from '../components/UpdateSocialForm';
import DeleteSocialForm from '../components/DeleteSocialForm';
import { useFetchSocials } from '../queries/queries';


function SocialPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [social, setSocial] = useState(null);

  const { data = [], isPending, error } = useFetchSocials()

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
          setSocial(social)
          setOpenDeleteModal(true);
        }}
        renderCell={(key, row) => {
          return row[key]
        }}
      />
      <Modal isOpen={openAddModal} onClose={setOpenAddModal} title="Add New Social Link" children={<AddSocialForm onClose={setOpenAddModal} />} />
      <Modal isOpen={openUpdateModal} onClose={setOpenUpdateModal} title="Update Social Link" children={<UpdateSocialForm social={social} onClose={setOpenUpdateModal} />} />
      <Modal isOpen={openDeleteModal} onClose={setOpenDeleteModal} title="Delete Social Link" children={<DeleteSocialForm social={social} onClose={setOpenDeleteModal} />} />
    </section>
  )
}

export default SocialPage