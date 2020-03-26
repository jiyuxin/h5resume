/**
 * rem 模块，通过这个js 控制页面的rem
 * （当前浏览器的宽度 / 640）*100 = 当前html的fontsize 
 */
(function ($){
  function getRem() {
    var html = document.documentElement
    var maxW = 640
    var winW = html.clientWidth
    if (winW >= 640) {
      html.style.fontSize = '100px'
      return  //这里应该有2种情况，小于640 和 大于等于640. 应该用if else  2 中情况判断。
              //这里是在函数中，我就判断了一种情况，用return了后边的情况就不判断了
    }
    var currentSize = ((winW / maxW) * 100)
    html.style.fontSize = currentSize + 'px'
  }
  getRem()
  // 给window 绑定一个事件
  $.addEventListener('resize', getRem, false)
}(window))


/**
 * 通过单例模式，构造模块
 */

//  loading 模块
let loadingRender = (function () {
  // 功能，实现数据预加载，滚动条滚动
  //可能出现的问题，如果时间过长，或者出现未加载到100%的情况，我们这里手动判断一下，如果加载的到90%，也算加载成功
  let oInner = $('.pro-inner')
  let dataArray = ["img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png"]
  let timer = null
  let num = 0 //记录加载了几条
  let len = dataArray.length
  let $loading = $('.loading')
  function run() {
    dataArray.forEach(function (item) {
      var oImg = new Image()
      oImg.src = item
      oImg.onload = function () {
        oImg = null
        oInner.css('width', ((++num / len)*100 + '%'))
        if (num === len) {
          clearTimeout(timer)
          done()
        }
      }
    })
  }
  function handleCal() {
    timer = setTimeout(function () {
      if ((num / len) >= .9) {
        done()
        return
      } 
      alert('网络有点慢，请稍后再试！！！')
      window.location.href = 'http://www.baidu.com'
    }, 50000)
  }
  function done() {
    let removeTimer = setTimeout(function () {
      $loading.remove()
      phoneRender.init()
    }, 1000)
  }
  return {
    //通过入口函数，调用，把要执行的方法写在这里边，上边定义变量，外边需要的东西，在传出去
    init: function () {
      $loading.css('display', 'block')
      run() //加载进度条的程序
      handleCal() //手动判断，是否进入下个模块
    }
  }
})()
// loadingRender.init()

// phone 模块
let phoneRender = (function () {
  var $phone = $('.phone')
  var $firstAudio = $phone.find('.firstaudio')[0]
  var $secondAudio = $phone.find('.secondaudio')[0]
  let $cale = $phone.find('.cale')
  var time = 0;  //记录时间的
  let timer = null  //时间的计时器 
  let $answer = $phone.find('.answer')
  let $call = $phone.find('.call')
  let $answerA = $phone.find('.answer-a')
  let $callA = $phone.find('.call-a')
  // cale 倒计时
  function runTime() {
    ++time
    if (time < 10) {
      time = '0' + time
    }
    $cale.html('00:' + time)
    if (time == 59) {
      clearInterval(timer)
    }
  }
  //接听点击事件
  function answerBtn() {
    $firstAudio.pause()
    $answer.remove()
    $call.css('display', 'block')
    $secondAudio.play()
    time = -1
  }
  function callBtn() {
    $secondAudio.pause()
    $phone.remove()
    messageRender.init()
  }
  return {
    init: function () {
      $phone.css('display', 'block')
      $firstAudio.play()   //播放音乐
      timer = setInterval(runTime, 1000)     //开启计时功能
      $answerA.on('singleTap', answerBtn)
      $callA.on('singleTap', callBtn)
    }
  }
}())
// phoneRender.init()

let messageRender = (function () {
  /**
   * 需求
   * 信息一条一条显示  怎么显示呢，改变opacity 和 translateY
   * 当第3条信息显示完成，键盘显示出来
   * 打字机效果
   * 点击发送，信息发送
   * 第四条之后，列表能自动上移
   */
  let current = 0  // 控制当前显示的li
  let curStr = ''  // 记录打印机
  let $message = $('.message')
  let $list = $message.find('.list'),
      $item = $list.find('li')
      $keyboard = $message.find('.keyboard'),
      timer = null,
      str = '都学了，已经找到工作了啊，哈哈哈',
      strNum = 0,
      strLen = str.length,
      strTimer = null,
      $print = $keyboard.find('p'),
      $submit = $keyboard.find('a'),
      $part = 1
  function messageShow() {
    $item.eq(++current).addClass('active')
    if (current == 2) {
      clearInterval(timer)
      $item.eq(current).on('transitionend',function () {
        $keyboard.css('transform', 'translateY(0)')
      })
      print()
    }
    //第4条的时候，$list开始滚动
    if (current >= 3) {
      $list.css('transform', 'translateY(-' + $part++ + 'rem)')
    }
    if (current == ($item.length - 1)) {
      clearInterval(timer)
      done()
    }
    
  }
  function print() {
    strTimer = setInterval(function () {
      curStr +=  str[strNum++]
      $print.html(curStr)
      if (strNum == strLen - 1) {
        clearInterval(strTimer)
      }
    }, 300)
  }
  function subEvent() {
    let $li = $(`<li class="item-stu">
    <img src="img/zf_messageStudent.png" alt="">
    都学了，已经找到工作了啊，哈哈哈
  </li>`)
    $keyboard.css('transform', 'translateY(3.7rem)')
    $print.html('')
    $item.eq(2).after($li)
    $item = $list.find('li')
    timer = setInterval(messageShow, 1000)
  }
  function done() {
    var timer = setTimeout(function (){
      $message.remove()
      cubeRender.init()
    }, 1000)
  }
  return {
    init: function () {
      $message.css('display', 'block')
      $item.eq(0).addClass('active')
      timer = setInterval(messageShow, 1000)
      $submit.on('singleTap', subEvent)
    }
  }
})()
// messageRender.init()

let cubeRender = (function () {
  /**
   * 需求： 手指放到魔方上，滑动，魔方随之转动
   */
  let cube = $('.cube-inner'),
      moveX = 0,       //记录滑动的距离
      moveY = 0,
      $cubeWrap = $('.cube')
      function touchStart(ev) {
    // console.log(ev.touches[0].clientX);
    cube.currentX = ev.touches[0].clientX  //记录第一次的初始点
    cube.currentY = ev.touches[0].clientY
  }
  function touchMove(ev) {
    //向上滑动 moveY是负的
    //向下滑动 moveY 是正的     沿着X轴转动，正的是顺时针   -moveY
    //向左滑动 moveX 是负的
    //向右滑动 moveX 是正的     沿着Y轴转动，负的是顺时针    moveY
    moveX = (ev.touches[0].clientX - parseFloat(cube.currentX)) / 3
    moveY = (ev.touches[0].clientY - parseFloat(cube.currentY)) / 3
    if (Math.abs(moveX) < .5 || Math.abs(moveY) < 2) return
    cube.css('transform', 'scale(.4) rotateX('+ (-moveY) +'deg) rotateY(' + moveX + 'deg)')
  }
  function touchEnd() {
    console.log('touchend');
  }
  return {
    init: function () {
      $cubeWrap.css('display', 'block')
      cube.on('touchstart', touchStart)
      cube.on('touchmove', touchMove)
      cube.on('touchend', touchEnd)
    }
  }
})()


















//hash 模块
let hashRender = (function () {
  let url = window.location.href
  let hashNum = url.indexOf('#')
  let hash = hashNum == -1? null:url.substr(hashNum + 1)
  return {
    init: function () {
      switch (hash) {
        case 'loading':
          console.log('loading');
          loadingRender.init()
        break;
        case 'phone':
          console.log('phone');
          phoneRender.init()
        break;
        case 'message':
          console.log('message');
          messageRender.init()
        break;
        case 'cube':
          console.log(hash);
          cubeRender.init()
          break;
        default:
          console.log('default');
          loadingRender.init()
        break;  
      }
    }
  }
})()
hashRender.init()