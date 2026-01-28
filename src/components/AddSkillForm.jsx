import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useAddSkillMutation } from "../queries/mutations";
import Input from "./Input";


function AddSkillForm({ onClose }) {
    const [name, setName] = useState("");

    const queryClient = useQueryClient();

    // Creating skill
    const addSkillMutation = useAddSkillMutation(onClose);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const skill = {
                name: name
            };

            addSkillMutation.mutate(skill);

            setName("")

        } catch (error) {
            console.error("Error creating skill: ", error);
            toast.error(error.message);
        }
    }

    const isLoading = addSkillMutation.isPending;
    const error = addSkillMutation.error;

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-4 overflow-y-auto">
                <Input
                    label="Skill name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                    className="px-6 py-3 border border-primary/80 rounded-lg text-primary hover:bg-primary/10 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >Cancel</button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="text-white inline-flex items-center bg-accent hover:bg-amber-400 font-medium rounded-lg text-sm px-6 py-3 text-center transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">{isLoading ? "Saving" : "Save Skill"}</button>
            </div>
        </form>
    )
}

export default AddSkillForm