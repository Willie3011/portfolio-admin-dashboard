import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateSkillMutation } from "../queries/mutations";
import Input from "./Input";
import ReactSelect from "./ReactSelect";

const OPTIONS = [
    { value: "Frontend", label: "Frontend" },
    { value: "Backend", label: "Backend" },
    { value: "Database", label: "Database" },
    { value: "Tools", label: "Tools" },
    { value: "Other", label: "Other" },
]

function UpdateSkillForm({ skill, onClose }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    /* Populate form once */
    useEffect(() => {
        if (!skill) return;
        setName(skill.name || "");
        setCategory(skill.category || "");
    }, [skill]);

    const updateMutation = useUpdateSkillMutation(onClose);
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            updateMutation.mutate({
                id: skill._id,
                updates: {
                    name: name,
                    category: category
                }
            });
            
        
        } catch (error) {
            console.log("Submit error: ", error);
            toast.error(error.message)
        }
            
    };

    const isLoading = updateMutation.isPending;
    const error = updateMutation.error;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-4 mb-4 overflow-y-auto">
                <Input
                    label="Skill name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="z-50">
                    <label htmlFor="" className="block mb-2 text-sm font-semibold text-[#888]">Category</label>
                    <ReactSelect
                        options={OPTIONS}
                        value={category ? {value: category, label: category} : null}
                        onChange={(selected) => setCategory(selected.value)}
                    />
                </div>
            </div>

            {/* Error message */}
            {
                error && (
                    <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded p-3">
                        {
                            error?.response?.data?.message || error?.message || "Something went wrong while updating the skill"
                        }
                    </div>
                )
            }


            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => onClose(false)}
                    disabled={isLoading}
                    className="px-4.5 py-2.5 border border-[#2a2a2a] rounded-md text-[#888] hover:bg-[#111] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >Cancel</button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="text-white inline-flex items-center bg-[#c9922a] hover:bg-[#b87d1d] font-medium rounded-md text-sm px-4.5 py-2.5 text-center transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">{isLoading ? "Updating..." : "Update Skill"}</button>
            </div>

        </form>
    );
}

export default UpdateSkillForm;
