var c;
function widthScale(a) {
  function b() {
    var m;
    if (a.navigator.appVersion.match(/window|ipad|Macintosh/gi)) {
      m = f.getBoundingClientRect().width > 960 ? 560 : f.getBoundingClientRect().width;
    } else {
      m = f.getBoundingClientRect().width;
    }
    a.rem = m / 18.75;
    f.style.fontSize = a.rem + "px";
    var realFz = parseFloat(window.getComputedStyle(
      document.querySelector('html'),
      null
    ).fontSize);
    if (a.rem <= realFz - 1 || a.rem >= realFz + 1) {
      f.style.fontSize = a.rem * (a.rem / realFz) + 'px'
    }

  }
  var d = a.navigator.appVersion.match(/iphone/gi) ? a.devicePixelRatio : 1,
    e = 1 / d,
    f = document.documentElement,
    g = document.createElement("meta");
  if (a.dpr = d, a.addEventListener("resize", function () { clearTimeout(c), c = setTimeout(b, 300) }, !1), a.addEventListener("pageshow", function (a) {
    a.persisted && (clearTimeout(c), c = setTimeout(b, 300))
  }, !1), f.setAttribute("data-dpr", d),
    g.setAttribute("name", "viewport"), g.setAttribute("content", "initial-scale=" + e + ", maximum-scale=" + e + ", minimum-scale=" + e + ", user-scalable=no"),
    f.firstElementChild) f.firstElementChild.appendChild(g);
  else {
    var h = document.createElement("div");
    h.appendChild(g), document.write(h.innerHTML)
  }
  b()
}
function heightScale(a) {
  function b() {
    if (a.navigator.appVersion.match(/window|ipad|Macintosh/gi)) {
      m = f.getBoundingClientRect().height > 960 ? 560 : f.getBoundingClientRect().height;
    } else {
      m = f.getBoundingClientRect().height;
    }
    a.rem = m / 29.1;
    f.style.fontSize = a.rem + "px";
    var realFz = parseFloat(window.getComputedStyle(
      document.querySelector('html'),
      null
    ).fontSize);
    if (a.rem != realFz) {
      f.style.fontSize = a.rem * (a.rem / realFz) + 'px'
    }

  }
  var d = a.navigator.appVersion.match(/iphone/gi) ? a.devicePixelRatio : 1,
    e = 1 / d,
    f = document.documentElement,
    g = document.createElement("meta");
  if (a.dpr = d, a.addEventListener("resize", function () { clearTimeout(c), c = setTimeout(b, 300) }, !1), a.addEventListener("pageshow", function (a) {
    a.persisted && (clearTimeout(c), c = setTimeout(b, 300))
  }, !1), f.setAttribute("data-dpr", d),
    g.setAttribute("name", "viewport"), g.setAttribute("content", "initial-scale=" + e + ", maximum-scale=" + e + ", minimum-scale=" + e + ", user-scalable=no"),
    f.firstElementChild) f.firstElementChild.appendChild(g);
  else {
    var h = document.createElement("div");
    h.appendChild(g), document.write(h.innerHTML)
  }
  b()
}
widthScale(window);
