import React from 'react'
import { IoMdClose } from 'react-icons/io';

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <section className={`${isOpen ? "fixed" : "hidden"} overflow-y-auto overflow-x-hidden top- left-0 right-0 z-50 items-center justify-center w-full md:inset-0 md:h-full`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">

                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

                    {/* Header */}
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{title}</h3>
                        <button onClick={() => onClose(false)} className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'>
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