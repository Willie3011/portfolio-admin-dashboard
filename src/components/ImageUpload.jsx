import { useRef, useState } from 'react'
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ImageUpload({ value, onChange }) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(value || null);
    const [dragging, setDragging] = useState(false);




    const handleFile = async (file) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image file");
            return;
        }

        const maxSize = 5 * 1024 * 1024; //5MB
        if (file.size > maxSize) {
        toast.warning("File size must be less than 5MB");
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
        onChange(file);
    };

    const handleRemove = (e) => {
        e.stopPropagation();

        setPreview(null);
        onChange(null);
    }

    return (
        <div>
            <div
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition ${dragging ? "border-accent/50 bg-accent/10" : "border-primary/40 bg-secondary"}`}
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleFile(e.dataTransfer.files[0])
                }}
            >
                <input
                    type="file"
                    accept='image/*'
                    ref={inputRef}
                    className='hidden'
                    onChange={(e => handleFile(e.target.files[0]))}
                />

                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            className='max-h-48 rounded-lg object-contain'
                        />
                        <button
                            onClick={handleRemove}
                            className='absolute top-2 right-2 bg-black/70 p-2 rounded-full text-white hover:bg-red-600 transition'
                        >
                            <FaTrash />
                        </button>
                    </div>
                ) : (
                    <>
                        <FaCloudUploadAlt className='text-4xl text-gray-400 mb-3' />
                        <p className='text-gray-300 text-sm'>
                        </p>
                        <p className='text-gray-500 text-xs mt-1'>
                            PNG, JPG, SVG (max 5MB)
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default ImageUpload