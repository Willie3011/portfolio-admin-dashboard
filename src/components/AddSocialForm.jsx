import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";


function AddSocialForm({ onClose }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    const queryClient = useQueryClient();

    // Creating skill
    const createSocialMutation = useMutation({
        mutationFn: async (newSocial) => {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/socials`, newSocial, { withCredentials: true })
            return response.data.social;
        },
        onSuccess: () => {
            toast.success("Social has been added!");
            queryClient.invalidateQueries({ queryKey: ['socials'] });
            onClose(false)
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newSocial = {
                name: name,
                link: link,
            };

            await createSocialMutation.mutateAsync(newSocial);
            setName("");
            setLink("");

        } catch (error) {
            console.error("Error creating social: ", error);
            toast.error(error.message);
        }
    }

    const isLoading = createSocialMutation.isPending;
    const error = createSocialMutation.error;

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-4 overflow-y-auto">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Social name</label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white" placeholder="e.g Facebook" required />
                </div>
                <div>
                    <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Social link</label>
                    <input type="text" name="link" id="link" value={link} onChange={(e) => setLink(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white" placeholder="e.g facebook.com/willem" required />
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded p-3">
                    {error?.response?.data?.message || error?.message || 'Failed to save project'}
                </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => onClose(false)}
                    disabled={isLoading}
                    className="px-4 py-2 border border-gray-400 rounded-lg text-gray-300 hover:bg-gray-800 disabled:opacity-50"
                >Cancel</button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-75 cursor-pointer active:scale-95">{isLoading ? "Adding Social..." : "Add Social"}</button>
            </div>
        </form>
    )
}

export default AddSocialForm