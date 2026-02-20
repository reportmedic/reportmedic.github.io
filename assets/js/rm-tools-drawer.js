/* ReportMedic — All Tools drawer for tool pages.
   Auto-populated routes based on /tools/<slug>.html so every tool stays in the menu. */
(function(){
  const tools = [
    { id:"compare-two-files-find-differences",      name:"Report Compare",       icon:"≋", desc:"Compare two reports and pinpoint exactly what changed." },
    { id:"reconcile-two-datasets-totals-dont-match",name:"Reconciliation",       icon:"✓", desc:"Match totals, quantify variance, and explain gaps." },
    { id:"clean-dirty-data-file-online",           name:"Data Cleaner",         icon:"✦", desc:"Trim, normalize, dedupe, and standardize formats." },
    { id:"validate-data-schema-and-columns",       name:"Schema Validator",     icon:"⊢", desc:"Validate required fields, types, ranges, and null rules." },
    { id:"find-data-outliers-and-anomalies",       name:"Outlier Finder",       icon:"⚡", desc:"Spot spikes, anomalies, and suspicious rows fast." },
    { id:"summarize-data-by-group-pivot-online",   name:"Quick Pivot",          icon:"▦", desc:"Instant group summaries and pivot-style totals." },
    { id:"why-two-reports-dont-match",             name:"Why Reports Don’t Match",icon:"✎", desc:"Turn mismatches into a crisp, audit-ready explanation." },
    { id:"compare-two-texts-side-by-side",         name:"Text Compare",         icon:"↔", desc:"Compare two text blocks side-by-side with highlights." },

    { id:"online-notepad-rich-text-editor",        name:"Online Notepad",       icon:"🗒", desc:"Create notebooks + rich-text notes (saved locally)." },

    { id:"mask-sensitive-data-before-sharing",     name:"PII Masker",           icon:"◎", desc:"Mask sensitive fields for safe sharing." },
    { id:"fix-export-formatting-errors",           name:"Export Fixer",         icon:"⇣", desc:"Repair export formatting and produce clean outputs." },
    { id:"schedule-data-validation-checks",        name:"Run Scheduler",        icon:"⏱", desc:"Save a run setup and repeat it on new files." },

    { id:"markdown-to-html",                       name:"Markdown → HTML",      icon:"⌁", desc:"Convert Markdown into clean HTML." },
    { id:"html-to-markdown",                       name:"HTML → Markdown",      icon:"⌁", desc:"Convert HTML into Markdown." },
    { id:"markdown-to-pdf",                        name:"Markdown → PDF",       icon:"⎙", desc:"Turn Markdown into a printable PDF." },
    { id:"markdown-to-word-docx",                  name:"Markdown → Word",      icon:"W",  desc:"Convert Markdown into a .docx file." },
    { id:"word-docx-to-markdown",                  name:"Word → Markdown",      icon:"W",  desc:"Convert a .docx file into Markdown." },
  ];

  const routes = Object.fromEntries(tools.map(t => [t.id, `/tools/${t.id}.html`]));

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

    const active = currentToolId();
    list.innerHTML = "";
    tools.forEach(t=>{
      const a = el("a", { class:"drawerRow", href: routes[t.id] || "#", "data-tool": t.id });
      a.innerHTML = `
        <div class="drawerIcon" aria-hidden="true">${t.icon || ""}</div>
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
