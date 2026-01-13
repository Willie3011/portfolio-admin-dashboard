import { useRef, useState } from 'react'
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload
} from '@imagekit/react';
import axios from 'axios';

function ImageUpload({ value, onChange, onUploadComplete, folder = '/uploads' }) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(value || null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);

    const abortControllerRef = useRef(null);

    const authenticator = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/upload-auth`);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Auth failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error: ", error);
            throw new Error("Authentication request failed");
        }
    }

    const uploadToImageKit = async (file) => {
        setUploading(true);
        setError(null);
        setUploadProgress(0);

        abortControllerRef.current = new AbortController();

        try {
            const authParams = await authenticator();
            console.log(authParams)
            const { signature, expire, token, publicKey } = authParams;

            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                folder: folder,
                useUniqueFileName: true,


                onProgress: (event) => {
                    const progress = (event.loaded / event.total) * 100;
                    setUploadProgress(progress);
                },

                abortSignal: abortControllerRef.current.signal,
            });

            console.log("Upload seccessfull: ", uploadResponse);

            setPreview(uploadResponse.url);

            onChange(uploadResponse);

            if (onUploadComplete) {
                onUploadComplete(uploadResponse)
            }
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.log("Upload cancelled");
                setError("Upload cancelled");
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request: ", error.message);
                setError("Invalid upload request. Please try again.")
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error: ", error.message);
                setError("Network error. Check your connection.");
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error: ", error.message);
                setError("Server error. Please try again later.");
            } else {
                console.error("Upload error: ", error.message);
                setError("Server failed. Please try again.");
            }

            setPreview(null);
            onChange(null);
        } finally {
            setUploading(false);
            setUploadProgress(0);
            abortControllerRef.current = null;
        }
    }

    const handleFile = async (file) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError("Please select an image file");
            return;
        }

        const maxSize = 5 * 1024 * 1024; //5MB
        if (file.size > maxSize) {
            setError("File size must be less than 5MB");
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);

        await uploadToImageKit(file);
    };

    const cancelUpload = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();

        if (uploading) {
            cancelUpload();
        }

        setPreview(null);
        setError(null);
        setUploadProgress(0);
        onChange(null);
    }

    return (
        <div>
            <div
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition ${dragging ? "border-blue-500 bg-blue-500/10" : uploading ? "border-gray-600 bg-gray-800 cursor-not-allowed" : "border-gray-600 bg-gray-800"
                    }`}
                onClick={() => !uploading && inputRef.current.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    if (!uploading) setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    if (!uploading) handleFile(e.dataTransfer.files[0])
                }}
            >
                <input
                    type="file"
                    accept='image/*'
                    ref={inputRef}
                    className='hidden'
                    onChange={(e => handleFile(e.target.files[0]))}
                    disabled={uploading}
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
                            disabled={uploading}
                        >
                            <FaTrash />
                        </button>

                        {uploading && (
                            <div className="absolute inset-0 bg-black/70 rounded-lg flex flex-col items-center justify-center">
                                <div className="text-white text-sm mb-2">
                                    Uploading{Math.round(uploadProgress)}%
                                </div>
                                <div className="w-3/4 bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    cancelUpload();
                                }}
                                    className='mt-3 text-xs text-red-400 hover:text-red-300'>Cancel Upload</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <FaCloudUploadAlt className='text-4xl text-gray-400 mb-3' />
                        <p className='text-gray-300 text-sm'>
                            {uploading ? "Uploading..." : "Click to upload or drag & drop"}
                        </p>
                        <p className='text-gray-500 text-xs mt-1'>
                            PNG, JPG, SVG (max 5MB)
                        </p>
                    </>
                )}
            </div>

            {error && (
                <div className="mt-2 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded p-2">
                    {error}
                </div>
            )}
        </div>
    )
}

export default ImageUpload