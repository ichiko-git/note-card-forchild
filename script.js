// 音符のデータ（画像・音声・記号・音名）
const notes = [
  {
    image: "images/note_c3_bass.png",
    audio: "sounds/c3.mp3",
    clef: "bass",
    name: "ド",
  },
  {
    image: "images/note_d3_bass.png",
    audio: "sounds/d3.mp3",
    clef: "bass",
    name: "レ",
  },
  {
    image: "images/note_e3_bass.png",
    audio: "sounds/e3.mp3",
    clef: "bass",
    name: "ミ",
  },
  {
    image: "images/note_f3_bass.png",
    audio: "sounds/f3.mp3",
    clef: "bass",
    name: "ファ",
  },
  {
    image: "images/note_g3_bass.png",
    audio: "sounds/g3.mp3",
    clef: "bass",
    name: "ソ",
  },
  {
    image: "images/note_a3_bass.png",
    audio: "sounds/a3.mp3",
    clef: "bass",
    name: "ラ",
  },
  {
    image: "images/note_b3_bass.png",
    audio: "sounds/b3.mp3",
    clef: "bass",
    name: "シ",
  },
  {
    image: "images/note_c4_bass.png",
    audio: "sounds/c4.mp3",
    clef: "bass",
    name: "高いド",
  },
  {
    image: "images/note_c4_treble.png",
    audio: "sounds/c4.mp3",
    clef: "treble",
    name: "ド",
  },
  {
    image: "images/note_d4_treble.png",
    audio: "sounds/d4.mp3",
    clef: "treble",
    name: "レ",
  },
  {
    image: "images/note_e4_treble.png",
    audio: "sounds/e4.mp3",
    clef: "treble",
    name: "ミ",
  },
  {
    image: "images/note_f4_treble.png",
    audio: "sounds/f4.mp3",
    clef: "treble",
    name: "ファ",
  },
  {
    image: "images/note_g4_treble.png",
    audio: "sounds/g4.mp3",
    clef: "treble",
    name: "ソ",
  },
  {
    image: "images/note_a4_treble.png",
    audio: "sounds/a4.mp3",
    clef: "treble",
    name: "ラ",
  },
  {
    image: "images/note_b4_treble.png",
    audio: "sounds/b4.mp3",
    clef: "treble",
    name: "シ",
  },
  {
    image: "images/note_c5_treble.png",
    audio: "sounds/c5.mp3",
    clef: "treble",
    name: "高いド",
  },
];

let currentNote = null;
let selectedClef = null;
let selectedNoteName = null;
let remainingNotes = [];

const noteImage = document.getElementById("noteImage");
const clefButtons = document.querySelectorAll(".clef-btn");
const noteButtons = document.querySelectorAll(".note-btn");
const result = document.getElementById("result");
const playSoundBtn = document.getElementById("playSound");
const nextBtn = document.getElementById("next");

// 画面切り替え用の要素取得
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");
const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");

// 画面切り替え関数
function showScreen(screen) {
  startScreen.style.display = screen === "start" ? "block" : "none";
  gameScreen.style.display = screen === "game" ? "block" : "none";
  endScreen.style.display = screen === "end" ? "block" : "none";
}

// ゲーム初期化関数
function startGame() {
  remainingNotes = shuffle([...notes]);
  showScreen("game");
  noteImage.style.display = "";
  result.textContent = "";
  loadRandomNote();
}

// 配列をシャッフルする関数
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ランダムに問題を出す（全問終わったら終了画面）
function loadRandomNote() {
  result.textContent = "";
  selectedClef = null;
  selectedNoteName = null;

  if (remainingNotes.length === 0) {
    // 全問終了
    showScreen("end");
    return;
  }

  // 1問取り出して出題
  currentNote = remainingNotes.pop();
  noteImage.src = currentNote.image;
  noteImage.style.display = "";

  // ボタンの選択状態をリセット
  clefButtons.forEach((btn) => {
    btn.classList.remove("selected");
    btn.disabled = false;
  });
  noteButtons.forEach((btn) => {
    btn.classList.remove("selected");
    btn.disabled = false;
  });
  playSoundBtn.disabled = false;
  nextBtn.disabled = false;
}

// スタートボタン
if (startBtn) {
  startBtn.addEventListener("click", () => {
    startGame();
  });
}
// リトライボタン
if (retryBtn) {
  retryBtn.addEventListener("click", () => {
    startGame();
  });
}

// 初期表示はスタート画面
showScreen("start");

// 正誤判定
function checkAnswer() {
  if (selectedClef && selectedNoteName) {
    const clefCorrect = selectedClef === currentNote.clef;
    const noteCorrect = selectedNoteName === currentNote.name;

    const clefResult = clefCorrect ? "記号：○" : "記号：×";
    const noteResult = noteCorrect ? "音名：○" : "音名：×";
    result.textContent = `${clefResult}　${noteResult}`;

    // 両方正解だったら正解音を再生
    if (clefCorrect && noteCorrect) {
      const correctSound = new Audio("sounds/correct.mp3");
      correctSound.play();
    }
  }
}

clefButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedClef = btn.dataset.answer;

    clefButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    checkAnswer();
  });
});

noteButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedNoteName = btn.dataset.answer;

    noteButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    checkAnswer();
  });
});

// 音を聞くボタンを押した時
playSoundBtn.addEventListener("click", () => {
  if (currentNote && currentNote.audio) {
    const audio = new Audio(currentNote.audio);
    audio.play();
  }
});

// 次の問題へボタンを押した時
nextBtn.addEventListener("click", () => {
  loadRandomNote();
});
