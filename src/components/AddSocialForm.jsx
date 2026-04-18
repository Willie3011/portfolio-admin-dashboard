import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useAddSocialMutation } from "../queries/mutations";
import Input from "./Input";


function AddSocialForm({ onClose, detectPlatform }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const platform = detectPlatform(name);

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
                <div className="flex items-center gap-2.5 rounded-md border border-[#1e1e1e] bg-[#111] px-3.5 py-2.5">
                    <div
                        className="h-2 w-2 shrink-0 rounded-full transition-colors duration-200"
                        style={{ background: name ? platform.color : "#2a2a2a" }}
                    />
                    <span className="text-xs text-[#444]">
                        {name
                            ? `Will appear as "${platform.label}"`
                            : "Enter a platform name to preview"}
                    </span>
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
                    className="px-4.5 py-2.5 border border-[#2a2a2a] rounded-md text-[#888] hover:bg-[#111] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >Cancel</button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="text-white inline-flex items-center bg-[#c9922a] hover:bg-[#b87d1d] font-medium rounded-md text-sm px-4.5 py-2.5 text-center transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">{isLoading ? "Saving..." : "Save Social"}</button>
            </div>
        </form>
    )
}

export default AddSocialForm