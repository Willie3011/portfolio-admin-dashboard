import React from 'react'

function Textarea({ label, ...props }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-primary">{label}</label>
            <textarea
                {...props}
                className="w-full p-2.5 rounded-lg text-gray-700 border border-primary/40 focus:outline-none focus:border-accent/80 focus:ring-2 focus:ring-accent/20 resize-none"
            />
        </div>
    )
}

export default Textarea