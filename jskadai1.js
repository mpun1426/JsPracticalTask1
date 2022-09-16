$(document).ready(function() {
  let setTime = undefined;
  let startTime = 0;  //開始時刻
  let currentTime = 0;  //現在時刻
  let elapsedTime = 0;  //経過時間（現在時刻 − 開始時刻）
 
 function startingTimer() {
   currentTime = Date.now();
   runningTimer();
   setTime = setTimeout(function() {
     startingTimer();
   }, 10)
 }
 
 function runningTimer() {
   let time = new Date(currentTime - startTime + elapsedTime);  //リセットするまで0に戻らないための+elaTime
   const min = time.getMinutes();
   const sec = time.getSeconds();
   const ms = Math.floor(time.getMilliseconds() / 10);
   $("#counter").text(`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(ms).padStart(2,'0')}`);
 }
 
 //ボタン押下したときにクラス切り替える
  function toggleClassStart() {
    $("#resetButton").addClass("disabled");
    $("#stopButton").removeClass("disabled");
    $("#startButton").addClass("disabled");
  }
  
  function toggleClassStop() {
    $("#resetButton").removeClass("disabled");
    $("#stopButton").addClass("disabled");
    $("#startButton").removeClass("disabled");
  }
  
  function toggleClassReset() {
    $("#resetButton").addClass("disabled");
    $("#stopButton").addClass("disabled");
    $("#startButton").removeClass("disabled");
  }
 
 //ボタン押下したときに
  $("#startButton").click(function() {
    if($("#startButton").hasClass("disabled")) {
      return;
    } else {
      toggleClassStart();
      startTime = Date.now();
      startingTimer();
    }
  });
  
  $("#stopButton").click(function() {
    if($("#stopButton").hasClass("disabled")) {
      return;
    } else {
      elapsedTime = currentTime - startTime + elapsedTime;  //リセットするまで0に戻らないための+elaTime
      toggleClassStop();
      clearTimeout(setTime);
    }
  });
  
  $("#resetButton").click(function() {
    if($("#resetButton").hasClass("disabled")) {
      return;
    } else {
      elapsedTime = 0;
      $("#counter").text("00:00.00");
      toggleClassReset();
      clearTimeout(setTime);
    }
  });
  
});