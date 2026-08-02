import"./index-D8W-ZZeA.js";import{m as p,k as c,s as h,g as m,t as u}from"./mount-DHC3VjOO.js";import{p as d,P as b}from"./storage-ig4V_Ips.js";import"./load-BA9EhZ99.js";import{p as $,L as g}from"./storage-CmXva9Kt.js";import{p as x,S as y}from"./storage-BXBn_hgH.js";/* empty css              */const n=document.querySelector("#app");if(!n)throw new Error("#app missing");const l=n,f=p(l,{homeHref:"./index.html",onLocaleChange:()=>i()});function S(a,e){const r=[a.tutorialDone?"T":"·",a.practiceDone?"P":"·",a.dailyOrCampaignDone?"M":"·",a.scienceDone?"S":"·"],s=[a.tutorialDone,a.practiceDone,a.dailyOrCampaignDone,a.scienceDone].filter(Boolean).length;return`${e.hub.localProgress}: ${s}/4 (${r.join("")})`}function i(){const a=f.getLocale(),e=u(a);document.title=e.meta.title;const r=document.querySelector('meta[name="description"]');r&&r.setAttribute("content",e.meta.description);const s=c({pixelKey:b,labyrinthKey:g,spectrumKey:y,parsePixel:d,parseLabyrinth:$,parseSpectrum:x}),o=[{step:"01",href:"./games/pixel/index.html",meta:e.hub.games.pixel,progress:s.pixel,testid:"card-pixel"},{step:"02",href:"./games/labyrinth/index.html",meta:e.hub.games.game2,progress:s.labyrinth,testid:"card-labyrinth"},{step:"03",href:"./games/spectrum/index.html",meta:e.hub.games.game3,progress:s.spectrum,testid:"card-spectrum"}];h(l).innerHTML=`
    ${m(e,0)}
    <section class="hub-intro">
      <div class="eyebrow"><span></span> ${e.hub.eyebrow}</div>
      <h1>${e.hub.heading}</h1>
      <p>${e.hub.lead}</p>
    </section>

    <section class="hub-path" aria-labelledby="path-title">
      <h2 id="path-title">${e.hub.pathTitle}</h2>
      <p>${e.hub.pathLead}</p>
      <ol class="hub-path-steps">
        <li><strong>Pattern Recognition</strong> <span>(Game 1)</span></li>
        <li><strong>Identity &amp; Path Deduction</strong> <span>(Game 2)</span></li>
        <li><strong>Mixture Inference</strong> <span>(Game 3)</span></li>
      </ol>
    </section>

    <section class="hub-explorer" aria-labelledby="explorer-title" data-testid="explorer">
      <h2 id="explorer-title">${e.hub.explorerTitle}</h2>
      <p>${e.hub.explorerLead}</p>
      <p class="hub-level">
        ${e.hub.explorerLevel}:
        <strong data-testid="explorer-level">${s.level}</strong> / ${s.maxLevel}
      </p>
      <p class="hub-not-rank">${e.hub.explorerNotRank}</p>
      <ul class="hub-checklist">
        ${s.checklist.map(t=>`<li data-done="${t.done}">${t.done?"✓":"○"} ${t.id}</li>`).join("")}
      </ul>
    </section>

    <section class="hub-grid" aria-label="${e.hub.heading}">
      ${o.map(t=>`
        <a class="game-card-link hub-card" href="${t.href}" data-testid="${t.testid}" data-game="${t.step==="01"?"pixel":t.step==="02"?"labyrinth":"spectrum"}">
          <span class="section-label">GAME ${t.step}</span>
          <h2>${t.meta.title}</h2>
          <p>${t.meta.blurb}</p>
          <ul class="hub-card-meta">
            <li><span>${e.hub.duration}</span> ${t.meta.duration}</li>
            <li><span>${e.hub.solo}</span> ${e.hub.solo}</li>
            <li><span>${e.hub.concept}</span> ${t.meta.concept}</li>
            <li>${S(t.progress,e)}</li>
          </ul>
          <span class="game-status">${e.hub.play}</span>
        </a>`).join("")}
    </section>
  `}i();
