/* ReportMedic - A-Ads banner injector
   Single source of truth for ad placement across tool pages.
   Kill switch: set ENABLED to false to pull every ad site-wide
   without editing a single page.
   Per-page opt out: add data-no-ads to the body tag.
*/
(function () {
  "use strict";

  var ENABLED = true;
  var UNIT_ID = "2462332";

  if (!ENABLED) return;

  function init() {
    if (!document.body) return;
    if (document.body.hasAttribute("data-no-ads")) return;
    if (document.querySelector(".rm-ad")) return;

    var footer = document.querySelector("footer.rm-footer");
    if (!footer || !footer.parentNode) return;

    var slot = document.createElement("div");
    slot.className = "rm-ad";

    var label = document.createElement("span");
    label.className = "rm-ad-label";
    label.textContent = "Advertisement";

    var frame = document.createElement("iframe");
    frame.className = "rm-ad-frame";
    frame.setAttribute("data-aa", UNIT_ID);
    frame.src = "https://acceptable.a-ads.com/" + UNIT_ID + "/?size=Adaptive";
    frame.title = "Advertisement";
    frame.setAttribute("loading", "lazy");
    frame.setAttribute("scrolling", "no");
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("referrerpolicy", "no-referrer-when-downgrade");

    slot.appendChild(label);
    slot.appendChild(frame);
    footer.parentNode.insertBefore(slot, footer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
