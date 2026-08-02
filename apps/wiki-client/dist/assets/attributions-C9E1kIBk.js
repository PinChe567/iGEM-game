import"./index-D8W-ZZeA.js";/* empty css              */import{m as b,s as $,r as g,d as h,e,f as k,g as w,h as v}from"./mount-DHC3VjOO.js";const p=document.querySelector("#app");if(!p)throw new Error("#app missing");const l=p,n=b(l,{homeHref:"../index.html",onLocaleChange:()=>c()});function c(){const d=n.getLocale(),o=n.getCopy(),t=o.pages.attributions;document.title=`${t.title} · Odor Pixel Suite`;const m=$(l),s=g(),a=h();let i="";if(s.ok)i=`
      <p>
        <a data-testid="attributions-open" href="${e(s.url)}" target="_blank" rel="noopener noreferrer">
          ${e(t.openOfficial)}
        </a>
      </p>
      <div class="attributions-frame-wrap" data-testid="attributions-frame">
        <iframe
          title="${e(t.iframeTitle)}"
          src="${e(s.url)}"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p class="sp-muted">${e(t.iframeFallback)}</p>
    `;else{const f=s.reason==="empty"?t.embedMissing:s.reason==="not_allowlisted"?t.embedBlocked:t.embedInvalid;i=`
      <div class="wiki-empty" data-testid="attributions-missing">
        <p><strong>${e(f)}</strong></p>
        <p>${e(t.embedMissingHint)}</p>
      </div>
    `}!s.ok&&a&&(i+=`
      <p>
        <a data-testid="attributions-open" href="${e(a)}" target="_blank" rel="noopener noreferrer">
          ${e(t.openOfficial)}
        </a>
      </p>
    `);const r=k(v.supportAcknowledgement,d),u=`
    <section class="wiki-section" data-testid="attributions-support">
      <h2>${e(t.supportTitle)}</h2>
      ${r?`<p>${e(r)}</p>`:`<p class="sp-muted">${e(t.supportEmpty)}</p>`}
    </section>
  `;m.innerHTML=`
    ${w(o,1)}
    <section class="hub-intro">
      <div class="eyebrow"><span></span> WIKI</div>
      <h1>${e(t.title)}</h1>
      <p>${e(t.lead)}</p>
    </section>
    ${i}
    ${u}
  `}c();
