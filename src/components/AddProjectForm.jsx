import { useState } from "react";
import Select from "react-select/base"
import ImageUpload from "./ImageUpload";

function AddProjectForm() {
    const [imageFile, setImageFile] = useState(null);
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
    return (
        <form>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project title</label>
                    <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white" placeholder="Project title" />
                </div>
                <div>
                    <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link</label>
                    <input type="text" name="link" id="link" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white" placeholder="Project title" />
                </div>
                <div>
                    <label htmlFor="tech" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tech stack</label>
                    <Select name="title" id="title" isMulti options={options} classNames="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white" styles={{ control: (base) => ({ ...base, backgroundColor: "transparent" }) }} />
                </div>
                <div>
                    <label htmlFor="short_desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short description</label>
                    <textarea name="short_desc" id="short_desc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white resize-none" placeholder="Project title" />
                </div>
                <div className="sm:col-span-2">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none" placeholder="Write project description..."></textarea>
                </div>
                <div className="sm:col-span-2">
                    <ImageUpload onChange={setImageFile} value={imageFile}/>
                </div>
            </div>
            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 transition duration-75 cursor-pointer active:scale-95">Add new project</button>
        </form>
    )
}

export default AddProjectForm