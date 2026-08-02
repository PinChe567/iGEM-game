import"./index-D8W-ZZeA.js";/* empty css              */import{m as A,s as C,f as n,e as s,g as H}from"./mount-DHC3VjOO.js";const L=()=>({"zh-Hant":"",en:""}),M={intro:L(),activities:[]},u=document.querySelector("#app");if(!u)throw new Error("#app missing");const $=u,p=A($,{homeHref:"../index.html",onLocaleChange:()=>v()});function l(i,o){return`<div><dt>${s(i)}</dt><dd>${s(o.trim()||"—")}</dd></div>`}function v(){const i=p.getLocale(),o=p.getCopy(),e=o.pages.education,d=M;document.title=`${e.title} · Odor Pixel Suite`;const m=C($),c=n(d.intro,i),f=d.activities.length===0?`<div class="wiki-empty" data-testid="education-empty"><p><strong>${s(e.empty)}</strong></p></div>`:"",h=d.activities.map(t=>{const y=s(n(t.title,i)||t.id),g=s(e.status[t.status]??t.status),r=n(t.results,i),w=t.status!=="completed"&&!r?`<div><dt>${s(e.fields.results)}</dt><dd class="sp-muted">${s(e.noResultsYet)}</dd></div>`:l(e.fields.results,r),b=t.reusableDownloads.length===0?"":`<div><dt>${s(e.downloads)}</dt><dd><ul>${t.reusableDownloads.map(a=>{const k=s(n(a.label,i)),j=s(n(a.license,i));return`<li><a href="${s(a.href)}" rel="noopener noreferrer">${k}</a> (${j})</li>`}).join("")}</ul></dd></div>`;return`
        <article class="wiki-activity" data-testid="education-activity" data-activity-id="${s(t.id)}">
          <p class="wiki-status">${g}</p>
          <h3>${y}</h3>
          <dl class="wiki-dl">
            ${l(e.fields.audience,n(t.audienceAndNeeds,i))}
            ${l(e.fields.objectives,n(t.learningObjectives,i))}
            ${l(e.fields.codesign,n(t.coDesignAdaptation,i))}
            ${l(e.fields.materials,n(t.materials,i))}
            ${l(e.fields.activity,n(t.activity,i))}
            ${l(e.fields.safety,n(t.safetyInclusivityAccessibility,i))}
            ${l(e.fields.evaluation,`${t.evaluationMethod} — ${n(t.evaluationNotes,i)}`)}
            ${w}
            ${l(e.fields.changed,n(t.whatChangedAfterFeedback,i))}
            ${b}
            ${l(e.fields.license,n(t.license,i))}
          </dl>
        </article>
      `}).join("");m.innerHTML=`
    ${H(o,1)}
    <section class="hub-intro">
      <div class="eyebrow"><span></span> WIKI</div>
      <h1>${s(e.title)}</h1>
      <p>${s(e.lead)}</p>
      ${c?`<p>${s(c)}</p>`:""}
    </section>
    ${f}
    <div class="wiki-card-list">${h}</div>
  `}v();
