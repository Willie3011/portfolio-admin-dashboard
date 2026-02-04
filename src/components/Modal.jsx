import React from 'react'
import { IoMdClose } from 'react-icons/io';

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <section className={`${isOpen ? "fixed" : "hidden"} overflow-y-auto overflow-x-hidden top-0 left-0 right-0 z-50 items-center justify-center w-full md:inset-0 h-full`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 w-full h-full" onClick={onClose}></div>
            <div className="relative top-1/2 left-1/2 -translate-1/2 p-4 w-full max-w-2xl h-full md:h-auto">

                <div className="relative p-4 bg-secondary rounded-lg shadow sm:p-5">

                    {/* Header */}
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                        <h3 className='text-lg font-semibold text-primary'>{title}</h3>
                        <button onClick={() => onClose(false)} className='text-gray bg-transparent hover:bg-accent/20 hover:text-primary rounded-lg text-sm p-1.5 ml-auto inline-flex items-center cursor-pointer'>
                            <IoMdClose className="w-5 h-5" />
                            <span className="sr-only">Close Modal</span>
                        </button>
                    </div>

                    <div>{children}</div>
                </div>
            </div>
        </section>
    )
}

export default Modal