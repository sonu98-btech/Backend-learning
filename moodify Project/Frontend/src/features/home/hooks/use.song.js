import { useContext } from "react";
import { SongContext } from "../home.context";
import { getSong } from "../services/home.api";

export const useSong = () => {
  const context = useContext(SongContext);
  const { loading, setloading, song, setsong } = context;

  const getSongHandeler = async ({ mood }) => {
    setloading(true);
    const data = await getSong({ mood });
    setsong(data.song);
    setloading(false);
  };

  return {
    loading,
    getSongHandeler,
    song,
  };
};
