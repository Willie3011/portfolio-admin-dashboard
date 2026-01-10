import React from 'react'
import Card from './Card';
import { FaProjectDiagram, FaTools, FaShareAlt } from "react-icons/fa";

function Cards() {
    const cards = [
        {
            title: "Projects",
            value: 12,
            icon: FaProjectDiagram,
            to: "/admin/projects",
            gradient: "from-blue-100 to-blue-50",
        },
        {
            title: "Skills",
            icon: FaTools,
            to: "/admin/skills",
            gradient: "from-purple-100 to-purple-50",
        },
        {
            title: "Socials",
            icon: FaShareAlt,
            to: "/admin/socials",
            gradient: "from-green-100 to-green-50",
        },
    ];
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {cards.map((card) => (
                <Card key={card.title} {...card} />
            ))}
        </div>
    )
}

export default Cards