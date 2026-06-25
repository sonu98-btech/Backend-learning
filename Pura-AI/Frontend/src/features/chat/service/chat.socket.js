import { io } from "socket.io-client";

let socket;

export const initializeSocketConnection = () => {

    if (socket) return socket;

    socket = io(import.meta.env.VITE_API_URL, {
        withCredentials: true,
    });

    socket.on("connect", () => {
        console.log("Connected:", socket.id);
    });

    return socket;
};

export const getSocket = () => socket;