import { useEffect, useState } from "react"
import AboutEditor from "../components/AboutEditor";
import axios from "axios";
import Cards from "../components/Cards";

const STATS = [
    {
        label: "Projects",
        value: 12,
        badge: "+1 since last week",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="2" stroke="#c9922a" strokeWidth="1.3" />
                <path d="M5 7.5h6M5 10h4" stroke="#c9922a" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        )
    },
    {
        label: "Skills",
        value: 8,
        badge: "Frontend",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" stroke="#c9922a" strokeWidth="1.3" />
                <path
                    d="M8 1v2M8 13v2M1 8h2M13 8h2"
                    stroke="#c9922a"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />
            </svg>
        )

    },
    {
        label: "Socials",
        value: 5,
        badge: "Active",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="4.5" cy="8" r="2.5" stroke="#c9922a" strokeWidth="1.3" />
                <circle cx="11.5" cy="4.5" r="2.5" stroke="#c9922a" strokeWidth="1.3" />
                <circle cx="11.5" cy="11.5" r="2.5" stroke="#c9922a" strokeWidth="1.3" />
                <path d="M6.9 6.7l2.2-1.5M6.9 9.3l2.2 1.5" stroke="#c9922a" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
        )
    }
]

function today() {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}

function StatCard({ stat }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative overflow-hidden cursor-pointer bg-[#161616] border rounded-xl p-5 transition-all duration-150 ${hovered ? "border-yellow-600/30 -translate-y-px" : "border-[#222] translate-y-0"}`}
        >
            {/* accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-[#c9922a] transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`} />

            {/* Icon + Badge row*/}
            <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#1e1a14] border border-[#2e2510] flex items-center justify-center">
                    {stat.icon}
                </div>
                <span className="text-[10px] px-2 py-0.75 rounded-full bg-[#1a2218] text-[#5a9e47] border-[#2a3a26]">
                    {stat.badge}
                </span>
            </div>

            <div className="text-4xl font-bold text-[#e8e2d4] tracking-[-1px] leading-none">
                {stat.value}
            </div>
            <div className="text-sm text-[#555] mt-1.5">{stat.label}</div>
        </div>
    )
}


const Overview = () => {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [socials, setSocials] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const endpoints = [
                    `${import.meta.env.VITE_API_URL}/projects`,
                    `${import.meta.env.VITE_API_URL}/skills`,
                    `${import.meta.env.VITE_API_URL}/socials`,
                ]

                const [projectsResponse, skillsResponse, socialsResponse] = await Promise.all([
                    axios.get(endpoints[0]),
                    axios.get(endpoints[1]),
                    axios.get(endpoints[2]),
                ])

                setProjects(projectsResponse.data.projects.data);
                setSkills(skillsResponse.data.data);
                setSocials(socialsResponse.data.data)


            } catch (error) {
                console.log("Error fetching about data: ", error)
            }
        }

        fetchAllData();
    }, [])


    return (
        <div className="flex flex-col overflow-hidden bg-[#0f0f0f] text-[#c8e2d4] flex-1">
            <div className="flex items-center justify-between px-7 py-4.5 border-b border-[#1e1e1e] shrink-0">
                <div>

                    <h1 className="text-[19px] font-semibold text-[#e8e2d4] tracking-[-0.3px] m-0">Overview</h1>
                    <p className="text-[12.5px] text-[#555] mt-0.5">
                        {today()} &nbsp;·&nbsp; Last saved 2 hours ago
                    </p>
                </div>
                <div className="flex items-center gap-2.5">
                    <button onClick={() => window.open("/", "_blank")} className="bg-[#1a1a1a] border border-[#2a2a2a] text-[#666] rounded-md text-[11.5px] px-2 py-1 font-['DM_Sans'] cursor-pointer">View Portfolio</button>
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#c9922a] to-[#7a5518] flex items-center justify-center text-xs font-semibold text-white tracking-wide shrink-0">
                        WA
                    </div>
                </div>
            </div>

            {/* scrollable body */}
            <div className="flex-1 overflow-y-auto px-7 py-6">
                <div className="mb-6">
                    <Cards projects={projects} skills={skills} socials={socials} />
                </div>

                <div className="flex items-center justify-between mb-3.5">
                    <span className="text-sm font-semibold text-[#c4bfb5] tracking-tight">About Me</span>
                    <span className="text-xs text-[#444]">Markdown supported</span>
                </div>

                <div className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden p-6">
                    <AboutEditor />
                </div>

            </div>

        </div>
    )
}

export default Overview