import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchAbout = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/about`);

    return res.data.data;
}

function AboutEditor() {
    const { isPending, error, data } = useQuery({
        queryKey: ["about"],
        queryFn: () => fetchAbout()
    })
    const [content, setContent] = useState("");

    useEffect(() => {
        if (data?.content) {
            setContent(data.content)
        }
    }, [data]);

    
    if (isPending) {
        return "Loading..."
    }
    
    if (error) {
        return "something went wrong " + error.message
    }


    const save = async () => {
        await axios.put(`${import.meta.env.VITE_API_URL}/about/`, { content }, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
    }
    return (
        <div className="bg-white rounded-xl p-6 shadow col-span-12 lg:col-span-8 ">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            <textarea
                className="w-full h-40 p-3 border border-gray-300 focus:outline-none focus:border-gray-600 rounded-lg"
                value={content}
                onChange={e => setContent(e.target.value)}
            />

            <button onClick={save} className="mt-4 bg-blue-600 hover:bg-blue-700 transition duration-75 text-white px-4 py-2 rounded-lg cursor-pointer">Save</button>

        </div>
    )
}

export default AboutEditor