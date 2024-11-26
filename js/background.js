chrome.runtime.onInstalled.addListener(function () {
  console.log("bakcground.js :插件已经安装");
  let matchs = ["学习视频", "PPT"];
  chrome.storage.local.set({ matchs: matchs }, function () {
    console.log("background.js :matchs 已经存储");
  });
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("background.js :Received message:", message);
  // 处理消息
  if (message.action === "delete") {
    console.log("Message data:", message.keyword);
    chrome.storage.local.get("matchs", function (result) {
      let matchs = result.matchs;
      let index = matchs.indexOf(message.keyword);
      if (index > -1) {
        matchs.splice(index, 1);
        chrome.storage.local.set({ matchs: matchs }, function () {
          console.log("bcakground.js :matchs 已经删除", "现在的matchs", matchs);
        });
      }
    });
  }
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.action == "submit") {
      let matchs = message.matchs;
      // 将 matchs 存储在 chrome storage 中
      chrome.storage.local.set({ matchs: matchs }, function () {
      console.log("background.js :matchs 已经存储",matchs);
        // 返回成功状态和存储的 matchs
        sendResponse({
          status: "success",
          matchs: matchs, // 返回存储的 matchs
        });
      });

      // 返回 true，表示异步操作（因为 chrome.storage.set 是异步的）
      return true;
    }
  });
});
