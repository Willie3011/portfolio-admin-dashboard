import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateSocialMutation } from "../queries/mutations";
import Input from "./Input";

function UpdateSocialForm({ social, onClose }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    /* Populate form once */
    useEffect(() => {
        if (!social) return;
        setName(social.name || "");
        setLink(social.link || "");
    }, [social]);

    const updateMutation = useUpdateSocialMutation(onClose);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            updateMutation.mutate({
                id: social._id,
                updates: {
                    name: name,
                    link: link
                }
            });
        } catch (error) {
            console.log("Submit error: ", error);
            toast.error(error.message);
        }
    };

    const isLoading = updateMutation.isPending;
    const error = updateMutation.error;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            {
                error && (
                    <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded p-3">
                        {
                            error?.response?.data?.message || error?.message || "Something went wrong while updating the social"
                        }
                    </div>
                )
            }


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
                    className="text-white inline-flex items-center bg-accent hover:bg-amber-400 font-medium rounded-lg text-sm px-6 py-3 text-center transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">{isLoading ? "Updating..." : "Update Social"}</button>
            </div>
        </form>
    );
}

export default UpdateSocialForm;
