import"./index-D8W-ZZeA.js";/* empty css              */import{m as T,s as S,f as s,e,g as A}from"./mount-DHC3VjOO.js";const d=()=>({"zh-Hant":"",en:""}),M={approach:d(),ethicsAndResponsibility:d(),limitationsAndMissingVoices:d(),nextSteps:d(),howHpChanged:{wetLab:d(),model:d(),hardware:d()},stakeholders:[],engagements:[],decisionTimeline:[]},w=document.querySelector("#app");if(!w)throw new Error("#app missing");const y=w,u=T(y,{homeHref:"../index.html",onLocaleChange:()=>k()});function c(t,p){return p.trim()?`<div><dt>${e(t)}</dt><dd>${e(p)}</dd></div>`:""}function l(t,p,i){return`
    <section class="wiki-section" data-testid="hp-${t}">
      <h2>${e(p)}</h2>
      ${i}
    </section>
  `}function k(){const t=u.getLocale(),p=u.getCopy(),i=p.pages.humanPractices,o=M;document.title=`${i.title} · Odor Pixel Suite`;const b=S(y),m=s(o.approach,t),h=s(o.ethicsAndResponsibility,t),g=s(o.limitationsAndMissingVoices,t),$=s(o.nextSteps,t),x=o.stakeholders.length===0?`<p class="sp-muted">${e(i.noStakeholders)}</p>`:`<ul>${o.stakeholders.map(n=>{const a=e(s(n.label,t)),r=e(s(n.context,t)),L=n.anonymized?` <em>(${e(i.anonymized)}${n.anonymizationReason?`: ${e(s(n.anonymizationReason,t))}`:""})</em>`:"";return`<li><strong>${a}</strong>${L}<br/>${r}</li>`}).join("")}</ul>`,f=o.engagements.length===0?`<p class="sp-muted">${e(i.noEngagements)}</p>`:o.engagements.map(n=>{const a=i.loopLabels;return`
              <article class="wiki-loop" data-testid="hp-engagement" data-engagement-id="${e(n.id)}">
                <p class="wiki-status">${e(n.date)} · ${e(n.method)} · ${e(n.consentAttributionStatus)}</p>
                <dl class="wiki-dl">
                  ${c(a.question,s(n.questionAsked,t))}
                  ${c(a.heard,s(n.whatWeHeard,t))}
                  ${c(a.insight,s(n.insight,t))}
                  ${c(a.decision,s(n.projectDecision,t))}
                  ${c(a.change,s(n.concreteChange,t))}
                  ${c(a.evidence,s(n.evidenceOfChange,t))}
                  ${c(a.followUp,s(n.followUpEvaluation,t))}
                  ${c(a.impact,s(n.projectImpact,t))}
                </dl>
              </article>
            `}).join(""),v=o.decisionTimeline.length===0?`<p class="sp-muted">${e(i.noDecisions)}</p>`:`<ol>${o.decisionTimeline.map(n=>{const a=e(s(n.title,t)),r=e(s(n.summary,t));return`<li><strong>${e(n.date)}</strong> — ${a}<br/>${r}</li>`}).join("")}</ol>`,H=`
    <ul>
      <li><strong>Wet Lab:</strong> ${e(s(o.howHpChanged.wetLab,t)||"—")}</li>
      <li><strong>Model:</strong> ${e(s(o.howHpChanged.model,t)||"—")}</li>
      <li><strong>Hardware:</strong> ${e(s(o.howHpChanged.hardware,t)||"—")}</li>
    </ul>
  `,C=o.stakeholders.length===0&&o.engagements.length===0?`<div class="wiki-empty" data-testid="hp-empty"><p><strong>${e(i.empty)}</strong></p></div>`:"";b.innerHTML=`
    ${A(p,1)}
    <section class="hub-intro">
      <div class="eyebrow"><span></span> WIKI</div>
      <h1>${e(i.title)}</h1>
      <p>${e(i.lead)}</p>
    </section>
    ${C}
    ${l("approach",i.sections.approach,m?`<p>${e(m)}</p>`:'<p class="sp-muted">—</p>')}
    ${l("landscape",i.sections.landscape,x)}
    ${l("needFinding",i.sections.needFinding,f)}
    ${l("decisions",i.sections.decisions,v)}
    ${l("ethics",i.sections.ethics,h?`<p>${e(h)}</p>`:'<p class="sp-muted">—</p>')}
    ${l("changed",i.sections.changed,H)}
    ${l("limitations",i.sections.limitations,g?`<p>${e(g)}</p>`:'<p class="sp-muted">—</p>')}
    ${l("next",i.sections.next,$?`<p>${e($)}</p>`:'<p class="sp-muted">—</p>')}
  `}k();
