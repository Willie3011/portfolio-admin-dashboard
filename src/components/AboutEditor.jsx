import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RichTextArea from "./RichTextArea";

const fetchAbout = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/about`);
    return res.data.data;
}

function AboutEditor() {
    const [value, setValue] = useState('');

    const { isPending, error, data } = useQuery({
        queryKey: ["about"],
        queryFn: () => fetchAbout()
    })
    const mutation = useMutation({
        mutationFn: async (content) => {
            return await axios.put(`${import.meta.env.VITE_API_URL}/about/`, { content }, { withCredentials: true });
        },
        onSuccess: (res) => {
            toast.success("About Me Updated!")
        }
    })
   
    useEffect(() => {
        if (data?.content) {
            setValue(data.content)
        }
    }, [data]);
    

    
    if (isPending) {
        return "Loading..."
    }
    
    if (error) {
        return "something went wrong " + error.message
    }



    const save = async () => {
        mutation.mutate(value);
    }
    return (
        <div className="bg-white rounded-xl p-6 shadow col-span-12 lg:col-span-8 ">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            <RichTextArea value={value} setValue={setValue} />

            <button onClick={save} className={`mt-4 ${mutation.isPending ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed" : "bg-blue-600"} hover:bg-blue-700 transition duration-75 text-white px-4 py-2 rounded-lg cursor-pointer`} disabled={mutation.isPending}>Save</button>

        </div>
    )
}

export default AboutEditor