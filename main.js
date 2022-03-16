let CARROTCOUNT = 10;
let BUGCOUNT = 10;

const bug = document.querySelector('.bug');
let playstop = document.querySelector('.fas');
const gamebtn = document.querySelector('.game_button')
const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();
const audio = new Audio('sound/bg.mp3');
const carrotsound = new Audio('sound/carrot_pull.mp3');
const lost = new Audio('sound/bug_pull.mp3');
const timeover = new Audio('sound/alert.wav');
const win = new Audio('sound/game_win.mp3');
const tamer = document.querySelector('.game_timer');
const popup = document.querySelector('.pop-up');
const message = document.querySelector('.pop-up_message');
const score = document.querySelector('.game_score');
let carimg = document.querySelector('#carimg');
let carimg2 = document.querySelector('#carimg2');
const replay = document.querySelector('.pop-up_refresh');
let image = document.querySelector('.imgs');

function intitGame() {
    field.innerHTML = '';
    addItem('carrot',CARROTCOUNT,'img/carrot.png')
    addItem('bug',BUGCOUNT,'img/bug.gif')
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - 80;
    const y2 = fieldRect.height - 80;
    for (let i = 0; i <count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src',imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    };
}

function stop() {
    timerstop = true;
    clearInterval(mytimer);
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
//게임 스타트 버튼 //

let timerstop = true; //타미어 정지 변수
let mytimer; //타이머 변수

function startTimer() {
    if(timerstop) {
        let time = 10;
        let min = ""; //분
        let sec = ""; //초
        
        mytimer = setInterval(function(){
            min = parseInt(time/60); // 1.6 1분
            sec = time%60; // 나머지 0 이됩
            
            tamer.innerHTML =  `${min} : ${sec}`;
            time--;
            if(time < 0 ){
                stop();
                count = CARROTCOUNT;
                popup.classList.remove("hide");
                message.innerHTML = 'Time Over'
                audio.pause();
                timeover.play();
            }
    },1000);timerstop = false;}
};
//타이머 멈춤//

function reset() {
    timerstop = true;
    clearInterval(mytimer);
}


gamebtn.addEventListener('click',(event)=>{   
    if(timerstop) { 
        scoreTo();
        intitGame(); 
        audio.play();
        startTimer();
        playstop.classList.remove('fa-stop');
        field.style.display = 'block';
         //flase 로 바뀜
         } 
    else  {
        count = CARROTCOUNT;
        stop(); //한번 더 클릭하니까 flase else 실행
       console.log('stop');
       playstop.classList.add('fa-stop');
       field.style.display = 'none';
    } 
});



const stopbtn = document.querySelector('.fa-stop');
//리플레이 //

replay.addEventListener('click',()=>{
    popup.classList.add("hide");
    startTimer();
    scoreTo();
    intitGame(); 
    audio.play();
    gamebtn.classList.remove('hidden')
    field.classList.remove('clickben')
});

//스코어//
let count = CARROTCOUNT;

field.addEventListener('click', onFieldClick);

function onFieldClick(event) {
    const target = event.target;
    if (target.matches('.carrot')){
        carrotsound.play();
        count--;
        score.innerHTML = count;
        target.remove();

        if(count < 1) {
            count = CARROTCOUNT;
            stop();
            popup.classList.remove("hide")
            message.innerHTML = 'You Win'
            audio.pause();
            win.play();
            gamebtn.classList.add('hidden')
        }
    }
    if (target.matches('.bug')){
        count = CARROTCOUNT;
        stop();
        lost.play();
        popup.classList.remove("hide")
        message.innerHTML = 'lost'
        audio.pause();
        gamebtn.classList.add('hidden')
        field.classList.add('clickben')
    }
}


function resetScore() {
    CARROTCOUNT = 0;
    BUGCOUNT = 0;
}

function scoreTo() {
    score.innerHTML = CARROTCOUNT;
}