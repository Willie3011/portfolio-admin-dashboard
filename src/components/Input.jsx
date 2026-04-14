import React from 'react'

function Input({ label, ...props }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-[#888]">{label}</label>
            <input
                {...props}
                className="w-full rounded-md border border-[#2a2a2a] bg-[#111] px-3 py-2 text-sm text-[#e8e2d4] outline-none transition-colors focus:border-[#c9922a55]"
            />
        </div>
    )
}

export default Input