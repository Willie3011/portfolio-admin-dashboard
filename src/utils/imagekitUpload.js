import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload
} from '@imagekit/react';

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

export const uploadToImageKit = async (file, options = {}) => {
    const {
        folder = "/portfolio",
        onProgress = () => { },
        abortSignal = null
    } = options;

    try {
        const { signature, expire, token, publicKey } = await authenticator();

        const uploadResponse = await upload({
            expire,
            token,
            signature,
            publicKey,
            file,
            fileName: file.name,
            folder,
            useUniqueFileName: true,
            onProgress,
            abortSignal
        });

        return uploadResponse;
    } catch (error) {
        if (error instanceof ImageKitAbortError) {
            throw new Error("Upload cancelled");
        } else if (error instanceof ImageKitInvalidRequestError) {
            throw new Error("Invalid upload request");
        } else if (error instanceof ImageKitUploadNetworkError) {
            throw new Error("Network error during upload");
        } else if (error instanceof ImageKitServerError) {
            throw new Error("ImageKit server error");
        } else {
            throw error;
        }
    }
}
