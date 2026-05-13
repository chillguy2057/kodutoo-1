console.log("fail ühendatud");

// prompt: "javascript digital clock class oop weekday month name"

const ET_WEEKDAYS = ['Pühapäev','Esmaspäev','Teisipäev','Kolmapäev','Neljapäev','Reede','Laupäev'];
const EN_WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const ET_MONTHS = ['jaanuar','veebruar','märts','aprill','mai','juuni',
    'juuli','august','september','oktoober','november','detsember'];
const EN_MONTHS = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];

const BG_COLORS = ['#0a0a1a','#0f0a1a','#1a0a0a','#0a1a0a','#0a1a1a','#1a150a','#0f0f0f'];
const TEXT_COLORS = ['#00d4ff','#ff6b6b','#51cf66','#ffd43b','#cc5de8','#ff922b','#ffffff'];
const FONTS = ['Orbitron','Share Tech Mono','VT323'];

// prompt: "js clock class with font size color language format day night theme"
class Clock {
    constructor() {
        this.fontSize = 15;  // vw ühikutes
        this.bgColorIdx = 0;
        this.textColorIdx = 0;
        this.fontIdx = 0;
        this.is24h = true;
        this.isEt = true;
        this.autoTheme = true;

        // kella asukoht ekraanil
        this.posX = window.innerWidth / 2;
        this.posY = window.innerHeight / 2;
        this.moveStep = 20;

        this.applyPosition();
    }

    // nulliga täitmine: 9 -> "09"
    pad(n) {
        return n < 10 ? "0" + n : "" + n;
    }

    upDateClock() {
        const dateTime = new Date();
        let h = dateTime.getHours();
        const m = dateTime.getMinutes();
        const s = dateTime.getSeconds();

        if (!this.is24h) {
            const suffix = h < 12 ? " AM" : " PM";
            h = h % 12 || 12;
            document.getElementById('seconds').innerHTML = this.pad(s) + suffix;
        } else {
            document.getElementById('seconds').innerHTML = this.pad(s);
        }

        document.getElementById('hours').innerHTML = this.pad(h) + ":";
        document.getElementById('minutes').innerHTML = this.pad(m) + ":";

        if (this.autoTheme) this.applyDayNightTheme(dateTime.getHours());
    }

    updateDate() {
        const dateTime = new Date();
        const weekdays = this.isEt ? ET_WEEKDAYS : EN_WEEKDAYS;
        const months = this.isEt ? ET_MONTHS : EN_MONTHS;

        document.getElementById('weekday').innerHTML = weekdays[dateTime.getDay()];
        document.getElementById('day').innerHTML = this.pad(dateTime.getDate()) + ".";
        document.getElementById('month').innerHTML = months[dateTime.getMonth()];
        document.getElementById('year').innerHTML = dateTime.getFullYear();
    }

    // atribuut 1 ja 2: fondi suurus
    changeFontSizeBigger() {
        this.fontSize = this.fontSize + 1;
        if (this.fontSize > 25) {
            this.fontSize = 25;
            window.alert("Fondi suurus ei saa olla üle 25vw");
        }
        document.getElementById('clockContainer').style.fontSize = this.fontSize + "vw";
    }

    changeFontSizeSmaller() {
        this.fontSize = this.fontSize - 1;
        if (this.fontSize < 4) {
            this.fontSize = 4;
            window.alert("Fondi suurus ei saa olla alla 4vw");
        }
        document.getElementById('clockContainer').style.fontSize = this.fontSize + "vw";
    }

    // atribuut 3: taustavärv - prompt: "cycle array colors on body click js"
    changeBgColor() {
        this.bgColorIdx = (this.bgColorIdx + 1) % BG_COLORS.length;
        document.body.style.backgroundColor = BG_COLORS[this.bgColorIdx];
    }

    // atribuut 4: teksti värv
    changeTextColor() {
        this.textColorIdx = (this.textColorIdx + 1) % TEXT_COLORS.length;
        const color = TEXT_COLORS[this.textColorIdx];
        document.getElementById('clockContainer').style.color = color;
        document.getElementById('clockContainer').style.textShadow =
            `0 0 30px ${color}, 0 0 60px ${color}`;
    }

    // lemmikvärv modalist
    setAccentColor(hex) {
        TEXT_COLORS[0] = hex;
        document.getElementById('clockContainer').style.color = hex;
        document.getElementById('clockContainer').style.textShadow =
            `0 0 30px ${hex}, 0 0 60px ${hex}`;
    }

    // atribuut 5: kirjatüüp
    cycleFont() {
        this.fontIdx = (this.fontIdx + 1) % FONTS.length;
        const font = FONTS[this.fontIdx];
        document.getElementById('clockContainer').style.fontFamily = `'${font}', monospace`;
        document.getElementById('dateContainer').style.fontFamily = `'${font}', monospace`;
        document.getElementById('fontBtn').textContent = `Font: ${font}`;
    }

    // atribuut 6: 12h/24h formaat
    toggleFormat() {
        this.is24h = !this.is24h;
        document.getElementById('formatBtn').textContent = `Formaat: ${this.is24h ? '24h' : '12h'}`;
        this.upDateClock();
    }

    // atribuut 7: keel
    toggleLanguage() {
        this.isEt = !this.isEt;
        document.getElementById('langBtn').textContent = `Keel: ${this.isEt ? 'ET' : 'EN'}`;
        this.updateDate();
    }

    // atribuut 8: auto päev/öö teema - prompt: "js day night theme based on hour"
    toggleAutoTheme() {
        this.autoTheme = !this.autoTheme;
        document.getElementById('themeBtn').textContent = `Teema: ${this.autoTheme ? 'Auto' : 'Käsitsi'}`;
        if (!this.autoTheme) {
            document.body.style.backgroundColor = BG_COLORS[this.bgColorIdx];
        }
    }

    applyDayNightTheme(hours) {
        const isDay = hours >= 7 && hours < 20;
        document.body.style.backgroundColor = isDay ? '#dce8f5' : '#0a0a1a';
    }

    // kella liigutamine nooleklahvidega
    move(dx, dy) {
        const margin = 80;
        this.posX = Math.max(margin, Math.min(window.innerWidth - margin, this.posX + dx));
        this.posY = Math.max(margin, Math.min(window.innerHeight - margin, this.posY + dy));
        this.applyPosition();
    }

    applyPosition() {
        const wrapper = document.getElementById('clockWrapper');
        wrapper.style.left = this.posX + "px";
        wrapper.style.top = this.posY + "px";
        wrapper.style.transform = "translate(-50%, -50%)";
    }

    // + ja - klahvid klaviatuuril
    checkKey(e) {
        console.log(e.keyCode);
        if (e.keyCode == 43) this.changeFontSizeBigger();
        if (e.keyCode == 45) this.changeFontSizeSmaller();
    }
}

// prompt: "canvas starfield twinkling stars animation requestAnimationFrame"
function initStarfield() {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    const stars = [];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 160; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.4,
            opacity: Math.random(),
            speed: Math.random() * 0.008 + 0.002
        });
    }

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.opacity += s.speed;
            if (s.opacity > 1 || s.opacity < 0) s.speed *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${s.opacity.toFixed(2)})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    };
    draw();
}

// kella eksemplar
const clock = new Clock();

// onclick HTML-is vajab seda globaalset funktsiooni
function changeTextColor() {
    clock.changeTextColor();
}

// modal - kasutaja valib lemmikvärvi ja vajutab start
document.getElementById('startBtn').addEventListener('click', () => {
    const color = document.getElementById('favColor').value;
    clock.setAccentColor(color);
    document.getElementById('colorModal').style.display = 'none';
    clock.upDateClock();
    clock.updateDate();
    initStarfield();
    setInterval(() => clock.upDateClock(), 1000);
    setInterval(() => clock.updateDate(), 60000);
});

// klõps taustal - muuda taustavärvi
document.body.addEventListener('click', (e) => {
    const insideClock = document.getElementById('clockWrapper').contains(e.target);
    const insideButtons = document.getElementById('buttonContainer').contains(e.target);
    const modal = document.getElementById('colorModal');
    const modalOpen = modal.style.display !== 'none';
    if (!insideClock && !insideButtons && !modalOpen) {
        clock.changeBgColor();
    }
});

// nooleklahvid - liiguta kella
document.addEventListener('keydown', (e) => {
    const s = clock.moveStep;
    const moves = { ArrowUp: [0,-s], ArrowDown: [0,s], ArrowLeft: [-s,0], ArrowRight: [s,0] };
    if (moves[e.key]) {
        e.preventDefault();
        clock.move(...moves[e.key]);
    }
});

// nupud
document.getElementById('bigger').addEventListener('click', () => clock.changeFontSizeBigger());
document.getElementById('smaller').addEventListener('click', () => clock.changeFontSizeSmaller());
document.getElementById('fontBtn').addEventListener('click', () => clock.cycleFont());
document.getElementById('formatBtn').addEventListener('click', () => clock.toggleFormat());
document.getElementById('langBtn').addEventListener('click', () => clock.toggleLanguage());
document.getElementById('themeBtn').addEventListener('click', () => clock.toggleAutoTheme());

// klaviatuuri klahvid
window.addEventListener(
