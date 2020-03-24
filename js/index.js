//rem 模块
var remRender =  (function () {
  var html = document.documentElement
  
  var run = function () {
    // if (winW >= 640) {
    //   html.style.fontSize = '100px'
    // }else {
    //   var remNum = winW / 640 * 100
    //   html.style.fontSize = remNum + 'px'
    // }
    var winW = html.clientWidth
    if (winW <= 640) {
      var remNum = winW / 640 * 100
      html.style.fontSize = remNum + 'px' 
    }
  }
  window.addEventListener('resize', run, false)
  return {
    init: function () {
      run()
    }
  }
})()
remRender.init()

//loading模块
var loadingRender = (function () {
  var $loading = $('.loading')
  var $inner = $('.pro-inner')
  var imgData = ["img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png"]
  var len = imgData.length
  var current = 0
  var timer = null
  var run = function () {
    //加载数据
    /** 可能出现的情况
     * 1，可能图片没有加载到100的情况，我们手动计算加载完成没
     * 2,如果没有出现这种情况，在正常情况下清楚定时器
     */ 
    imgData.forEach(function (item) {
      var oImg = new Image()
      oImg.src = item
      oImg.onload = function () {
        oImg = null
        $inner.css("width", ((++current / len)*100 + '%'))
        if (current == len) {
          clearTimeout(timer)
          done()
        }
      }
    })
  }
  var test = function () {
    timer = setTimeout(function () {
      if ((current / len ) > .9) {
        done()
        return
      }
      alert('请求超时了，请稍后再试')
      // window.location.href = "https://www.baidu.com/s?ie=UTF-8&wd=%E7%99%BE%E5%BA%A6"
    },10000) 
  }
  var done = function () {
    var timerremove = setTimeout(function () {
      $loading.remove()
    }, 1000)
  }
  return {
    init () {
      run()
      test()
    }
  }
})()


//phone模块
var phoneRender = (function () {
  var $phone = $('.phone')
  var $phoneanswer = $('.phoneanswer')
  var $aBtn = $('.phoneanswer a')
  var $phonecall = $('.phonecall')
  var $firstAudio = $('#firstaudio')
  var $secondAudio = $('#secondaudio')
  var $stop = $phonecall.find('a')
  var $ct = $('.ct')
  var timer = null
  var num = 0
  
  function run() {
    var runTime = function () {
      ++num
      if (num < 10) {
        num = '0' + num
      }
      $ct.html(num)
    }
    $aBtn.on('tap', function () {
      $(this).parent().remove()
      $phonecall.css('display', 'block')
      $firstAudio.get(0).pause();
      $secondAudio.get(0).play()
      clearInterval(timer)
      num = 0
      $ct.text('00')
      timer = setInterval(runTime, 1000)
    })
    timer = setInterval(runTime, 1000)

    $stop.on('tap', function () {
      clearInterval(timer)
      $phone.remove()
    })
    
  }
  
  return {
    init: function () {
      run()
    }
  }
})()



    //hash
var hash = (function () {
  var run = function () {
    var url = window.location.href
    var num = url.indexOf('#')
    var hash = url.substr(num + 1)
    switch (hash) {
      case 'loading':
        console.log('loading run');
        loadingRender.init()
        break;
      case 'phone':
        console.log('phone run');
        phoneRender.init()
        break;
      case 'default':   
        loadingRender.init()
      break;
    } 
  }
  return {
    init: function () {
      run()
    }
  }
})()
hash.init()