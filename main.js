song_name = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreleftWrist = 0;


function setup()
{
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload()
{
    song = loadSound("music.mp3");
}

function draw()
{
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_name = song.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song.stop();
        if(song_name == false)
        {
            song.play();
        }
        else
        {
            console.log("Song Name: song");
            document.getElementById("song_id").innerHTML = "Song Name: song";
        }
    }
}

function modelLoaded()
{
    console.log("poseNet Is Initialized");
}

function gotposes(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}