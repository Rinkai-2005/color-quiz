//buttonタグの要素の数を取得
const quizLen = 5;
let quizIndex = 0;
let score = 0;
let buttonCount;
let quizCount = 0;
let choiceColors = [];
let questionNum;
let correct;

window.addEventListener("DOMContentLoaded", () => {
  buttonCount = document.getElementsByTagName("button").length;

  //ランダムに色を生成する
  let randomColors = [];
  const createRandomColors = () => {
    while (randomColors.length < buttonCount) {
      let color = Math.floor(Math.random() * 16777215).toString(16);
      for (count = color.length; count < 6; count++) {
        color = "0" + color;
      }
      randomColors.push("#" + color);
    }
    console.log("51:" + randomColors);
  };

  //カラーコードを回答に入れる
  const setQuiz = () => {
    randomColors = [];
    createRandomColors();
    choiceColors = [];
    for (let choiceColor of randomColors) {
      choiceColors.push(choiceColor);
    }
    //選択肢の中のどこに正解を入れるかの処理
    questionNum = Math.ceil(Math.random() * 3) - 1;
    correct = randomColors[questionNum];
  };
  // 選択肢のDOMを取得し遅延表示させる
  const $choicesAnimation = () => {
    const $choices = document.querySelectorAll(".choice");
    $choices.forEach(($choices) => {
      $choices.animate({ opacity: [0, 1] }, 400);
    });
  };

  //ヒントボタンで不正解を一つ消す(fadeOutさせる)
  //ダークモードのラジオボタンを設置する
  //buttonをクリックしたら正誤判定をする
  let checkCount = 0;
  const init = () => {
    setQuiz();
    //それぞれのボタンに文字を設定する
    document.querySelector("#button1").textContent = choiceColors[0];
    document.querySelector("#button2").textContent = choiceColors[1];
    document.querySelector("#button3").textContent = choiceColors[2];
    //      背景の色を設定して、画面に表示させる
    const $question = document.querySelector(".question");
    $question.style.background = randomColors[questionNum];
    $question.animate({ opacity: [0.2, 1] }, 200);
    $choicesAnimation;
  };

  //5問目なら終了。それ以外ならクイズをリロード
  const goToNext = () => {
    quizCount++;
    if (quizCount < quizLen) {
      init(quizCount);
    } else {
      // $window.alert('クイズ終了！');
      window.alert("あなたの正解数は" + score + "/" + quizLen + "です！！");
    }
  };
  //正誤判定の処理
  const judge = (elm) => {
    if (correct === elm.innerHTML) {
      window.alert("正解！！！");
      //正解時にscoreを足す
      score++;
    } else {
      window.alert("不正解・・・");
    }
    goToNext();
  };
  while (checkCount < buttonCount) {
    document
      .getElementsByTagName("button")
      [checkCount].addEventListener("click", (e) => {
        judge(e.target);
      });
    checkCount++;
  }

  init();
});
