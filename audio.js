let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-img");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");


let volume_slider = document.querySelector(".volume-slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-time");

let randomIcon = document.querySelector(".fa-random");
let randomIcon1=document.querySelector(".fa-repeat");
let current_track = document.createElement("audio");
let muted=document.querySelector(".fa-volume-down");

let track_index = 0;  //  baslangicda calinan mahninin indexi, mahnilar degistikce buda artir azalir
let isPlaying = false; //hal hazirda mahni calir yoxsa yox
let isRandom = false; // rastgele mahni calir yoxsa yox
let updateTimer; // mahninin calma vaxtini gosterir setintervalda degisir


//musiqi list
const music_list = [

  {
    img: "https://neonmusic.online/wp-content/uploads/2023/04/Eminem-Visu-News.jpg",
    name: "Mockingbird",
    artist: " Eminem",
    music: "audio/mockinbird.mp3",
  },
  {
    img: "https://rockefsaneleri.files.wordpress.com/2012/02/ogun-sanlisoy.jpg",
    name: "Saydım",
    artist: " Ogun Sanlisoy",
    music: "audio/saydim.mp3",
  },
  {
    img: "https://res.cloudinary.com/dnqigm7pz/image/upload/f_auto/q_auto/w_800,h_800,c_limit/prod/images/episode_thumbnails/1698422272.546.jpg",
    name: "Me gustas tu",
    artist: " Manu Chao",
    music: "audio/me gustas tu.mp3",
  },
  {
    img: "https://static.stereogum.com/uploads/2019/04/Stories-Brother-Louie-1555348611-518x520.jpg",
    name: " Brother Louie",
    artist: "Modern Talking",
    music: "audio/brother louie.mp3",
  },

  
];
 
console.log(music_list);
loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer); //teze mahni calinanda kohne mahninin zamanini durdurur
  reset();//kohne mahnidan qalan zamani 0liyir
  current_track.src = music_list[track_index].music;//calinan musiqinin qaynagini teyin edir indexe gore
  current_track.load();//yuklenen mahnini calmaga hazir vezyete getirir
track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";//mahninin seklini teyin edir
  track_name.textContent = music_list[track_index].name;//mahninin adini teyin edir
  track_artist.textContent = music_list[track_index].artist;// mahnini oxuyani teyin edir
  updateTimer = setInterval(setUpdate, 1000);// her 1 saniyeden 1 yenilenir buna sebebde mahninin saniyesini teyin etmekdir yeni ne qeder oxuyub  ne qeder kecib

  current_track.addEventListener("ended", nextTrack);//mahni bitende novbeti mahniya kec

    
}
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";

}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();

}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
 
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
  
 }
function repeatTrack() {
  let current_index = track_index;
  randomIcon1.classList.add('randomActive');

  loadTrack(current_index);
  playTrack();
   current_track.addEventListener("ended", repeatTrack);
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  current_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
}
function pauseTrack() {
  current_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play fa-2x"></i>';
}

//bu funksiya mahni listinde son mahnida oldugumuzda  ve ya random mahni aciq oldugunda ne etmeliyik onu gosterir
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;// eger random mahni calma acik degilse onda indexi 1 artir novbeti mahniya kec
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    //eger random mahni calma aciksa onda random indexe beraber ele
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    //eger sonuncu mahnidirsa basa qayit
    track_index = 0;
  }
  loadTrack(track_index);//yeni mahni cagrilir
  playTrack();//yeni mahni calinir
}
function prevTrack() {
  if (track_index > 0) {
    //eger hal hazirda calinan mahni ilk mahni deyilse  bir azaldir indexi
    track_index -= 1;
  } else {
    //eger ilk mahnidirse sonuncu mahniye qayidir
    track_index = music_list.length - 1;
  }
  loadTrack(track_index); //mahni cagrilir
  playTrack();}//mahni calinir

  function volumeTo() {
    current_track.volume = volume_slider.value / 100;
    //mahninin volumunu teyin edir  volume_slider.value  ise inputun deyerini gosterir
  }
  
function volumeDown() {
  current_track.volume = current_track.muted;
// muted.innerHTML="<i class='fa-solid fa-volume-mute'></i>";
}
function volumeUp() {
  current_track.volume = volume_slider.value / 100;
}
  function setUpdate() {
  
    if (!isNaN(current_track.duration)) {
 //mahninin vaxtini teyin ede bilirse yeni reqemdirse  serte gir
  
      let currentMinutes = Math.floor(current_track.currentTime / 60);
      let currentSeconds = Math.floor(
        current_track.currentTime - currentMinutes * 60
      );//cari oxutma movqeyini
  
      let durationMinutes = Math.floor(current_track.duration / 60);
      let durationSeconds = Math.floor(
        (current_track.duration - durationMinutes * 60)
      );//audionun uzunlugu
  
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }
  
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }