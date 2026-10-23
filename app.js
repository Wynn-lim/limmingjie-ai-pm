/* ═══════════════════════════════════════════════════════════════
   LMJ Portfolio v2 — 交互脚本
   1) 时间码 HUD（SMPTE 制式，随真实时间走）
   2) HUD 滚到底色
   3) 章节进场（IntersectionObserver）
   4) 数字滚动计数
   5) 导航高亮
   6) 开场多机位：鼠标视差 + 缓慢横移
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 1) 时间码 ── */
  var tc = document.getElementById("tc");
  var t0 = Date.now();
  function pad(n, w) { return String(n).padStart(w, "0"); }
  function tickTC() {
    if (!tc) return;
    var ms = Date.now() - t0;
    var s = Math.floor(ms / 1000);
    var f = Math.floor((ms % 1000) / 41.7); // ~24fps
    tc.textContent =
      pad(Math.floor(s / 3600), 2) + ":" +
      pad(Math.floor((s % 3600) / 60), 2) + ":" +
      pad(s % 60, 2) + ":" + pad(f, 2);
  }
  if (tc && !reduceMotion) setInterval(tickTC, 60);

  /* ── 2) HUD 底色 ── */
  var hud = document.getElementById("hud");
  function onScrollHud() {
    if (!hud) return;
    hud.classList.toggle("is-solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScrollHud, { passive: true });
  onScrollHud();

  /* ── 3) 章节进场 ── */
  var riseEls = Array.prototype.slice.call(document.querySelectorAll(".rise"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    riseEls.forEach(function (el) { io.observe(el); });
  } else {
    riseEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ── 4) 数字计数 ── */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ── 5) 导航高亮 ── */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-hud]"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  function onScrollNav() {
    var pos = window.scrollY + 120, current = null;
    sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
    navLinks.forEach(function (a) {
      a.classList.toggle("is-active", !!(current && a.getAttribute("href") === "#" + current.id));
    });
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ── 6) 开场视差：多机位随鼠标轻微位移，强化「画面」感 ── */
  var reel = document.querySelector(".reel");
  var cells = Array.prototype.slice.call(document.querySelectorAll(".reel__cell img"));
  if (reel && cells.length && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    var raf = null;
    reel.addEventListener("mousemove", function (ev) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var r = reel.getBoundingClientRect();
        var dx = (ev.clientX - r.left) / r.width - 0.5;
        var dy = (ev.clientY - r.top) / r.height - 0.5;
        cells.forEach(function (img, i) {
          var depth = (i + 1) * 6;
          img.style.transform = "scale(1.12) translate(" + (-dx * depth) + "px, " + (-dy * depth) + "px)";
        });
        raf = null;
      });
    });
    reel.addEventListener("mouseleave", function () {
      cells.forEach(function (img) { img.style.transform = ""; });
    });
  }
})();
