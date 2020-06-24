
const video = document.querySelector('#video');
const displaySize = {width: video.width, height: video.height}

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => video.srcObject = stream)
    .catch(error => {
        console.error(error);
        video.style.display= 'none';
        document.querySelector('p').style.display = 'block';
    });
}

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('vendor/face-api/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('vendor/face-api/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('vendor/face-api/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('vendor/face-api/models')
]).then(startVideo)


video.addEventListener('playing', ()=> {
    const canvas = faceapi.createCanvasFromMedia(video);    
    document.body.append(canvas);
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(detectFace, 100, canvas);
});

async function detectFace(canvas) {
    const detections = await faceapi.detectAllFaces(video,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();    
    const resizedResults = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedResults);
    faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
    faceapi.draw.drawFaceExpressions(canvas, resizedResults);
}