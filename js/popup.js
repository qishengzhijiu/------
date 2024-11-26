// // Define the start function outside of the event binding

{
  /* <script src="lib/jquery.min.js"></script>
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
} */
}

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

// 确保 DOM 完全加载后再执行 JavaScript
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("matchs", function (result) {
    let matchs = result.matchs || []; // 获取 matchs 数据
    console.log("获取到的 matchs: ", matchs);
    // 在这里使用 matchs 变量

    // 获取ul元素
    console.log(matchs);
    let listContainer = document.getElementById("match-list");

    // 遍历matchs数组并动态创建<li>元素
    // matchs.forEach(function(item) {
    //   let listItem = document.createElement('li');  // 创建 <li> 元素
    //   listItem.textContent = item;  // 设置 <li> 的文本内容
    //   listContainer.appendChild(listItem);  // 将 <li> 添加到 <ul> 中
    // });
    for (let i = 0; i < matchs.length; i++) {
      let listItem = document.createElement("li"); // 创建 <li> 元素
      listItem.textContent = matchs[i]; // 设置 <li> 的文本内容
      listContainer.appendChild(listItem); // 将 <li> 添加到 <ul> 中
    }
  });
});

let changeDOMButton = document.getElementById("changeDOMButton");
let changeDOMButton1 = document.getElementById("changeDOMButton1");
let submitButton = document.getElementById("submitButton");

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0]; // 当前激活的tab页

  changeDOMButton.addEventListener("click", function () {
    chrome.tabs.sendMessage(activeTab.id, { action: "paused" });
  });
});

changeDOMButton1.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "continue" });
  });
});
// 发送消息拿matchs
function sendmessagetocontent() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getmatchs" });
  });
}

submitButton.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    matchs = [];
    let matchsList = document.querySelectorAll("li");
    for (let i = 0; i < matchsList.length; i++) {
      matchs.push(matchsList[i].textContent);
      // console.log(matchsList[i].textContent);
    }
    let matchsList_input = document.querySelector("input");
    if (matchsList_input.value != "") {
      matchs.push(matchsList_input.value);
      // console.log(matchsList_input.value);
      matchsList_input.value = "";
      chrome.runtime.sendMessage({ action: "submit", matchs: matchs }); // 发送消息到 background.js，传递 matchs 数组
      // 从 chrome storage 获取 matchs 数据
      setTimeout(function () {
        chrome.storage.local.get("matchs", function (result) {
          let matchs = result.matchs || []; // 获取 matchs 数据
          let listContainer = document.getElementById("match-list");

          // 清空现有的列表内容
          listContainer.innerHTML = "";

          // 将 matchs 添加到列表中
          for (let i = 0; i < matchs.length; i++) {
            let listItem = document.createElement("li"); // 创建 <li> 元素
            listItem.textContent = matchs[i]; // 设置 <li> 的文本内容
            listContainer.appendChild(listItem); // 将 <li> 添加到 <ul> 中
          }
          listenToMessage(); 
        });
      }, 500);
    } else {
      alert("请输入之后再提交");
    }
  });
});

// // 监听来自content.js的消息
// function getmatchs(callback) {
//   chrome.runtime.onMessage.addListener(function (
//     message,
//     sender,
//     sendResponse
//   ) {
//     if (message.action === "sendmatchs") {
//       const matchs = message.matchs; // 获取匹配的值
//       console.log("接收到来自 content.js 的数据: ", matchs);
//       // 在回调函数中返回匹配的值
//       callback(matchs);
//     }
//   });
// }

// function getmatchstostore() {
//   chrome.storage.local.get("matchs", function (result) {
//     let matchs = result.matchs || []; // 获取 matchs 数据
//     console.log("获取到的 matchs: ", matchs);
//     console.log(matchs);
//     return matchs;
//   });
// }
function listenToMessage() {
setTimeout(function () {
  let li_all = document.querySelectorAll("li");
  for (let i = 0; i < li_all.length; i++) {
    let clickcount = 0; // 每个 li 单独的点击计数器
    let originalText = li_all[i].textContent; // 保存原始文本

    li_all[i].addEventListener("click", function () {
      clickcount++; // 计数器每次增加1

      if (clickcount == 1) {
        li_all[i].textContent = "再次点击删除关键词";
      }
      if (clickcount == 2) {
        // 发送消息到 background.js，传递原始文本内容
        chrome.runtime.sendMessage({
          action: "delete",
          keyword: originalText, // 发送保存的原始文本
        });
        li_all[i].parentNode.removeChild(li_all[i]);
      }
    });
  }
}, 500);
}
listenToMessage();