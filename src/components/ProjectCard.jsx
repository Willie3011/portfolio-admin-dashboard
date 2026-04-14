import { useState } from "react";
import { Link } from "react-router-dom";

function IconStar({ filled }) {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
                d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-3 1.5.5-3.5L2 4.5 5.5 4z"
                stroke={filled ? "#c9922a" : "#444"}
                strokeWidth="1.2"
                strokeLinejoin="round"
                fill={filled ? "#c9922a" : "none"}
            />
        </svg>
    );
}

function IconLink() {
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

const ProjectCard = ({ project, onToggleFeatured, onEdit, onDelete }) => {
    const [starHovered, setStarHovered] = useState(false);
    const truncated = project.shortDesc.length > 130 ? project.shortDesc.slice(0, 130) + "..." : project.shortDesc;

    return (
        <div className="group relative flex flex-col gap-3.5 overflow-hidden rounded-x-l border border-[#222] bg-[#161616] p-5 transition-all duration-150 hover:-translate-y-px hover:border-[#c9922a44]">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-[#c9922a] opacity-0 transition-opacity duration-200 group-hover:opacity-100"/>

            <div className="flex items-start justify-between gap-2.5">
                <div className="text-sm font-semibold tracking-[-0.2px] leading-tight text-[#e8e2d4]">
                    {project.title}
                </div>
                <button
                    onMouseEnter={() => setStarHovered(true)}
                    onMouseLeave={() => setStarHovered(false)}
                    onClick={() => onToggleFeatured(project._id)}
                    title={project.featured ? "Remove from featured" : "Mark as featured"}
                    className={`flex w-7 h-7 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-all duration-150 ${starHovered ? "border-[#c9922a44] bg-[#1e1a14]" : "border-[#2a2a2a] bg-transparent"}`}
                >
                    <IconStar filled={project.featured} />
                </button>
            </div>

            <div className="flex-1 text-xs leading-relaxed text-[#666]">{truncated}</div>

            <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#444] no-underline transition-colors duration-150 hover:text-[#c9922a]"
            >
                <IconLink />
                {project.projectLink.replace("https://", "")}
            </a>

            <div className="flex items-center justify-between border-t border-[#1e1e1e] pt-3">
                {
                    project.featured ? (
                        <span className="flex items-center gap-1.5 rounded-full border border-[#2e2510] bg-[#1e1a0a] px-2.5 py-0.5 text-xs text-[#a07020]">
                            <IconStar filled={true} /> Featured
                        </span>
                    ) : (
                            <span className="px-2.5 py-0.5 text-xs text-#333">
                                Not featured
                            </span>
                    )
                }

                <div className="flex items-center gap-1.5">
                    <ActionBtn variant="edit" onClick={() => onEdit(project)}>
                        Edit
                    </ActionBtn>
                    <ActionBtn variant="delete" onClick={() => onDelete(project._id)}>
                        Delete
                    </ActionBtn>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard

function ActionBtn({ children, variant, onClick }) {
    const [hovered, setHovered] = useState(false);
    const isDelete = variant === "delete";

    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            className={`rounded-md px-3 py1.5 text-xs transition-all duration-150 ${isDelete ? `border ${hovered ? "border-[#e24b4a44] bg-[#1a1212] text-[#e24b4a]" : "border-[#2a2020] bg-transparent text-[#663333]"}` : `border ${hovered ? "border-[#2a2a2a] bg-[#1e1e1e] text-[#e8e2d4]" : "border-[#2a2a2a] bg-transparent text-[#888]"}`}`}
        >
            {children}
        </button>
    )
}