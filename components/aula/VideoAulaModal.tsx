import React from "react";
import ReactPlayer from "react-player";
import { AiOutlineClose } from "react-icons/ai";

interface VideoModalProps {
    videoUrl: string;
    onClose: () => void;
}

export default function VideoModal({ videoUrl, onClose }: VideoModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-4xl h-[80vh]"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    <AiOutlineClose size={24} />
                </button>

                <div className="w-full h-full flex items-center justify-center p-[1vh]">
                    <ReactPlayer
                        url={videoUrl}
                        width="100%"
                        height="100%"
                        controls
                    />
                </div>
            </div>
        </div>
    );
}
