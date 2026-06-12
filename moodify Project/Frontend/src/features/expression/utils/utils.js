import { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export const detectFace = async (
  videoRef,
  faceLandmarkerRef,
  setExpression,
  onDetected,
) => {
  const video = videoRef.current;
  const faceLandmarker = faceLandmarkerRef.current;

  if (video && faceLandmarker && video.readyState >= 2) {
    const results = faceLandmarker.detectForVideo(video, performance.now());

    if (results.faceBlendshapes?.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;
      const scores = {};

      blendshapes.forEach((item) => {
        scores[item.categoryName] = item.score;
      });

      const smile =
        ((scores.mouthSmileLeft || 0) + (scores.mouthSmileRight || 0)) / 2;
      const mouthFrown =
        ((scores.mouthFrownLeft || 0) + (scores.mouthFrownRight || 0)) / 2;
      const jawOpen = scores.jawOpen || 0;
      const browDown =
        ((scores.browDownLeft || 0) + (scores.browDownRight || 0)) / 2;
      const browInnerUp = scores.browInnerUp || 0;

      let detectedExpression = "sad 😢";
      let mood = "sad";

      if (smile > 0.6) {
        detectedExpression = "Happy 😊";
        mood = "happy";
      } else if (jawOpen > 0.045 && browInnerUp > 0.2) {
        detectedExpression = "Surprised 😲";
        mood = "surprised";
      } 
       

      setExpression(detectedExpression);
      if (typeof onDetected === "function") onDetected(mood);
    } else {
      setExpression("No Face Detected");
    }
  }
};

export const startCamera = async (videoRef) => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  if (videoRef.current) {
    videoRef.current.srcObject = stream;

    videoRef.current.onloadedmetadata = () => {
      videoRef.current.play();
    };
  }
};
export const loadModel = async (faceLandmarkerRef) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    runningMode: "VIDEO",
    numFaces: 1,
    outputFaceBlendshapes: true,
  });

  faceLandmarkerRef.current = faceLandmarker;
};
