import React from 'react'
import Card from './Card';
import { FaProjectDiagram, FaTools, FaShareAlt } from "react-icons/fa";

function Cards({projects, skills, socials}) {
    const cards = [
        {
            title: "Projects",
            value: projects.length,
            icon: FaProjectDiagram,
            to: "/admin/projects",
        },
        {
            title: "Skills",
            value: skills.length,
            icon: FaTools,
            to: "/admin/skills",
        },
        {
            title: "Socials",
            value: socials.length,
            icon: FaShareAlt,
            to: "/admin/socials",
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