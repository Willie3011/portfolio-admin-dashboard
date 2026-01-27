import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";
import { uploadToImageKit } from "../utils/imagekitUpload";
import { useUpdateProjectMutation } from "../queries/mutations";

const TECH_OPTIONS = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "js", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "csharp", label: "C#" },
    { value: "java", label: "Java" },
    { value: "react", label: "React Js" },
    { value: "express", label: "Express Js" },
    { value: "mongo", label: "Mongo DB" },
    { value: "sql", label: "SQL" },
    { value: "node", label: "Node Js" },
];

function UpdateProjectForm({ project, onClose }) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        title: "",
        shortDesc: "",
        desc: "",
        projectLink: "",
        githubLink: "",
        techStack: [],
    });

    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    /* Populate form once */
    useEffect(() => {
        if (!project) return;

        setFormData({
            title: project.title || "",
            shortDesc: project.shortDesc || "",
            desc: project.desc || "",
            liveLink: project.projectLink || "",
            githubLink: project.githubLink || "",
            techStack: project.techStack || [],
        });
    }, [project]);

    /* Convert techStack → react-select format */
    const selectedTech = useMemo(
        () =>
            TECH_OPTIONS.filter(option =>
                formData.techStack.includes(option.value)
            ),
        [formData.techStack]
    );

    const updateMutation = useUpdateProjectMutation(onClose);
    //     useMutation({
    //     mutationFn: async ({ id, updates }) => {
    //         const res = await axios.patch(
    //             `${import.meta.env.VITE_API_URL}/projects/${id}`,
    //             updates,
    //             { withCredentials: true }
    //         );
    //         return res.data;
    //     },
    //     onSuccess: () => {
    //         toast.success("Project updated successfully");
    //         queryClient.invalidateQueries({ queryKey: ["projects"] });
    //         onClose(false);
    //     },
    //     onError: (err) => {
    //         setError(err)
    //     },
    // });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log(formData)
    };

    const handleTechChange = (options) => {
        setFormData(prev => ({
            ...prev,
            techStack: options ? options.map(o => o.value) : [],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let image;
        try {

            if (imageFile) {
                setProgress(0);

                const uploadResponse = await uploadToImageKit(imageFile, {
                    folder: 'projects/',
                    onProgress: (event) => {
                        if (!event.total) return;
                        const progressPercent = Math.round((event.loaded / event.total) * 100);
                        setProgress(progressPercent);
                    }
                });

                image = {
                    filePath: uploadResponse.filePath,
                    fileId: uploadResponse.fileId
                }
            }

            updateMutation.mutate({
                id: project._id,
                updates: {
                    ...formData,
                    ...(image && { image: image }),
                }
            });
            
        } catch (error) {
            console.log("Submit error: ", error);
            setError(error);

        } finally {
            setProgress(0)
        }
    };

    const isLoading = updateMutation.isPending;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">

                <Input
                    label="Project Title"
                    name="title"
                    value={formData.title}
                    
                    onChange={handleChange}
                />
                <Textarea
                    label="Short Description"
                    name="shortDesc"
                    value={formData.shortDesc}
                    onChange={handleChange}
                />

                <Input
                    label="Live Link"
                    name="projectLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                />

                <Input
                    label="Github Link"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                />

                <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tech Stack</label>
                    <Select
                        isMulti
                        options={TECH_OPTIONS}
                        value={selectedTech}
                        onChange={handleTechChange}
                    />
                </div>


                <div className="sm:col-span-2">
                    <Textarea
                        label="Description"
                        name="desc"
                        rows={4}
                        value={formData.desc}
                        onChange={handleChange}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Project Image
                    </label>
                    <ImageUpload value={imageFile} onChange={setImageFile} />
                </div>
            </div>

            {/* Upload progress */}
            {
                isLoading && progress > 0 && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Uploading image</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )
            }

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
                    {isLoading ? "Updating..." : "Update Project"}
                </button>
            </div>
        </form>
    );
}

/* Small reusable inputs (optional but clean) */
const Input = ({ label, ...props }) => (
    <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input
            {...props}
            className="w-full p-2.5 rounded-lg bg-gray-700 text-white"
        />
    </div>
);

const Textarea = ({ label, ...props }) => (
    <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <textarea
            {...props}
            className="w-full p-2.5 rounded-lg bg-gray-700 text-white resize-none"
        />
    </div>
);

export default UpdateProjectForm;
