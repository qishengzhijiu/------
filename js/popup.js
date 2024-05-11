// // Define the start function outside of the event binding

{/* <script src="lib/jquery.min.js"></script>
function start() {
  // do something

  setTimeout(function() {
    var iframe = $("#iframe")[0];
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document; //第一层iframe
    var iframe2 = $(innerDoc).find("#ext-gen1050 > iframe")[0];
    var innerDoc2 = iframe2.contentDocument || iframe2.contentWindow.document; //第二层iframe
    var video = $(innerDoc2).find("video")[0];

    video.play();
    video.playbackRate = 2;
    console.log("开始自动连播");
    video.onended = function() {
      console.log("视频播放结束");
      // 切换回主页面
      var bodyElement = window.top.document.querySelector('body');
      $(bodyElement).find("#prevNextFocusNext").click();
      start(); // Recursively call start() when the video ends
    };
  }, 3000);
} */}

// // After defining the start function, attach it to the button's onclick event using jQuery
// $(document).ready(function() {
//   $("#sendmessageid").click(start); // Attach start function to the onclick event
//   console.log("程序开始");
// });

    






// function start() {
//   // do something
// console.log("程序开始");
// setTimeout(function() {
 
//   var iframe = document.querySelector("#iframe");
//   var innerDoc = iframe.contentWindow.document;//第一层iframe
//   var iframe2 = innerDoc.querySelector("#ext-gen1050 > iframe");
//   var innerDoc2 = iframe2.contentWindow.document;//第二层iframe
//   var video = innerDoc2.querySelector("video");
//   video.play();
//   console.log("开始自动连播");
//   video.onended = function() {
//       console.log("视频播放结束");
//       // 切换回主页面
//       var bodyElement = window.top.document.querySelector('body');
//       bodyElement.querySelector("#prevNextFocusNext").onclick();
//       var iframe = document.querySelector("#iframe");

//         start();
  
// }


// }, 5000);
// popup.js

// // 获取id为elementId的DOM元素
// document.querySelector("#nav-searchform").style.backgroundColor="red"
// console.log("hello");


let changeDOMButton = document.getElementById('changeDOMButton');
let changeDOMButton1 = document.getElementById('changeDOMButton1');



chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var activeTab = tabs[0];// 当前激活的tab页


changeDOMButton.addEventListener('click', function() {
  
    chrome.tabs.sendMessage(activeTab.id, {action: "paused"});
  });
});

changeDOMButton.addEventListener('click', function() {
    chrome.tabs.sendMessage(activeTab.id, {action: "continue"});
  });
;