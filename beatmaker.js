class BeatMaker {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.percSound = document.querySelector(".perc-sound");
        this.clapSound = document.querySelector(".clap-sound");
        this.shakerSound = document.querySelector(".shaker-sound");
        this.selectors = document.querySelectorAll("select");
        this.mutes = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.index = 0;
        this.beatPerMin = 150;
        this.isPlaying = null;
    }

    activePad() {
        this.classList.toggle("active");
        // console.log(this);
    }

    repeat() {
        let stair = this.index % 9;
        const activeBars = document.querySelectorAll(`.b${stair}`);
        activeBars.forEach(bar => {
            bar.style.animation = `playbox 0.3s alternate ease-in-out 2`;
            if (bar.classList.contains("active")) {
                if (bar.classList.contains("perc-pad")) {
                    this.percSound.currentTime = 0;
                    this.percSound.play();
                }
                if (bar.classList.contains("clap-pad")) {
                    this.clapSound.currentTime = 0;
                    this.clapSound.play();
                }
                if (bar.classList.contains("shaker-pad")) {
                    this.shakerSound.currentTime = 0;
                    this.shakerSound.play();
                }
            }
        })
        // console.log(stair);
        this.index++;
    }

    start() {
        // console.log(this);
        if (this.isPlaying) {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
        else {
            const intervel = (60 / this.beatPerMin) * 1000;
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, intervel);
        }
    }

    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        }
        else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }

    updateSound(evt) {
        // console.log(evt);
        const name = evt.target.name;
        const value = evt.target.value;
        // console.log(name, value);
        if (name == "perc-select") {
            this.percSound.src = value;
        }
        else if (name == "clap-select") {
            this.clapSound.src = value;
        }
        else {
            this.shakerSound.src = value;
        }
    }

    muteSound(evt) {
        const track = evt.target.getAttribute("data-track");
        evt.target.classList.toggle("active");
        if (evt.target.classList.contains("active")) {
            switch (track) {
                case "0": this.percSound.volume = 0;
                    break;
                case "1": this.clapSound.volume = 0;
                    break;
                case "2": this.shakerSound.volume = 0;
                    break;
            }
        }
        else {
            switch (track) {
                case "0": this.percSound.volume = 1;
                    break;
                case "1": this.clapSound.volume = 1;
                    break;
                case "2": this.shakerSound.volume = 1;
                    break;
            }
        }
    }

    changeTempo(evt) {
        const tempoNumber = document.querySelector(".tempo-number");
        tempoNumber.innerText = evt.target.value;
    }

    updateTempo(evt) {
        this.beatPerMin = evt.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if (this.playBtn.classList.contains("active")) {
            this.start();
        }
    }
}

const beatMaker = new BeatMaker();

// beatMaker.start();

beatMaker.pads.forEach(pad => {
    pad.addEventListener("click", beatMaker.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

beatMaker.selectors.forEach(select => {
    select.addEventListener("change", function (evt) {
        beatMaker.updateSound(evt);
    });
});

beatMaker.mutes.forEach(mute => {
    mute.addEventListener("click", function (evt) {
        beatMaker.muteSound(evt);
    });
});

beatMaker.playBtn.addEventListener("click", function () {
    beatMaker.updateBtn();
    beatMaker.start();
});

beatMaker.tempoSlider.addEventListener("input", function (evt) {
    beatMaker.changeTempo(evt);
});

beatMaker.tempoSlider.addEventListener("change", function (evt) {
    beatMaker.updateTempo(evt);
});