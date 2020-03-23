//rem 模块

var remRender =  (function () {
  
  var run = function () {
    var html = document.documentElement
    var winW = html.clientWidth
    // if (winW >= 640) {
    //   html.style.fontSize = '100px'
    // }else {
    //   var remNum = winW / 640 * 100
    //   html.style.fontSize = remNum + 'px'
    // }

    if (winW < 640) {
      var remNum = winW / 640 * 100
        html.style.fontSize = remNum + 'px'
    }
  }
  return {
    init: function () {
      run()
    }
  }
})()
remRender.init()