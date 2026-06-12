import { createContext, useState } from "react";

export const SongContext = createContext()
export const SongContextProvider = ({ children }) => {
    const [song, setsong] = useState(null)
    const [loading, setloading] = useState(false)
    const [playerVisible, setPlayerVisible] = useState(false)

    return (
        <SongContext.Provider value={{ song, setsong, loading, setloading, playerVisible, setPlayerVisible }}>
            {children}
        </SongContext.Provider>
    )

}