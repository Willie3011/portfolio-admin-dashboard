import React from 'react'

function Textarea({ label, ...props }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-primary">{label}</label>
            <textarea
                {...props}
                className="w-full p-2.5 rounded-lg text-gray-700 border border-primary/40 resize-none"
            />
        </div>
    )
}

export default Textarea