import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
    {
        label: "Overview",
        path: "/admin",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
            </svg>
        )
    },
    {
        label: "Projects",
        path: "/admin/projects",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5 7.5h6M5 10h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        )
    },
    {
        label: "Skills",
        path: "/admin/skills",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
                <path
                    d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />
            </svg>
        )
    },
    {
        label: "Socials",
        path: "/admin/socials",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="4.5" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="11.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="11.5" cy="11.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                <path
                    d="M6.9 6.7l2.2-1.5M6.9 9.3l2.2 1.5"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    />
            </svg>
        )
    }
]

const UTILITY_ITEMS = [
    {
        label: "Settings",
        path: "/settings",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M8 1l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9l-3 1.5.5-3.5L3 4.5 6.5 4z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    />
            </svg>
        )
    },
    {
        label: "Logout",
        path: "/",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M10 11l4-3-4-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 8h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
        )
    }
]

const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const activePath = location.pathname;
    const { logout } = useAuth();

    const handleNav = path => {
        nagivate(path);
    }

    return (
        <nav
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            className={`sticky top-0 flex min-h-screen md:h-screen flex-col items-center gap-1 overflow-hidden bg-[#141414] p-5 pr-0 shrink-0 border-r border-[#222] transition-all duration-200 ${expanded ? "w-62" : "w-18"}`}
        >
            <div className="flex w-full items-center justify-center gap-2 whitespace-nowrap py-2 pb-6 text-lg font-bold tracking-tight text-[#c9922a]">
                <div className="h-2 w-2 bg-[#c9922a] rounded-full shrink-0" />
                <span className={`whitespace-nowrap transition-opacity duration-200 ease-out delay-75 ${expanded ? "opacity-100" : "opacity-0"}`}>Willem April</span>
            </div>

            <div className="flex w-full flex-col gap-0.5">
                <SectionLabel label="Workspace" visible={expanded} />
                {
                    NAV_ITEMS.map((item) => (
                        <NavItem
                            key={item.path}
                            item={item}
                            active={activePath === item.path}
                            expanded={expanded}
                            onClick={() => item.label === "Logout" ? logout() : handleNav(item.path)}
                        />
                    ))
                }
            </div>

            <div className='flex-1' />

            <div className='my-2 h-px w-[calc(100%-20px)] bg-[#222]' />

            <div className="flex w-full flex-col gap-0.5">
                {
                    UTILITY_ITEMS.map((item) => (
                        <NavItem
                            key={item.path}
                            item={item}
                            active={activePath === item.path}
                            expanded={expanded}
                            onClick={() => handleNav(item.path)}
                        />
                    ))
                }
            </div>
        </nav>
    )
}

export default Sidebar

function SectionLabel({ label, visible }) {
    return (
        <div className={`overflow-hidden whitespace-nowrap px-2.5 pb-1.5 pt-3 text-xs font-medium uppercase tracking-wider text-[#444] transition-opacity duration-150 ${visible ? "opacity-100" : "opacity-0"}`}>
            {label}
        </div>
    )
}

function NavItem({ item, active, expanded, onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link 
            to={item.path}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-md px-2.5 py-2 transition-all duration-150 ${active ? "bg-[#1e1a14] text-[#c9922a]" : hovered ? "text-[#b0aa9e] bg-[#1e1e1e]" : "text-[#666] bg-transparent"}`}
        >
            {
                active && (
                    <div className="absolute -left-2.5 top-[20%] bottom-[20%] w-0.5 rounded-r-sm bg-[#c9922a]" />
                )
            }

            <span className='flex h-4 w-4 shrink-0 items-center justify-center'>{item.icon}</span>

            <span className={`overflow-hidden text-sm font-normal transition-opacity duration-150 ease-out delay-75 ${expanded ? "opacity-100" : "opacity-0"}`}>
                {item.label}
            </span>
        </Link>
    )
}