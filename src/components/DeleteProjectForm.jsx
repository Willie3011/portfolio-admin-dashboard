import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

function DeleteProjectForm({ project, onClose }) {
    const projectId = project?._id;

    const queryClient = useQueryClient();
    
    const deleteMutation = useMutation({
        mutationFn: async () => {
            return axios.delete(`${import.meta.env.VITE_API_URL}/projects/${projectId}`, {withCredentials: true})
        },
        onSuccess: () => {
            toast.success("Project deleted successfully!");
            queryClient.invalidateQueries({queryKey: ["projects"]})
            handleCloseModal();
        }
    })

    const handleCloseModal = () => {
        onClose(false);
    }

    const handleDelete = () => {
        deleteMutation.mutate();

    };

  return (
      <div className='flex flex-col '>
          <p className='text-center dark:text-gray-300'>Are you sure you want to delete <strong>{ project.title}</strong> from your portfolio ?</p>
          <div className="flex justify-center gap-3 pt-4">
              <button onClick={() => onClose(false)} className='px-5 py-2.5 border border-gray-400 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 cursor-pointer transition duration-75 active:scale-95'>No, cancel</button>
              <button onClick={handleDelete} className='text-white bg-red-700 hover:bg-red-800 font-medium text-sm rounded-lg px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-600 transition duration-75 cursor-pointer active:scale-95 disabled:bg-gray-400'>Yes, confirm delete</button>
          </div>
    </div>
  )
}

export default DeleteProjectForm