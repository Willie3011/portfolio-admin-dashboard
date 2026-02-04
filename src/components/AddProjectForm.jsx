import { useState } from "react";
import Select from "react-select"
import ImageUpload from "./ImageUpload";
import { toast } from "react-toastify";
import { uploadToImageKit } from "../utils/imagekitUpload";
import { useAddProjectMutation, useUpdateProjectMutation } from "../queries/mutations";
import Input from "./Input";
import Textarea from "./Textarea";
import RichTextArea from "./RichTextArea";

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

function AddProjectForm({ onClose }) {
    const [formData, setFormData] = useState({
        title: "",
        shortDesc: "",
        techStack: [],
        projectLink: "",
        githubLink: ""
    })
    const [desc, setDesc] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const addProjectMutation = useAddProjectMutation();
    // Updating Project
    const updateProjectMutaion = useUpdateProjectMutation(onClose);


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
                desc,
                techStack: formData.techStack.map(option => option.value),
                image: null
            };

            const savedProject = await addProjectMutation.mutateAsync(projectData);
            const projectId = await savedProject._id;
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

                    await updateProjectMutaion.mutateAsync(projectId,image)

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

    const isLoading = addProjectMutation.isPending || updateProjectMutaion.isPending;
    const error = addProjectMutation.error || updateProjectMutaion.error;

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 overflow-y-auto">
                <Input
                    label="Title"
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
                    value={formData.projectLink}
                    onChange={handleChange}
                />
                <Input
                    label="Github Link"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                />
                <div className="sm:col-span-2">
                    <label htmlFor="techStack" className="block mb-2 text-sm font-semibold text-primary">Tech stack</label>
                    <Select name="techStack" id="techStack" isMulti options={options} value={formData.techStack} onChange={handleSelectChange} classNames="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5" styles={{ control: (base) => ({ ...base, backgroundColor: "transparent" }) }} />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="techStack" className="block mb-2 text-sm font-semibold text-primary">Description</label>
                    <RichTextArea value={desc} setValue={setDesc}/>
                </div>
                <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-primary">Project image</label>
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
                    className="px-6 py-3 border border-primary/80 rounded-lg text-primary hover:bg-primary/10 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >Cancel</button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="text-white inline-flex items-center bg-accent hover:bg-amber-400 font-medium rounded-lg text-sm px-6 py-3 text-center transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">{isLoading ? "Saving" : "Save Project"}</button>
            </div>
        </form>
    )
}

export default AddProjectForm