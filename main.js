prediction1 = ""
prediction2 = ""
Webcam.set({
    width: 400,
    height: 350,
    image_format: 'png',
    png_quality: 99
});
camera = document.getElementById("camera")
Webcam.attach('#camera')

function snap() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="cimage" src="' + data_uri + '">'
    });
}
console.log("version" + ml5.version)
model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LYrQdicrN/model.json", load)


function load() {
    console.log("model loaded and ready for use")
}

function speak() {
    s = window.speechSynthesis
    s1 = "the first prediction is" + prediction1
    s2 = "the second prediction is" + prediction2
    utterthis = new SpeechSynthesisUtterance(s1 + s2)
    s.speak(utterthis)
};

function identify() {
    img = document.getElementById("cimage")
    model.classify(img, output)
}

function output(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results)
        document.getElementById("emo").innerHTML = results[0].label
        document.getElementById("emo-2").innerHTML = results[1].label
        prediction1 = results[0].label
        prediction2 = results[1].label
        speak();

        if (results[0].label == "HAPPY") {
            document.getElementById("emoji").innerHTML = "&#128512;"
        }
        if (results[0].label == "SAD") {
            document.getElementById("emoji").innerHTML = "&#128532;"
        }
        if (results[0].label == "FEAR") {
            document.getElementById("emoji").innerHTML = "&#128546;"
        }
        if (results[0].label == "DISGUST") {
            document.getElementById("emoji").innerHTML = "&#128548;"
        }
        if (results[0].label == "ANGER") {
            document.getElementById("emoji").innerHTML = "&#128545;"
        }
        if (results[1].label == "HAPPY") {
            document.getElementById("emoji-2").innerHTML = "&#128512;"
        }
        if (results[1].label == "SAD") {
            document.getElementById("emoji-2").innerHTML = "&#128532;"
        }
        if (results[1].label == "FEAR") {
            document.getElementById("emoji-2").innerHTML = "&#128546;"
        }
        if (results[1].label == "DISGUST") {
            document.getElementById("emoji-2").innerHTML = "&#128548;"
        }
        if (results[1].label == "ANGRY") {
            document.getElementById("emoji-2").innerHTML = "&#128545;"
        }
    }
}