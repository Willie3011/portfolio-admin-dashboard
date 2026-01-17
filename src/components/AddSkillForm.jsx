import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";


function AddSkillForm({ onClose }) {
    const [name, setName] = useState("");

    const queryClient = useQueryClient();

    // Creating skill
    const createSkillMutation = useMutation({
        mutationFn: async (newSkill) => {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/skills`, newSkill, { withCredentials: true })
            return response.data.skill;
        },
        onSuccess: () => {
            toast.success("Skill has been added!");
            queryClient.invalidateQueries({ queryKey: ['skills'] });
            onClose(false)
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newSkill = {
                name: name
            };

            await createSkillMutation.mutateAsync(newSkill);
            setName("")
            
        } catch (error) {
            console.error("Error creating skill: ", error);
            toast.error(error.message);
        }
    }

    const isLoading = createSkillMutation.isPending;
    const error = createSkillMutation.error;

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-4 overflow-y-auto">
                <div>
                    <label htmlFor="Skill name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill name</label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white" placeholder="e.g Vanilla CSS" required/>
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
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-75 cursor-pointer active:scale-95">{isLoading ? "Adding Skill..." : "Add Skill"}</button>
            </div>
        </form>
    )
}

export default AddSkillForm