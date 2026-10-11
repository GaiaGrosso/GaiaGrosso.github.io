/* Shared across all pages: light/dark toggle + footer year. */
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  var dark = saved ? saved === "dark"
                   : window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", dark ? "dark" : "light");

  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  var y = new Date().getFullYear();
  Array.prototype.forEach.call(document.querySelectorAll(".year"), function (el) {
    el.textContent = y;
  });
})();
