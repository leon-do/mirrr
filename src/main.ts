import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

invoke("greet", { name: "starting main.ts" });

let isOnTop = false;
const nextCamElement = document.getElementById("nextCam") as HTMLImageElement;
const webcamElement = document.getElementById("webcam") as HTMLVideoElement;
const pinWinElement = document.getElementById("pinWin") as HTMLImageElement;

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
  pinWinElement.style.display = "block";
});
window.addEventListener("blur", () => {
  nextCamElement.style.display = "none";
  pinWinElement.style.display = "none";
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

// toggleAlwaysOnTop
pinWinElement.addEventListener("click", async () => {
  isOnTop = !isOnTop;
  await appWindow.setAlwaysOnTop(isOnTop);
  isOnTop ? (pinWinElement.src = "/src/assets/pin.svg") : (pinWinElement.src = "/src/assets/unpin.svg");
});
