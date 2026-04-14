import Card from './Card';

function Cards({projects, skills, socials}) {
    const cards = [
        {
            label: "Projects",
            value: projects.length,
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="3" width="14" height="10" rx="2" stroke="#c9922a" strokeWidth="1.3" />
                    <path d="M5 7.5h6M5 10h4" stroke="#c9922a" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
            ),
            to: "/admin/projects",
            badge: "+1 since last week"
        },
        {
            label: "Skills",
            value: skills.length,
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
            ),
            badge: "Frontend",
            to: "/admin/skills",
        },
        {
            label: "Socials",
            value: socials.length,
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="4.5" cy="8" r="2.5" stroke="#c9922a" strokeWidth="1.3" />
                    <circle cx="11.5" cy="4.5" r="2.5" stroke="#c9922a" strokeWidth="1.3" />
                    <circle cx="11.5" cy="11.5" r="2.5" stroke="#c9922a" strokeWidth="1.3" />
                    <path d="M6.9 6.7l2.2-1.5M6.9 9.3l2.2 1.5" stroke="#c9922a" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
            ),
            badge: "Active",
            to: "/admin/socials",
        },
    ];
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {cards.map((card) => (
                <Card key={card.title} stat={card} />
            ))}
        </div>
    )
}

export default Cards