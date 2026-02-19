/* ReportMedic — All Tools drawer for tool pages.
   Keeps navigation lightweight and consistent with the home page. */
(function(){
  const tools = [
    { id:"compare",   name:"Report Compare",       desc:"Compare two reports and highlight diffs by key fields." },
    { id:"reconcile", name:"Reconciliation",       desc:"Match totals, track variance, and explain gaps." },
    { id:"cleaner",   name:"Data Cleaner",         desc:"Trim, normalize, dedupe, fix dates, and standardize formats." },
    { id:"validator", name:"Schema Validator",     desc:"Validate required fields, types, ranges, and null rules." },
    { id:"outliers",  name:"Outlier Finder",       desc:"Detect spikes, anomalies, and suspicious rows fast." },
    { id:"pivot",     name:"Quick Pivot",          desc:"Instant pivot tables & group summaries (counts/sums/avg)." },
    { id:"audit",     name:"Audit Trail Notes",    desc:"Generate audit-ready explanations and change notes." },
    { id:"mask",      name:"PII Masker",           desc:"Mask sensitive fields for safe sharing." },
    { id:"export",    name:"Export Studio",        desc:"Export cleaned/merged results as CSV/XLSX + summary." },
    { id:"scheduler", name:"Run Scheduler",        desc:"Save a run config and repeat it on new files." },
  ];

  const routes = {
    compare: "/tools/compare.html",
    reconcile: "/tools/reconcile.html",
    cleaner: "/tools/cleaner.html",
    validator: "/tools/validator.html",
    outliers: "/tools/outliers.html",
    pivot: "/tools/pivot.html",
    audit: "/tools/audit.html",
    mask: "/tools/mask.html",
    export: "/tools/export.html",
    scheduler: "/tools/scheduler.html",
  };

  function el(tag, attrs={}, html){
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k,v])=>{
      if(k === "class") n.className = v;
      else if(k === "text") n.textContent = v;
      else n.setAttribute(k, v);
    });
    if(html != null) n.innerHTML = html;
    return n;
  }

  function currentToolId(){
    const path = (window.location.pathname || "").toLowerCase();
    const m = path.match(/\/tools\/(.+?)\.html$/);
    return m ? m[1] : null;
  }

  function ensureDrawer(){
    let overlay = document.getElementById("rmOverlay");
    let drawer  = document.getElementById("rmDrawer");
    if(overlay && drawer) return { overlay, drawer };

    overlay = el("div", { id:"rmOverlay", class:"drawerOverlay", "aria-hidden":"true" });
    drawer = el("aside", { id:"rmDrawer", class:"drawer", "aria-label":"All Tools Drawer" });

    const header = el("div", { class:"drawerHeader" });
    const closeBtn = el("button", { id:"rmCloseDrawerBtn", class:"btn", type:"button", text:"Close" });
    const title = el("strong", { text:`All Tools (${tools.length})` });
    const spacer = el("div", { class:"spacer" });

    header.appendChild(closeBtn);
    header.appendChild(title);
    header.appendChild(spacer);

    const list = el("div", { class:"drawerList", id:"rmDrawerList" });

    drawer.appendChild(header);
    drawer.appendChild(list);

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // populate
    const active = currentToolId();
    list.innerHTML = "";
    tools.forEach(t=>{
      const a = el("a", { class:"drawerRow", href: routes[t.id] || "#", "data-tool": t.id });
      a.innerHTML = `
        <div style="min-width:0">
          <div class="rTitle">${t.name}</div>
          <div class="rDesc">${t.desc}</div>
        </div>
      `;
      if(active && active === t.id){
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
      list.appendChild(a);
    });

    return { overlay, drawer };
  }

  function openDrawer(){
    const { overlay, drawer } = ensureDrawer();
    overlay.style.display = "block";
    drawer.classList.add("open");
    document.body.classList.add("rmNoScroll");
  }

  function closeDrawer(){
    const overlay = document.getElementById("rmOverlay");
    const drawer  = document.getElementById("rmDrawer");
    if(!overlay || !drawer) return;
    overlay.style.display = "none";
    drawer.classList.remove("open");
    document.body.classList.remove("rmNoScroll");
  }

  function init(){
    const btn = document.getElementById("openDrawerBtn");
    if(btn){
      btn.addEventListener("click", (e)=>{ e.preventDefault(); openDrawer(); });
    }

    const { overlay } = ensureDrawer();
    overlay.addEventListener("click", closeDrawer);

    const closeBtn = document.getElementById("rmCloseDrawerBtn");
    if(closeBtn) closeBtn.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (e)=>{
      if(e.key === "Escape") closeDrawer();
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
