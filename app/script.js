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
    console.log("59:" + choiceColors);
    //選択肢の中のどこに正解を入れるかの処理
    questionNum = Math.ceil(Math.random() * 3) - 1;
    correct = randomColors[questionNum];
  };

  //ヒントボタンで不正解を一つ消す(fadeOutさせる)
  //ダークモードのラジオボタンを設置する
  //buttonをクリックしたら正誤判定をする
  let checkCount = 0;
  const init = () => {
    setQuiz();
    //それぞれのボタンに文字を設定する
    $("#button1").html(choiceColors[0]);
    $("#button2").html(choiceColors[1]);
    $("#button3").html(choiceColors[2]);
    //      背景の色を設定して、画面に表示させる
    $(".question")
      .css("background", randomColors[questionNum])
      .delay(1000)
      .animate({ opacity: 1 }, 500);
    //      問題が表示された後に回答を表示させる
    $("button").delay(2000).animate({ opacity: 1 }, 500);
    //
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
