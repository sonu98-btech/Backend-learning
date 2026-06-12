import { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import { detectFace, startCamera, loadModel } from "../utils/utils";
import { useSong } from "../../home/hooks/use.song";
import { SongContext } from "../../home/home.context";
import { useContext } from "react";
function App() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Click Detect Face");
  const { getSongHandeler } = useSong();
  const { setPlayerVisible } = useContext(SongContext);



  useEffect(() => {




    loadModel(faceLandmarkerRef);
    startCamera(videoRef);

    return () => {
      const stream = videoRef.current?.srcObject;

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#111", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white" }}>
      <h1>Face Expression Detector</h1>



      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="700"
        style={{ borderRadius: "20px", border: "2px solid #22c55e" }}
      />

      <h2 style={{ marginTop: "20px" }}>{expression}</h2>
      <button
        onClick={async () => {
          await detectFace(videoRef, faceLandmarkerRef, setExpression, async (mood) => {
            try {
              await getSongHandeler({ mood });
              setPlayerVisible(true);
            } catch (e) {
              console.error("Failed to load song for mood", mood, e);
            }
          });
        }}
        style={{
          padding: "12px 20px",
          marginBottom: "20px",
          cursor: "pointer",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px"
        }}
      >
        Detect Face
      </button>
    </div>
  );
}

export default App;