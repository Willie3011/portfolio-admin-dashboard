import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiStar, CiSearch, CiFilter } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";


const fetchProjects = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);

  return res.data;
}

function ProjectsTable() {
  const { isPending, error, data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects()
  })

  const projects = data?.data || [];

  if (isPending) {
    return "Loading..."
  }

  if (error) {
    return "something went wrong " + error.message
  }

  return (
    <section className='realtive overflow-x-auto bg-white shadow-xs rounded-lg border border-gray-200'>
      <div className="p-4 flex items-center justify-between space-x-4">
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <CiSearch className="w-4 h-4 text-lg" />
          </div>
          <input type="text" id="search" className="block w-full max-w-96 ps-9 pe-3 py-2 bg-gray-100 border border-gray-200 text-heading text-sm rounded-lg focus:outline-none focus:border-blue-300 shadow-xs placeholder:text-gray-700" placeholder="Search for project..." />
        </div>
        <button id="dropdownBtn" data-dropdown-toggle="dropdown" className="shrink-0 inline-flex items-center justify-center bg-gray-100 box-border border  border-gray-200 hover:bg-gray-200 hover:text-heading shadow-xs font-medium leading-5 rounded-lg text-sm px-3 py-2 transition duration-75 cursor-pointer" type="button">
          <CiFilter className="w-4 h-4 me-1.5 -ms-0.5" />
          filter by
          <FaChevronDown className="w-4 h-4 ms-1.5 -me-0.5" />
        </button>
        <div id="dropdown" className="z-10 hidden bg-gray-100 border border-gray-200 rounded-lg shadow-lg w-32">
          <ul className="p-2 text-sm font-medium">
            <li>
              <button className="inline-flex items-center w-full p-2 hover:bg-gray-300 hover:font-semibold rounded-lg">Featured</button>
            </li>
          </ul>
        </div>
      </div>
      <table className='w-full text-sm text-left rtl:text-right'>
        <thead className='text-sm bg-gray-100 border-b rounded-lg border-gray-200'>
          <tr>
            <th scope='col' className='px-6 py-3 font-medium'>Project title</th>
            <th scope='col' className='px-6 py-3 font-medium'>Description</th>
            <th scope='col' className='px-6 py-3 font-medium'>Featured</th>
            <th scope='col' className='px-6 py-3 font-medium'>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project._id} className='odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200'>
              <th scope='row' className='px-6 py-4 font-medium text-heading whitespace-nowrap'>{ project.title }</th>
              <td className='px-6 py-4'>{ project.desc }</td>
              <td className='px-6 py-4'><button><CiStar /></button></td>
              <td className='px-6 py-4 flex items-center justify-between gap-2'>
                <button className="text-blue-500 hover:underline cursor-pointer">Edit</button>
                <button className="text-red-500 hover:underline cursor-pointer">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default ProjectsTable