


console.log("content.js is running");
// document.querySelector("#kw").style.backgroundColor="red"

function start(start_i) {
  // do something
console.log("程序开始");
setTimeout(function () {
  var iframe = document.querySelector("iframe");
  var innerDoc = iframe.contentWindow.document;//第一层iframe
  var iframe2 = innerDoc.querySelectorAll("iframe");
  if(iframe2.length>1){
    for(let j=0;j<iframe2.length;j++){
      var innerDoc2 = iframe2[j].contentWindow.document;
      seek();
    }
  }
  else{
  var innerDoc2 = iframe2[0].contentWindow.document;//第二层iframe
  seek();
  }










  function seek(){





    var imgElement = innerDoc2.querySelectorAll("img");
    console.log("找到了<img>元素个数为",imgElement.length);
    if(start_i==1){
      alert("学习通自动播放脚本\n开始自动连播");
     }
    // 如果找到了<img>元素，执行相应的代码
  if (imgElement.length >1) {
    console.log("找到了<img>元素！,这是ppt");
  setTimeout(function() { 
  
  
  document.querySelector("#prevNextFocusNext").click();
  
   }, 5000);
  
  
  
    
  } 
  




  else {
    console.log("找到了<video>元素！,这是video");
    var video = innerDoc2.querySelector("video");
    if (video.paused) {
    video.play();
    setTimeout(function() {  video.playbackRate=2; }, 3000);
  
  
  
    video.onended = function() {
        console.log("视频播放结束");
        document.querySelector("#prevNextFocusNext").click();
    }
  }
  
  }
  

  }




}, 5000);

}









start(1);











// 定义一个要重复执行的函数
function doSomethingRepeatedly() {
start();
}
















// 设置一个每隔一段时间就执行一次的定时器
let intervalId = setInterval(doSomethingRepeatedly, 15000);





chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "paused") {
    clearInterval(intervalId)
    alert("学习通自动播放脚本\n已经停止定时器\n自动连播已经停止\n当前页面脚本控制失效");
  }
  if (message.action === "continue") {
    intervalId = setInterval(doSomethingRepeatedly, 10000);
    alert("学习通自动播放脚本\n已经恢复定时器\n自动连播已经恢复\n当前页面脚本控制生效");
}
}
);
