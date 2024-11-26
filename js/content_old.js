console.log("content.js is running");
// document.querySelector("#kw").style.backgroundColor="red"

async function start(start_i) {
  // do something
  // try{ 
  //   var find_element=document.querySelector("#mainid > div.prev_title_pos > div")
  //   if(find_element.textContent="学习视频"){
  //     setTimeout(function() { 
  //         document.querySelector("#prevNextFocusNext").click();
  //      }, 5000);
  //   }
  // }
  //   catch(e){
  //     console.log("捕获到错误",e);
  //   }
  if (globalThis.startcontinue == false) {
    console.log("startcontinue is false,退出函数"); // 如果是false，就退出函数
    return;
  }
  if (start_i == 1) {
    globalThis.startcontinue = false; // 下一次循环退出函数，直到视频播放完成
    console.log("程序开始");
  }

  setTimeout(async function () {
    var iframe = document.querySelector("iframe");
    var innerDoc = iframe.contentWindow.document; // 第一层iframe
    var iframe2 = innerDoc.querySelectorAll("iframe");
    
    if (iframe2.length > 1) {
      // 如果有多个 iframe
      for (let j = 0; j < iframe2.length; j++) {
        var innerDoc2 = iframe2[j].contentWindow.document;
        // 使用 await 确保每次 seek() 完成后再执行下一个
        await seek(j, iframe2.length, innerDoc2);
      }
    } else {
      // 如果只有一个 iframe
      var innerDoc2 = iframe2[0].contentWindow.document;
      var length = iframe2.length;
      await seek(0, length, innerDoc2);
    }
  }, 5000);
}

async function seek(j, length, innerDoc2) {
  var video = innerDoc2.querySelector("video");
  if (video) {
    console.log("找到了<video>元素！,这是video");
    if (video.paused) {
      video.play();
      setTimeout(function () {
        if (start_i == 1) {
          video.playbackRate = 2;
        }
      }, 2000);
      setTimeout(function () {
        if (video.paused) {
          video.play();
        }
      }, 5000);

      video.onended = function () {
        console.log("视频播放结束");
        console.log("第%d个视频播放结束", j + 1);
        if (j == length - 1) {
          globalThis.startcontinue = true;
        }

        document.querySelector("#prevNextFocusNext").click();
      };
    }
  }

  if (start_i == 1) {
    alert("学习通自动播放脚本\n开始自动连播");
  }

  if (!video) {
    var imgElement = innerDoc2.querySelectorAll("img");
    console.log("找到了<img>元素个数为", imgElement.length);
    // 如果找到了<img>元素，执行相应的代码
    if (imgElement.length > 1) {
      console.log("找到了<img>元素！,这是ppt");

      setTimeout(function () {
        document.querySelector("#prevNextFocusNext").click();
        var button = document.querySelector(
          "#mainid > div.maskDiv.jobFinishTip.maskFadeOut > div > div.popBottom > a.jb_btn.jb_btn_92.fr.fs14.nextChapter"
        );
        button.click();
        globalThis.startcontinue = true;
      }, 3000);
    }
  }
}

start(1);

// 定义一个要重复执行的函数
function doSomethingRepeatedly() {
  start();
}

var startcontinu; // 设置一个全局变量，用于控制循环的退出

// 设置一个每隔一段时间就执行一次的定时器
let intervalId = setInterval(doSomethingRepeatedly, 15000);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "paused") {
    clearInterval(intervalId);
    alert("学习通自动播放脚本\n已经停止定时器\n自动连播已经停止\n当前页面脚本控制失效");
  }
  if (message.action === "continue") {
    intervalId = setInterval(doSomethingRepeatedly, 10000);
    alert("学习通自动播放脚本\n已经恢复定时器\n自动连播已经恢复\n当前页面脚本控制生效");
  }
});


console.log("content.js is running");