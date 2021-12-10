//buttonタグの要素の数を取得
const quizLen = 5;
let quizIndex = 0;
let score = 0;
let $buttonCount;
let quizCount = 0;
let selectcolor = [];
let questionNum;
let correct;

window.addEventListener("DOMContentLoaded", () => {
  $buttonCount = document.getElementsByTagName("button").length;

  //色を生成する
  let randomColors = [];
  let colors = 0;
  const createColor = () => {
    while (colors < $buttonCount) {
      let color = Math.floor(Math.random() * 16777215).toString(16);
      for (count = color.length; count < 6; count++) {
        color = "0" + color;
      }
      randomColors.push("#" + color);
      colors++;
      console.log("51:" + randomColors);
    }
  };
  //カラーコードを回答に入れる

  const setQuiz = () => {
    createColor();
    selectcolor.push(randomColors[0], randomColors[1], randomColors[2]);
    console.log("59:" + selectcolor);
    questionNum = Math.ceil(Math.random() * 3) - 1;
    correct = randomColors[questionNum];
  };

  //ヒントボタンで不正解を一つ消す(fadeOutさせる)
  //ダークモードのラジオボタンを設置する
  //buttonをクリックしたら正誤判定をする
  let checkCount = 0;
  const init = () => {
    $(function () {
      createColor();
      setQuiz();
      //それぞれのボタンに文字を設定する
      $("#button1").html(selectcolor[0]);
      $("#button2").html(selectcolor[1]);
      $("#button3").html(selectcolor[2]);
      //      背景の色を設定して、画面に表示させる
      $(".question")
        .css("background", randomColors[questionNum])
        .delay(1000)
        .animate({ opacity: 1 }, 500);
      //      問題が表示された後に回答を表示させる
      $("button").delay(2000).animate({ opacity: 1 }, 500);
      //
    });
  };

  //5問目なら終了。それ以外ならクイズをリロード
  const goToNext = () => {
    quizCount++;
    if (quizCount < quizLen) {
      console.log("91");
      init(quizCount);
    } else {
      // $window.alert('クイズ終了！');
      console.log("95");
      window.alert("あなたの正解数は" + score + "/" + quizLen + "です！！");
    }
  };
  //正誤判定の処理
  const judge = (elm) => {
    // console.log(elm);
    if (correct === elm.innerHTML) {
      window.alert("正解！！！");
      //正解時にscoreを足す
      score++;
    } else {
      window.alert("不正解・・・");
    }
    goToNext();
  };
  // console.log(checkCount + "   " + $buttonCount);
  while (checkCount < $buttonCount) {
    document
      .getElementsByTagName("button")
      [checkCount].addEventListener("click", (e) => {
        judge(e.target);
      });
    checkCount++;
  }
  // document
  //   .getElementsByTagName("button")[0]
  //   .addEventListener("click", (e) => {
  //     if (correct === e.target.innerHTML) {
  //       window.alert("正解！！！");
  //       //正解時にscoreを足す
  //     } else {
  //       window.alert("不正解・・・");
  //     }

  init();
  //リファクタリングする

  //次の問題を表示させる(5問分繰り返す)
  //結果を表示させる
  // $(function () {
  //   //それぞれのボタンに文字を設定する
  //   $("#button1").html(color[0]);
  //   $("#button2").html(color[1]);
  //   $("#button3").html(color[2]);
  //   //      背景の色を設定して、画面に表示させる
  //   $(".question")
  //     .css("background", randomColors[questionNum])
  //     .delay(1000)
  //     .animate({ opacity: 1 }, 500);
  //   //      問題が表示された後に回答を表示させる
  //   $("button").delay(2000).animate({ opacity: 1 }, 500);
  //   //
  // });
});
