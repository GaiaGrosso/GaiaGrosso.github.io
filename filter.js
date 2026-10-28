/* Publications page: filter the list by category.
   Without JavaScript every group stays visible, so nothing is lost. */
(function () {
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".filter"));
  var groups  = Array.prototype.slice.call(document.querySelectorAll(".pubgroup"));
  if (!buttons.length || !groups.length) return;

  function apply(cat) {
    groups.forEach(function (g) {
      g.hidden = !(cat === "all" || g.dataset.cat === cat);
    });
    buttons.forEach(function (b) {
      var on = b.dataset.filter === cat;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.dataset.filter);
      // keep the list in view when switching from far down the page
      var top = document.querySelector(".topicrow");
      if (top && top.getBoundingClientRect().top < 0) {
        top.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* A link from another page points at a single entry (#pub-sparker).
     Make sure its group is visible before the browser tries to scroll to it. */
  function revealTarget() {
    var id = location.hash.slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    var group = el.closest(".pubgroup");
    if (group && group.hidden) apply("all");
    el.scrollIntoView({ block: "center" });
  }
  window.addEventListener("hashchange", revealTarget);
  revealTarget();
})();
