song="";
status="";
object=[];

function preload(){
    song=loadSound("alert.mp3");
}

function setup(){
    canvas=createCanvas(640,430);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,430);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status = Object Detecting";
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);

    object=results;
}

function draw(){
   image(video,0,0,640,430);
   if(status!=""){
       r= random(255);
       g= random(255);
       b= random(255);
       objectDetector.detect(video,gotResult);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="Status = Object Detected";
        document.getElementById("number").innerHTML="Number of objects detected are :"+object.length+" ";
        fill(r,g,b);
        percentage= floor(object[i].confidence*100);
        text(object[i].label+" "+percentage+"%",object[i].x,object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
        if(object[i].length=="person"){
            document.getElementById("number").innerHTML="Baby Found";
            song.stop();
        }

        else{
            document.getElementById("number").innerHTML="Baby not Found";
            song.play();
        }
    }
    if(object[i].length==0){
        document.getElementById("number").innerHTML="Baby not Found";
        song.play();
    }
   }
   }