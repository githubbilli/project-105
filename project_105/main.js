Webcam.set({
    height:300,
    width:300,
    image_format:'png',
    png_quality:95
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_image() {
    Webcam.snap(function(data_uri){
        document.getElementById("result") = '<img id = "taken_image" src = "'+data_uri+'"/>;'
    });
}

console.log('ml5 version:',ml5.vesion);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/C6xD3nwlt/model.json',modelLoaded);

function modelLoaded() {
    console.log("this model has been loaded");
}

function check() {
    img = document.getElementById("taken_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results) {
    if (error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("person").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}