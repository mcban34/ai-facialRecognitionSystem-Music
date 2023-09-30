const video = document.getElementById("video");

const statusInformation = {
  angry: "Sinirli",
  disgusted: "İğrenmiş",
  fearful: "Korkunç",
  happy: "Mutlu",
  neutral: "Doğal",
  sad: "Üzgün",
  surprised: "Şaşkın"
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models")
]).then(() => {
  startCamera();
});

function startCamera() {
  navigator.getUserMedia(
    {
      video: {}
    },
    stream => (video.srcObject = stream),
    err => console.log(err)
  );
}

let detections = []
let maxEmotion = '';
video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const boxSize = {
    width: video.width,
    height: video.height
  };

  faceapi.matchDimensions(canvas, boxSize);


  setInterval(async () => {
    detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    let maxScore = 0;
    if (detections && detections.length > 0) {
      detections = detections[0].expressions
      for (const emotion in detections) {
        if (detections[emotion] > maxScore) {
          maxEmotion = emotion;
          maxScore = detections[emotion];
        }
      }
      document.querySelector(".situation").innerHTML = `Şuanki Durumunuz : ${statusInformation[maxEmotion]}`
      document.querySelector("button").disabled = false;
    }
    else {
      document.querySelector(".situation").innerHTML = `Şuanki Durumunuz : Yüzünüz Algılanamadı`
      document.querySelector("button").disabled = true;
    }
  }, 500);
});


document.querySelector(".tikla").addEventListener("click", function () {
  console.log(detections);
  window.location.href = `play-music.html?situation=${maxEmotion}`;
  console.log(maxEmotion);
})