import Table from '../components/Table'
import { useQuery } from '@tanstack/react-query';
import { CiStar } from 'react-icons/ci';
import axios from 'axios';

const fetchSkills = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/skills`);
  return res.data.data
}

function SkillsPage() {
  const { data = [], isPending, error } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills
  });

  if (isPending) return "Loading...";
  if (error) return error.message;

  const columns = [
    { key: "name", label: "name" }
  ]
  return (
    <div>
      <Table
        columns={columns}
        data={data}
        onEdit={(skill) => console.log("edit", skill)}
        onDelete={(skill) => console.log("delete", skill)}
        renderCell={(key, row) => {
          if (key === "featured") {
            return (
              <button>
                <CiStar className={row.featured ? "text-yellow-400" : ""}/>
              </button>
            )
          }

          return row[key]
        }}
      />
    </div>
  )
}

export default SkillsPage