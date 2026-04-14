import React from 'react'

function Textarea({ label, ...props }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-[#888]">{label}</label>
            <textarea
                {...props}
                className="min-h-20 w-full rounded-md border border-[#2a2a2a] bg-[#111] px-3 py-2 text-sm text-[#e8e2d4] outline-none transition-colors focus:border-[#c9922a55] no-scrollbar"
            />
        </div>
    )
}

export default Textarea