function FindUnfinishClass(){
    let Class = document.querySelectorAll('div.posCatalog_select:not(.firstLayer)');
    var UnfininshClass = [];
     console.log("具有以下的课程未完成");
    Class.forEach(div => {
    let span = div.querySelectorAll('span.catalog_points_yi.prevTips');
    span.forEach(span => {
            UnfininshClass.push(div);
            console.log(div.querySelector('.posCatalog_name').textContent);
    });
    // console.log(UnfininshClass);
});
// 拿到未学习的课程
    if(UnfininshClass.length==0){
        console.log("没有未完成的课程");
        stoprun=true;
    }
    return UnfininshClass;
}
function VideoPlayingCLass(){
    playingClass = document.querySelector(".posCatalog_active")
    return playingClass;
}







function videoPlay() {
  var iframe = document.querySelector("iframe");
  var innerDoc = iframe.contentWindow.document; // 获取第一个 iframe 的文档
  var iframe2 = innerDoc.querySelectorAll("iframe"); // 获取所有子 iframe

  async function playAllVideos() {
    if (iframe2.length > 1) {
      // 如果有多个 iframe
      for (let j = 0; j < iframe2.length; j++) {
        var innerDoc2 = iframe2[j].contentWindow.document;
        // 等待 iframe 加载完成后再播放
        await waitForIframeToLoad(innerDoc2);
        await playVideo(innerDoc2);  // 等待视频播放完再继续下一个
      }
    } else {
      // 如果只有一个 iframe
      var innerDoc2 = iframe2[0].contentWindow.document;
      // 等待 iframe 加载完成后再播放
      await waitForIframeToLoad(innerDoc2);
      await playVideo(innerDoc2);
    }
  }

  // 等待 iframe 加载完成
  async function waitForIframeToLoad(innerDoc2) {
    return new Promise(resolve => {
      var checkInterval = setInterval(() => {
        // 检查 video 元素是否已加载
        var video = innerDoc2.querySelector("video");
        if (video) {
          clearInterval(checkInterval); // 找到视频后停止检查
          resolve(); // 继续执行
        }
      }, 500); // 每500ms检查一次
    });
  }

  // 播放视频的函数
  async function playVideo(innerDoc2) {
    var video = innerDoc2.querySelector("video");
    if (video) {
      await new Promise(resolve => {
        video.playrate = 2; // 设置播放速率
        video.play();
        video.onended = function () {
          console.log("播放结束");
          if(stoprun==false){main(); }
           // 视频播放完后执行下一个
          resolve();  // 视频播放完后继续
        };
      });
    } else {
      console.log("没有找到视频元素");
    }
  }

  // 执行播放视频的异步函数
  playAllVideos();
}







function SelectUnfinishClass(UnfininshClass){
    if(firstrun==true){
        firstrun=false
        return;
    }
    i=0
    if(globalThis.isPPTOrEmpty==true){
        console.log("是ppt或者空白页面,点击下一个");
        i=1;
    }
   let ID=UnfininshClass[i].id
   let ClassNeedClick=document.querySelector(`#${ID} span`)
   let ClickEvent=ClassNeedClick.click();
}






function judgementIsPPTOrEmpty(playingClass){
let TextContent = playingClass.textContent;  // 获取 TextContent
let match = TextContent.match(/.*学习视频.*/);
let match2 = TextContent.match(/.*PPT.*/);

if (match || match2) {
    console.log("是ppt或者空白页面");
    globalThis.isPPTOrEmpty = true;
    firstrun=false;
} else {
    console.log("不是空白页，继续执行");
    globalThis.isPPTOrEmpty = false;
}



}

function main(){
    let UnfininshClass=FindUnfinishClass();
    let playingClass=VideoPlayingCLass();
    judgementIsPPTOrEmpty(playingClass)
    SelectUnfinishClass(UnfininshClass);
    setTimeout(function(){videoPlay();} , 5000);
    
}

firstrun=true;
stoprun=false;
main();
