import { invoke } from "@tauri-apps/api/tauri";

invoke("greet", { name: "starting main.ts" });

const nextCamElement = document.getElementById("nextCam") as HTMLButtonElement;
const webcamElement = document.getElementById("webcam") as HTMLVideoElement;

// switch to next camera
nextCamElement.addEventListener("click", async () => {
  const videoElement = document.getElementById("webcam") as HTMLVideoElement;
  const videoDevices = await navigator.mediaDevices.enumerateDevices();
  const videoInputs = videoDevices.filter((device) => device.kind === "videoinput");
  const { srcObject } = videoElement as any; // f it
  const currentCameraIndex = videoInputs.findIndex((input) => input.deviceId === srcObject.getVideoTracks()[0].getSettings().deviceId);
  const nextCameraIndex = (currentCameraIndex + 1) % videoInputs.length;
  const nextCameraId = videoInputs[nextCameraIndex].deviceId;
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: { exact: nextCameraId },
    },
  });
  videoElement.srcObject = stream;
});

// toggle buttons when window is focused
window.addEventListener("focus", () => {
  nextCamElement.style.display = "block";
});
window.addEventListener("blur", () => {
  nextCamElement.style.display = "none";
});

// access webcam
navigator.mediaDevices
  .getUserMedia({ audio: false, video: true })
  .then((stream) => {
    webcamElement.srcObject = stream;
  })
  .catch((error) => {
    console.error("Error accessing the webcam:", error);
  });
