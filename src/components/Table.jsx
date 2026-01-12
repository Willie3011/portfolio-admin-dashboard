import { CiSearch, CiFilter } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";

function Table({ columns, data, onEdit, onDelete, renderCell }) {
    return (
        <section className="relative overflow-x-auto bg-white shadow-xs rounded-lg border border-gray-200">
            {/* Header */}
            <div className="p-4 flex items-center justify-between space-x-4">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <CiSearch className="w-4 h-4" />
                    </div>
                    <input type="text" className="block w-full max-w-96 ps-9 pe-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-blue-300 shadow-xs placeholder:text-gray-700" placeholder="Search..." />
                </div>

                <button className="flex items-center bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg text-sm">
                    <CiFilter className="mr-2"/>
                    Filter
                    <FaChevronDown className="ml-2"/>
                </button>
            </div>

            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-sm bg-gray-50 border-b border-gray-200 rounded-lg">
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} scope="col" className="px-6 py-3 font-medium">
                                {col.label}
                            </th>
                        ))}
                        <th className="px-6 py-3 font-medium">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(row => (
                        <tr key={row._id} className="odd:bg-gray-50 even:bg-gray-100 border-b border-gray-200">
                            {
                                columns.map(col => (
                                    <td key={col.key} className="px-6 py-4">
                                        {renderCell ? renderCell(col.key, row) : row[col.key]}
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