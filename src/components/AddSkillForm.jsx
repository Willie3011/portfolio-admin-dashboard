import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAddSkillMutation } from "../queries/mutations";
import Input from "./Input";
import ReactSelect from './ReactSelect';

const OPTIONS = [
    { value: "Frontend", label: "Frontend" },
    { value: "Backend", label: "Backend" },
    { value: "Database", label: "Database" },
    { value: "Tools", label: "Tools" },
    { value: "Other", label: "Other" },
]

function AddSkillForm({ onClose }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    // Creating skill
    const addSkillMutation = useAddSkillMutation(onClose);

    useEffect(() => {
        console.log(category)
    }, [category])
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const skill = {
                name: name,
                category: category
            };

            addSkillMutation.mutate(skill);

            setName("")
            setCategory("")

        } catch (error) {
            console.error("Error creating skill: ", error);
            toast.error(error.message);
        }
    }

    const isLoading = addSkillMutation.isPending;
    const error = addSkillMutation.error;

    return (
        <form  onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-4 overflow-y-auto no-scrollbar">
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
                        onChange={(selected) => setCategory(selected.value)}
                    />
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded p-3">
                    {error?.response?.data?.message || error?.message || 'Failed to save project'}
                </div>
            )}

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
                    className="text-white inline-flex items-center bg-[#c9922a] hover:bg-[#b87d1d] font-medium rounded-md text-sm px-4.5 py-2.5 text-center transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">{isLoading ? "Adding" : "Add Skill"}</button>
            </div>
            
        </form>
    )
}

export default AddSkillForm