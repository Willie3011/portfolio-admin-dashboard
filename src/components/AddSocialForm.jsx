import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useAddSocialMutation } from "../queries/mutations";
import Input from "./Input";


function AddSocialForm({ onClose }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    // Creating skill
    const createSocialMutation = useAddSocialMutation(onClose);

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
                <Input
                    label="Social name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Social link"
                    name="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
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
                    className="px-6 py-3 border border-primary/80 rounded-lg text-primary hover:bg-primary/10 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >Cancel</button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="text-white inline-flex items-center bg-accent hover:bg-amber-400 font-medium rounded-lg text-sm px-6 py-3 text-center transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">{isLoading ? "Saving" : "Save Social"}</button>
            </div>
        </form>
    )
}

export default AddSocialForm