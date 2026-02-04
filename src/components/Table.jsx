import { CiSearch, CiFilter, CiStar } from "react-icons/ci";
import { FaRegStar, FaStar  } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

function Table({ columns, data, onEdit, onDelete, handleFeature }) {
    return (
        <section className="relative overflow-x-auto bg-secondary shadow-xs rounded-lg border border-primary/40">
            {/* Header */}
            <div className="p-4 flex items-center justify-between space-x-4">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <CiSearch className="w-4 h-4 text-gray-400" />
                    </div>
                    <input type="text" className="block w-full max-w-96 ps-9 pe-3 py-2 bg-secondary border border-primary/40 rounded-lg text-sm focus:outline-none focus:border-accent shadow-xs placeholder:text-gray-700" placeholder="Search..." />
                </div>

                <button className="flex items-center bg-secondary border border-primary/40 px-3 py-2 rounded-lg text-sm text-primary">
                    <CiFilter className="mr-2" />
                    Filter
                    <FaChevronDown className="ml-2" />
                </button>
            </div>

            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-sm bg-secondary border-b border-primary/40 rounded-lg">
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} scope="col" className="px-6 py-3 text-primary">
                                {col.label}
                            </th>
                        ))}
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(row => (
                        <tr key={row._id} className="odd:bg-secondary  even:bg-primary/10  border-b border-primary/40 text-primary">
                            {
                                columns.map(col => (
                                    <td key={col.key} className="px-6 py-4 max-w-100">
                                        {col.key === "featured" ? <button onClick={() => handleFeature(row._id)}>
                                            {row.featured ? <FaStar className="text-accent"/> : <FaRegStar />}
                                        </button> : row[col.key]}
                                    </td>
                                ))
                            }
                            <td className="px-6 py-4 flex items-center gap-4">
                                <button onClick={() => onEdit(row)} className="text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => onDelete(row)} className="text-red-500 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}

                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center py-8 text-gray-500">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </section>
    )
}

export default Table