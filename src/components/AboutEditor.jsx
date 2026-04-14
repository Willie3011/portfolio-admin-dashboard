import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
        <div className="flex flex-col">
            <RichTextArea value={value} setValue={setValue} />

            <div className="flex items-center justify-between px-4 py-3 border-t border-[#1e1e1e] bg-[#111]">
                <span className="text-sm text-slate-500">{value.length} characters</span>
                <button onClick={save} className={`px-5 py-2 rounded-md border-none text-sm font-semibold text-[#0f0f0f] cursor-pointer transition-all duration-150 ${mutation.isPending ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed" : "bg-[#c9922a] hover:bg-[#e0a838] hover:-translate-y-px"}`} disabled={mutation.isPending}>Save</button>
            </div>

        </div>
    )
}

export default AboutEditor