import { useState } from 'react';
import { Link } from 'react-router-dom'

function Card({ stat }) {
const [hovered, setHovered] = useState(false);
    return (
        <Link
            to={stat.to}
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
        </Link>
    )
}


export default Card