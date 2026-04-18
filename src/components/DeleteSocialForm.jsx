import { useDeleteSocialMutation } from '../queries/mutations';

function DeleteSocialForm({ social, onClose }) {
    const socialId = social?._id;

    const deleteMutation = useDeleteSocialMutation(onClose);
    
    const handleDelete = () => {
        deleteMutation.mutate(socialId);
    };

    return (
        <div className='flex flex-col '>
            <p className='text-center'>Are you sure you want to delete <strong>{social.name}</strong> from your portfolio ?</p>
            <div className="flex justify-center gap-3 pt-4">
                <button onClick={() => onClose(false)} className="px-4.5 py-2.5 border border-[#2a2a2a] rounded-lg text-[#888] hover:bg-primary/10 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">No, cancel</button>
                <button onClick={handleDelete} className='text-white bg-red-500 hover:bg-red-700 font-medium text-sm rounded-lg px-5 py-2.5 text-center transition duration-75 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400'>Yes, confirm delete</button>
            </div>
        </div>
    )
}

export default DeleteSocialForm