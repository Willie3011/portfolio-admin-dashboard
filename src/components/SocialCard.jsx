import { useState } from 'react'


export default function SocialCard({ social, onEdit, onDelete, detectPlatform, extractHandler, initials }) {
const [hovered, setHovered] = useState(false);
const platform = detectPlatform(social.name);
const handle = extractHandler(social.link);
const displayUrl = social.link
    .replace("https://", "")
    .replace("http://", "")
    .slice(0, 46);
return (
    <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group relative flex flex-col gap-3.5 overflow-hidden rounded-xl bg-[#161616] p-5 transition-all duration-150 ${hovered ? "-translate-y-px" : "translate-y-0"}`}
        style={{
            border: `0.5px solid ${hovered ? platform.color + "33" : "#222"}`
        }}
    >
        <div
            className={`absolute inset-x-0 top-0 h-0.5 transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
            style={{ background: platform.color }}
        />

        {/* Header */}
        <div className="flex items-center gap-3">
            <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-lg"
                style={{
                    background: platform.color + "22",
                    border: `0.5px solid ${platform.color}33`
                }}>
                <span className="text-sm font-bold" style={{ color: platform.color }}>{initials(social.name)}</span>
            </div>
            <div>
                <div className="text-base font-semibold tracking-[-0.2px]">
                    {social.name}
                </div>
                <div className="mt-px text-xs text-[#555]">{handle}</div>
            </div>
        </div>

        {/* URL Display */}
        <div className="flex items-center gap-1.5 break-all text-xs leading-tight text-[#444]">
            <IconExternalLink />
            {displayUrl}
            {social.link.length > 52 ? "..." : ""}
        </div>

        {/* Edit/Delete Controls */}
        <div className="flex items-center justify-between border-t border-[#1e1e1e] pt-3">
            <VisitBtn href={social.link} />
            <div className="flex gap-1.5">
                <CardActionBtn variant="edit" onClick={() => onEdit(social)}>Edit</CardActionBtn>
                <CardActionBtn variant="delete" onClick={() => onDelete(social)}>Delete</CardActionBtn>
            </div>
        </div>
    </div>
)
}

function VisitBtn({ href }) {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-1 text-[12px] no-underline transition-all duration-150 ${hovered
                ? "border-[#c9922a44] bg-[#1a1a1a] text-[#c9922a]"
                : "border-[#2a2a2a] bg-transparent text-[#666]"
                }`}
        >
            <IconExternalLink /> Visit
        </a>
    );
}

function CardActionBtn({ children, variant, onClick }) {
    const [hovered, setHovered] = useState(false);
    const isDel = variant === "delete";
    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            className={`rounded-md px-3 py-1.5 text-[11.5px] transition-all duration-150 ${isDel
                ? `border ${hovered ? "border-[#e24b4a44] bg-[#1a1212] text-[#e24b4a]" : "border-[#2a2020] bg-transparent text-[#663333]"}`
                : `border ${hovered ? "border-[#2a2a2a] bg-[#1e1e1e] text-[#e8e2d4]" : "border-[#2a2a2a] bg-transparent text-[#888]"}`
                }`}
        >
            {children}
        </button>
    );
}

function IconExternalLink() {
    return (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
                d="M4 2H2a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
            <path
                d="M7 1h3v3M10 1L5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}