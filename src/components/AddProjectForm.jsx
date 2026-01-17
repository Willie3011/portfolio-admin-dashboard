import { useState } from "react";
import Select from "react-select"
import ImageUpload from "./ImageUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { uploadToImageKit } from "../utils/imagekitUpload";

function AddProjectForm({ onClose }) {
    const [formData, setFormData] = useState({
        title: "",
        short_desc: "",
        desc: "",
        techStack: [],
        link: ""
    })
    const [imageFile, setImageFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const queryClient = useQueryClient();

    // Creating project
    const createProjectMutation = useMutation({
        mutationFn: async (newProject) => {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/projects`, newProject, { withCredentials: true })
            return response.data.project;
        },
        onSuccess: (res) => {
            toast.success("Project has been added!");
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    // Updating Project
    const updateProjectMutaion = useMutation({
        mutationFn: async ({ projectId, image }) => {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/projects/${projectId}`, { image }, { withCredentials: true });
            return response.data.data.project
        },
        onSuccess: () => {
            toast.success("Project updated");
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            onClose(false);
        }
    })

    const options = [
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
    ]

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (selectedOptions) => {
        setFormData(prev => ({
            ...prev,
            techStack: selectedOptions || []
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadProgress(0);

        try {
            const projectData = {
                ...formData,
                techStack: formData.techStack.map(option => option.value),
                image: null
            };

            const savedProject = await createProjectMutation.mutateAsync(projectData);
            const projectId = savedProject._id;

            // If there's an image upload it to imagekit
            if (imageFile) {
                try {
                    const uploadResponse = await uploadToImageKit(imageFile, {
                        folder: 'projects/',
                        onProgress: (event) => {
                            const progress = (event.loaded / event.total) * 100;
                            setUploadProgress(progress);
                        }
                    });

                    const image = {
                        filePath: uploadResponse.filePath,
                        fileId: uploadResponse.fileId
                    }

                    await updateProjectMutaion.mutateAsync({
                        projectId,
                        image
                    })

                } catch (error) {
                    console.error("Image upload failed: ", error);
                    toast.error("Project saved but image upload failed ");
                }
            }
        } catch (error) {
            console.error("Error saving project: ", error);
            toast.error(error.message);
        }
    }

    const isLoading = createProjectMutation.isPending || updateProjectMutaion.isPending;
    const error = createProjectMutation.error || updateProjectMutaion.error;

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 overflow-y-auto">
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white" placeholder="Project title" />
                </div>
                <div>
                    <label htmlFor="liveLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link</label>
                    <input type="text" name="liveLink" id="liveLink" value={formData.liveLink} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white" placeholder="Project title" />
                </div>
                <div>
                    <label htmlFor="techStack" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tech stack</label>
                    <Select name="techStack" id="techStack" isMulti options={options} value={formData.techStack} onChange={handleSelectChange} classNames="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white" styles={{ control: (base) => ({ ...base, backgroundColor: "transparent" }) }} />
                </div>
                <div>
                    <label htmlFor="short_desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short description</label>
                    <textarea name="short_desc" id="short_desc" value={formData.short_desc} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white resize-none" placeholder="Project title" />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea name="desc" id="desc" rows="4" value={formData.desc} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none" placeholder="Write project description..."></textarea>
                </div>
                <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project image</label>
                    <ImageUpload onChange={setImageFile} value={imageFile} />
                </div>
            </div>
            {/* Upload Progress */}
            {isLoading && uploadProgress > 0 && (
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Uploading image...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

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
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-75 cursor-pointer active:scale-95">{isLoading ? "Saving" : "Save Project"}</button>
            </div>
        </form>
    )
}

export default AddProjectForm