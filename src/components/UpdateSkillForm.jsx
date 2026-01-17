import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UpdateSkillForm({ skill, onClose }) {
    const queryClient = useQueryClient();
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    /* Populate form once */
    useEffect(() => {
        if (!skill) return;
        setName(skill.name || "");
    }, [skill]);

    const updateMutation = useMutation({
        mutationFn: async ({ id, updates }) => {
            const res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/skills/${id}`,
                updates,
                { withCredentials: true }
            );
            return res.data;
        },
        onSuccess: () => {
            toast.success("Skill updated successfully");
            queryClient.invalidateQueries({ queryKey: ["skills"] });
            onClose(false);
        },
        onError: (err) => {
            setError(err)
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            updateMutation.mutate({
                id: skill._id,
                updates: {
                    name: name
                }
            });
        } catch (error) {
            console.log("Submit error: ", error);
            setError(error);
        }
    };

    const isLoading = updateMutation.isPending;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-4 mb-4 overflow-y-auto">
                <div>
                    <label htmlFor="Skill name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill name</label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white" placeholder="e.g Vanilla CSS" required />
                </div>
            </div>

            {/* Error message */}
            {
                error && (
                    <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded p-3">
                        {
                            error?.response?.data?.message || error?.message || "Something went wrong while updating the project"
                        }
                    </div>
                )
            }


            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => onClose(false)}
                    disabled={isLoading}
                    className="px-5 py-2.5 border border-gray-400 rounded-lg text-gray-300 hover:bg-gray-600 transition duration-75 disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg inline-flex items-center font-medium dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-75 cursor-pointer active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Updating..." : "Update Skill"}
                </button>
            </div>
        </form>
    );
}

export default UpdateSkillForm;
