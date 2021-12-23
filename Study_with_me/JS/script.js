let tm=document.getElementById("t_min");
let ts=document.getElementById("t_sec");
let bm=document.getElementById("b_min");
let bs=document.getElementById("b_sec");

let startpause=document.getElementById("startpause");
let reset=document.getElementById("reset");

var sBtn=document.getElementById("settings");
var save=document.getElementById("save");
let pTime= document.getElementById("ptime")
let bTime= document.getElementById("btime")
let pt, bt;

let volumeIcon =document.getElementById("volume-icon");
let timerAudio=document.getElementById("timer-audio");

//Pomodoro timer section

let startTimer;
startpause.addEventListener('click', function(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000)
        startpause.innerText="Pause";
    } 
    else {
        clearInterval(startTimer);
        startpause.innerText="Start";
        startTimer=undefined;
    }
})

function resettimer(){
    if (pt === undefined && bt === undefined){
        tm.innerText = 25;
        ts.innerText = "00";

        bm.innerText = 05;
        bs.innerText = "00";
    }
    else{
        change_time()
        ts.innerText = "00";
        bs.innerText = "00";
    }

    clearInterval(startTimer);
    startpause.innerText="Start";
    startTimer = undefined;
}

reset.addEventListener('click', function(){
    resettimer();
})

let timerbell=true;
function timer(){
    //pomodoro timing
    if (ts.innerText !=0){
        ts.innerText--;

    }
    else if(tm.innerText!=0 && ts.innerText==0){
        ts.innerText=59;
        tm.innerText--;
    }

    //break timing
    if (tm.innerText==0 && ts.innerText==0){
        if (timerbell){
            playAudio();
            timerbell=false;
        }
        if (bs.innerText !=0){
            bs.innerText--;
        }else if(bm.innerText!=0 && bs.innerText==0){
            bs.innerText=59;
            bm.innerText--;
        }
    }

    if (tm.innerText==0 && ts.innerText==0 && bm.innerText==0 && bs.innerText==0){
        playAudio();
        resettimer();
    }
}

//menu open close button code
sBtn.addEventListener('click',function(){
    const toggleMenu=document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
})

//change time from settings
save.addEventListener('click',function(){
    change_time();
})

function change_time(){
    pt=pTime.value;
    bt=bTime.value;
    if (pt.length ==1 && bt.length==1){
        tm.innerHTML="0"+ pTime.value;
        bm.innerHTML="0"+ bTime.value;
        ts.innerHTML="00";
        bs.innerHTML="00";
    }
    else if (pt.length ==1){
        tm.innerHTML="0"+ pTime.value;
        bm.innerHTML=bTime.value;
        ts.innerHTML="00";
        bs.innerHTML="00";
    }
    else if (bt.length==1){
        tm.innerHTML=pTime.value;
        bm.innerHTML="0"+ bTime.value;
        ts.innerHTML="00";
        bs.innerHTML="00";
    }
    else{
        tm.innerHTML=pTime.value;
        bm.innerHTML=bTime.value;
        ts.innerHTML="00";
        bs.innerHTML="00";
    }   
}

//Timer audio play/mute functionality
timerAudio.muted=true;

function playAudio(){
    
    if (volumeIcon.className !="fas fa-volume-mute fa-2x col-2 p-0"){
        timerAudio.play();
        timerAudio.muted=false;
    }
    else{
        timerAudio.muted=true;
    }
    
}

//mute unmote button code
volumeIcon.addEventListener('click',function(){
    if (timerAudio.muted){
        volumeIcon.className="fas fa-volume-mute fa-2x col-2 p-0";
        timerAudio.muted=false;
    }
    else{
        volumeIcon.className="fas fa-volume-up fa-2x col-2 p-0";
        timerAudio.muted=true;
    }

    
})

//Video Changing Fuctionality

let videoShuffleBtn= document.getElementById("video-shuffle-btn");
videoShuffleBtn.addEventListener('click',function(){
    chooseVid();
})
let vidCounter=0;
function chooseVid(){
    var videoStorage = [ 
        'video/video1.mp4',
        'video/video2.mp4',
        'video/vid3.mp4',
        'video/vid4.mp4',
        'video/vid5.mp4',
        'video/vid6.mp4',
        'video/vid7.mp4'
        ],
            video = document.querySelector('video');
            // choose one random url from our storage as the active video
            activeVideo = videoStorage[vidCounter];    
            (vidCounter<videoStorage.length-1) ? vidCounter++ : vidCounter=0;  

        
        // check which file extension your browser can play and set the video source accordingly
         video.setAttribute('src', activeVideo);
}

//Fullscreen button

let videoFullscreenBtn=document.getElementById("video-fullscreen-btn");
videoFullscreenBtn.addEventListener('click',function(){
    toggleFullscreen();
})

var db, isfullscreen = false;
function toggleFullscreen(){
	db = document.body;
	if(isfullscreen == false){
		if(db.requestFullScreen){
		    db.requestFullScreen();
		} else if(db.webkitRequestFullscreen){
		    db.webkitRequestFullscreen();
		} else if(db.mozRequestFullScreen){
		    db.mozRequestFullScreen();
		} else if(db.msRequestFullscreen){
		    db.msRequestFullscreen();
		}
		isfullscreen = true;
	} else {
		if(document.cancelFullScreen){
		    document.cancelFullScreen();
		} else if(document.exitFullScreen){
		    document.exitFullScreen();
		} else if(document.mozCancelFullScreen){
		    document.mozCancelFullScreen();
		} else if(document.webkitCancelFullScreen){
		    document.webkitCancelFullScreen();
		} else if(document.msExitFullscreen){
		    document.msExitFullscreen();
		}
		isfullscreen = false;
	}
}
