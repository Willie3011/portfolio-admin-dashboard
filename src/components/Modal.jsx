import React from 'react'
import { IoMdClose } from 'react-icons/io';

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <section className={`${isOpen ? "fixed" : "hidden"} overflow-y-auto overflow-x-hidden top-0 left-0 right-0 z-50 items-center justify-center w-full md:inset-0 h-full`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 w-full h-full" onClick={onClose}></div>
            <div className="relative  top-1/2 left-1/2 -translate-1/2 p-4 w-full max-w-2xl h-full md:h-auto">

                <div className="relative w-full p-5 rounded-xl border border-[#2a2a2a] bg-[#161616] shadow">

                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-[#1e1e1e] px-6 py-4.5">
                        <h2 className='text-base font-semibold text-[#e8e2d4]'>{title}</h2>
                        <button onClick={() => onClose(false)} className='flex w-7 h-7 items-center justify-center rounded-md border border-[#2a2a2a] bg-transparent text-base text-[#666] transition-colors hover:border-[#c9922a44] hover:bg-[#1e1a14] hover:text-[#c9922a]'>
                            <IoMdClose className="w-full h-full" />
                            <span className="sr-only">Close Modal</span>
                        </button>
                    </div>

                    <div className='p-6'>{children}</div>
                </div>
            </div>
        </section>
    )
}

export default Modal