# 学习通自动播放插件脚本
<p>基本原理就是设置了一个定时器，然后每15秒执行一次，在定时器里面找到藏在两层'iframe'中的'video'元素，然后播放，设置倍速为2倍，学习通不允许设置给高的倍速，设置高了会导致直接暂停播放，反正我没能力，老老实实两倍速
  <p>在视频播放完成之后会自己点击页面中的下一页,然后等定时器触发，就接着播放了
<p>点击插件的<strong>pause auto play</strong>可以停止定时器,点击插件中的<strong>continue auto play</strong>可以启用定时器，为什么是英文？因为中文显示会出错
  <p>写来干嘛的，当时是学习一下的，我之前也没写过js,就当学习js了
    <p>仅仅支持 [https://mooc1.chaoxing.com/*](https://mooc1.chaoxing.com/*)。也就是学习通播放页面
<p><strong>仅供学习交流，严禁用于商业用途，请于24小时内删除</strong>_






<p>重写了一下程序，老程序放到content_old.js 里面了
<p>新程序直接读取学习通的目录，判断哪里没有完成，然后点击播放，当然ppt直接跳过，可以自己添加自定义的关键词跳过，保证程序能跑。