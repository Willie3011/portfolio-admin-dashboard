import { useRef, useState } from 'react'
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa'

function ImageUpload({ value, onChange }) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(value || null);
    const [dragging, setDragging] = useState(false);

    const handleFile = (file) => {
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);
        onChange(file);
    }
    return (
        <div
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition ${dragging ? "border-blue-500 bg-blue-500/10" : "border-gray-600 bg-gray-800"}`}
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files[0]);
            }}
        >
            <input type="file" accept='image/*' ref={inputRef} className='hidden' onChange={(e) => handleFile(e.target.files[0])} />

            {preview ? (
                <div className="relative">
                    <img src={preview} className='max-h-48 rounded-lg object-contain' />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                            onChange(null);
                        }}
                        className='absolute top-2 right-2 bg-black/70 p-2 rounded-full text-white hover:bg-red-600'
                    >
                        <FaTrash/>
                    </button>
                </div>
            ) : (
                    <>
                        <FaCloudUploadAlt className='text-4xl text-gray-400 mb-3' />
                        <p className='text-gray-300 text-sm'>
                            Click to upload or drag & drop
                        </p>
                        <p className='text-grya-500 text-xs mt-1'>
                            PNG, JPG, SVG (max 800x400)
                        </p>
                    </>
            )}
        </div>
    )
}

export default ImageUpload