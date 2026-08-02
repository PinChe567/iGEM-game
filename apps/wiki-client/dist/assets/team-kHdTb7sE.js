import"./index-D8W-ZZeA.js";/* empty css              */import{m as S,s as C,e as t,f as a,g as A,n as E}from"./mount-DHC3VjOO.js";const H=["wet-lab","dry-lab","hardware","human-practices","wiki","advisors","other"],c={members:[]};function T(i){return c.members.filter(n=>n.subteams.includes(i))}const $=document.querySelector("#app");if(!$)throw new Error("#app missing");const h=$,u=S(h,{homeHref:"../index.html",onLocaleChange:()=>g()});function g(){const i=u.getLocale(),n=u.getCopy(),s=n.pages.team;document.title=`${s.title} · Odor Pixel Suite`;const b=C(h),w=H.map(o=>{const r=T(o);if(!r.length&&c.members.length===0||!r.length)return"";const v=r.map(e=>{const p=t(a(e.name,i)||e.id),y=t(a(e.role,i)),f=t(a(e.contributionSummary,i)),l=e.pronouns?t(a(e.pronouns,i)):"",m=t(a(e.altText,i)||p),d=e.portraitCredit?t(a(e.portraitCredit,i)):"",L=e.portraitAsset?`<img class="wiki-portrait" src="${t(e.portraitAsset)}" alt="${m}" loading="lazy" width="88" height="88" />`:`<div class="wiki-portrait-pending" role="img" aria-label="${m}">${t(s.portraitPending)}</div>`,M=e.socialLink?`<p><a href="${t(e.socialLink)}" rel="noopener noreferrer" target="_blank">${t(e.socialLink)}</a></p>`:"";return`
          <article class="wiki-member" data-testid="team-member" data-member-id="${t(e.id)}">
            <div class="wiki-member-row">
              ${L}
              <div>
                <h3>${p}${l?` <span class="sp-muted">(${l})</span>`:""}</h3>
                <p>${y}</p>
                <p><strong>${t(s.contribution)}</strong> — ${f||"—"}</p>
                ${d?`<p class="sp-muted">${d}</p>`:""}
                ${M}
              </div>
            </div>
          </article>
        `}).join("");return`
      <section class="wiki-section" data-testid="subteam-${o}">
        <h2>${t(s.subteams[o]??o)}</h2>
        <div class="wiki-card-list">${v}</div>
      </section>
    `}).join(""),k=c.members.length===0?`<div class="wiki-empty" data-testid="team-empty">
           <p><strong>${t(s.empty)}</strong></p>
           <p>${t(s.emptyHint)}</p>
         </div>`:"";b.innerHTML=`
    ${A(n,1)}
    <section class="hub-intro">
      <div class="eyebrow"><span></span> WIKI</div>
      <h1>${t(s.title)}</h1>
      <p>${t(s.lead)}</p>
    </section>
    ${k}
    ${w}
    <section class="wiki-section">
      <h2>${t(s.contact)}</h2>
      ${E(i)}
    </section>
  `}g();
