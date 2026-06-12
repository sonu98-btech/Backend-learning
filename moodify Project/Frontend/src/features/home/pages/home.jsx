import React, { useContext } from 'react'
import Expression from "../../expression/components/Expression"
import Player from "../components/Player"
import { SongContext } from "../home.context";

const Home = () => {
    const { playerVisible } = useContext(SongContext);

    if (!playerVisible) {
        return (
            <div style={{ minHeight: "100vh", background: "#111", color: "#fff", padding: "24px 16px" }}>
                <div style={{ maxWidth: "1120px", width: "100%", margin: "0 auto" }}>
                    <div style={{ display: "flex", flexDirection: "column", padding: "24px", borderRadius: "24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <Expression />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: "100vh", background: "#111", color: "#fff", padding: "24px 16px" }}>
            <div style={{ maxWidth: "1120px", width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "stretch", minHeight: "calc(100vh - 48px)" }}>
                <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "24px", borderRadius: "24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Expression />
                </div>
                <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "24px", borderRadius: "24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Player />
                </div>
            </div>
        </div>
    )
}

export default Home