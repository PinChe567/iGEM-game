import{s as Ht,S as _t,a as Bt,b as Ut,d as bt}from"./index-D8W-ZZeA.js";import{a as Vt,b as Ot,c as Gt,t as jt,j as Ft,m as Kt,s as Wt}from"./mount-DHC3VjOO.js";import{p as X,S as Z,r as Jt,a as Yt}from"./storage-BXBn_hgH.js";import{c as ct}from"./rng-BTVd-NHf.js";const Qt=12,Mt="1.1.0",F="2.0.0",_={ruleVersion:F,channelCount:Qt,saturationK:1.8,noise:{kind:"uniformSymmetric",amplitude:.03},signalRoundingDecimals:6,weightNormalization:"percentOver100",fitMetric:{kind:"normalizedRmse",rmseScale:1}},Xt={easy:{id:"easy",odorCount:10,componentCountMin:2,componentCountMax:4,percentStep:10,minPercent:10,maxGuesses:8,mixingModel:"linear",showSignatureHints:!0,revealComponentCount:!0},hard:{id:"hard",odorCount:10,componentCountMin:2,componentCountMax:4,percentStep:10,minPercent:10,maxGuesses:10,mixingModel:"saturated",showSignatureHints:!1,revealComponentCount:!1}};function w(t){return Xt[t]}function Zt(t,n){return t<n?-1:t>n?1:0}function lt(t){return{components:[...t].sort((o,s)=>Zt(o.odorId,s.odorId)).map(o=>({odorId:o.odorId,percent:o.percent}))}}function j(t){return t.components.map(n=>`${n.odorId}:${n.percent}`).join("|")}function te(t,n){return j(t)===j(n)}function yt(t,n){if(t.length===0)return{ok:!1,error:"empty"};const o=n==null?void 0:n.componentCountMin,s=n==null?void 0:n.componentCountMax;if(o!==void 0&&t.length<o)return{ok:!1,error:"component_count"};if(s!==void 0&&t.length>s)return{ok:!1,error:"component_count"};const a=new Set;let d=0;for(const l of t){if(a.has(l.odorId))return{ok:!1,error:"duplicate_odor"};if(a.add(l.odorId),!Number.isInteger(l.percent))return{ok:!1,error:"non_integer_percent"};if(l.percent<0||l.percent>100)return{ok:!1,error:"percent_out_of_range"};if((n==null?void 0:n.minPercent)!==void 0&&l.percent<n.minPercent)return{ok:!1,error:"below_min_percent"};if((n==null?void 0:n.percentStep)!==void 0&&l.percent%n.percentStep!==0)return{ok:!1,error:"not_on_step"};d+=l.percent}return d!==100?{ok:!1,error:"sum_not_100"}:{ok:!0,canonical:lt(t)}}function ee(t,n,o,s){const a=[];function d(l,r,u){if(l===1){r>=s&&r<=100&&r%o===0&&a.push([...u,r]);return}for(let p=s;p<=r-s*(l-1);p+=o)u.push(p),d(l-1,r-p,u),u.pop()}return d(t,n,[]),a}function ne(t,n){const o=[],s=t.length;if(n<0||n>s)return o;const a=Array.from({length:n},(d,l)=>l);for(;;){o.push(a.map(l=>t[l]));let d=n-1;for(;d>=0&&a[d]===s-n+d;)d-=1;if(d<0)break;a[d]+=1;for(let l=d+1;l<n;l+=1)a[l]=a[l-1]+1}return o}function oe(t,n){if(n.weightNormalization!=="percentOver100")throw new Error(`Unsupported weightNormalization: ${n.weightNormalization}`);return t/100}function se(t,n){if(!Number.isFinite(t))return t;const o=10**n;return Math.round(t*o)/o}function ae(t){return t<0?0:t>1?1:t}function dt(t,n){return t.map(o=>se(o,n))}function xt(t,n,o=_){const s=Array.from({length:o.channelCount},()=>0);for(const a of t.components){const d=n.get(a.odorId);if(!d)throw new Error(`Missing signature for odor ${a.odorId}`);if(d.length!==o.channelCount)throw new Error(`Signature ${a.odorId} length ${d.length} != ${o.channelCount}`);const l=oe(a.percent,o);for(let r=0;r<o.channelCount;r+=1)s[r]+=l*d[r]}return dt(s,o.signalRoundingDecimals)}function re(t,n=_){const o=n.saturationK;return dt(t.map(s=>1-Math.exp(-o*s)),n.signalRoundingDecimals)}function ie(t,n,o=_){if(o.noise.kind!=="uniformSymmetric")throw new Error(`Unsupported noise kind: ${o.noise.kind}`);const s=ct(`spectrum-noise:${o.ruleVersion}:${n}`),a=o.noise.amplitude;return dt(t.map(d=>ae(d+(s()*2-1)*a)),o.signalRoundingDecimals)}function Ct(t,n,o,s,a=_){const d=xt(t,n,a);if(o==="linear")return{linear:d,saturated:null,observed:[...d]};const l=re(d,a);if(o==="saturated")return{linear:d,saturated:l,observed:[...l]};const r=ie(l,s,a);return{linear:d,saturated:l,observed:r}}function St(t,n){for(const o of t.components)if(o.odorId===n)return o.percent;return 0}function ce(t,n,o){let s=0,a=0;for(const d of o){const l=St(n,d),r=St(t,d);l===r?s+=1:l>0&&r>0&&(a+=1)}return{a:s,b:a}}function le(t,n){return t.a===n&&t.b===0}function de(t,n,o=_){if(o.fitMetric.kind!=="normalizedRmse")throw new Error(`Unsupported fit metric: ${o.fitMetric.kind}`);const s=Math.min(t.length,n.length,o.channelCount);if(s===0)return 0;let a=0;for(let u=0;u<s;u+=1){const p=(t[u]??0)-(n[u]??0);a+=p*p}const d=Math.sqrt(a/s),l=o.fitMetric.rmseScale;if(!(l>0)||!Number.isFinite(d))return 0;const r=100*(1-d/l);return Number.isFinite(r)?Math.max(0,Math.min(100,Math.round(r))):0}function ue(t){const{odorIds:n,preset:o}=t;if(n.length<o.odorCount)throw new Error(`Need at least ${o.odorCount} odors for ${o.id}, got ${n.length}`);const s=n.slice(0,o.odorCount),a=[],d=new Set;for(let l=o.componentCountMin;l<=o.componentCountMax;l+=1){const r=ee(l,100,o.percentStep,o.minPercent),u=ne(s,l);for(const p of u)for(const $ of r){const f=p.map((E,L)=>({odorId:E,percent:$[L]})),g=lt(f),k=j(g);d.has(k)||(d.add(k),a.push(g))}}return a.sort((l,r)=>{const u=j(l),p=j(r);return u<p?-1:u>p?1:0}),a}function pe(t,n,o=_.ruleVersion){if(t.length===0)throw new Error("No legal mixtures to pick from");const s=ct(`spectrum-truth:${o}:${n}`),a=Math.floor(s()*t.length);return t[a]}function fe(t){const n=t.rules??_,o=w(t.difficulty),s=t.odorIds.slice(0,o.odorCount),a=ue({odorIds:t.odorIds,preset:o}),d=pe(a,t.seed,n.ruleVersion),l=Ct(d,t.signatures,o.mixingModel,t.seed,n);return{seed:t.seed,ruleVersion:n.ruleVersion,contentVersion:t.contentVersion,difficulty:t.difficulty,poolIds:s,truth:d,observedSignal:l.observed,linearSignal:l.linear,saturatedSignal:l.saturated,legalMixtureCount:a.length}}function Et(t,n=F){return`${t}|${n}`}function G(t=Date.now()){const n=ct(`spectrum-practice-${t}`),o=()=>Math.floor(n()*1e9).toString(36),s=Math.floor(Math.random()*1e9).toString(36);return`sp-${o()}-${s}`}function me(t,n=Mt){return`sd-${t}-v${n}`}function he(t=new Date){return t.toISOString().slice(0,10)}function kt(t){w(t.difficulty);const n=fe({seed:t.seed,difficulty:t.difficulty,signatures:t.signatures,odorIds:t.odorIds,contentVersion:t.contentVersion});return{meta:{seed:t.seed,mode:t.mode,difficulty:t.difficulty,ruleVersion:F,contentVersion:t.contentVersion,gameVersion:Mt,scoreKey:Et(t.difficulty),dateUTC:t.dateUTC},puzzle:n}}function ge(t){return kt({seed:t.seed??G(),mode:"practice",difficulty:t.difficulty,signatures:t.signatures,odorIds:t.odorIds,contentVersion:t.contentVersion})}function be(t){const n=t.dateUTC??he();return kt({seed:me(n),mode:"daily",difficulty:t.difficulty,signatures:t.signatures,odorIds:t.odorIds,contentVersion:t.contentVersion,dateUTC:n})}function ye(t){const n=t.ruleVersion??F,s=w(t.difficulty).maxGuesses,a=Math.max(0,Math.min(s,Math.round(t.guessesUsed))),d=Math.max(0,Math.round(t.elapsedMs)),l=Et(t.difficulty,n);if(!t.solved)return{solved:!1,guessesUsed:a,maxGuesses:s,elapsedMs:d,difficulty:t.difficulty,ruleVersion:n,scoreKey:l,guessScore:0,timeScore:0,totalScore:0};const u=5e3+Math.max(0,s-a)*1e3,p=d/1e3,$=Math.max(0,Math.round(2e3*Math.max(0,1-Math.max(0,p-30)/150)));return{solved:!0,guessesUsed:a,maxGuesses:s,elapsedMs:d,difficulty:t.difficulty,ruleVersion:n,scoreKey:l,guessScore:u,timeScore:$,totalScore:u+$}}function Se(t){const n=Math.max(0,Math.floor(t/1e3)),o=Math.floor(n/60),s=n%60;return`${o}:${String(s).padStart(2,"0")}`}function ve(t){const n=window.devicePixelRatio||1,o=t.clientWidth||640,s=t.clientHeight||240;t.width=Math.floor(o*n),t.height=Math.floor(s*n);const a=t.getContext("2d");return a?(a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,o,s),{ctx:a,w:o,h:s}):null}const v={l:52,r:14,t:18,b:40};function $e(t,n,o,s,a,d){const l=n-v.l-v.r,r=o-v.t-v.b;t.strokeStyle=d?"rgba(0,0,0,0.55)":"rgba(255,255,255,0.18)",t.fillStyle=d?"rgba(0,0,0,0.7)":"rgba(255,255,255,0.55)",t.lineWidth=1,t.beginPath(),t.moveTo(v.l,v.t),t.lineTo(v.l,v.t+r),t.lineTo(v.l+l,v.t+r),t.stroke(),t.font="11px ui-monospace, monospace",t.textAlign="center";for(let u=0;u<12;u+=1){const p=v.l+u/11*l;t.fillText(String(u),p,o-18)}t.fillText(s,v.l+l/2,o-4),t.save(),t.translate(14,v.t+r/2),t.rotate(-Math.PI/2),t.textAlign="center",t.fillText(a,0,0),t.restore()}function B(t,n){const o=ve(t);if(!o)return;const{ctx:s,w:a,h:d}=o,l=!!n.highContrast,r=a-v.l-v.r,u=d-v.t-v.b;if($e(s,a,d,n.xLabel,n.yLabel,l),n.bars){const p=r/12,$=Math.max(6,p*.55);for(let f=0;f<12;f+=1){const k=Math.max(0,Math.min(1,n.bars.values[f]??0))*u,E=v.l+f*p+(p-$)/2;s.fillStyle=n.bars.color,s.globalAlpha=.35,s.fillRect(E,v.t+u-k,$,k),s.globalAlpha=1}}if(n.residualAgainst){const{target:p,guess:$,color:f}=n.residualAgainst;s.fillStyle=f,s.globalAlpha=.22,s.beginPath();for(let g=0;g<12;g+=1){const k=v.l+g/11*r,E=v.t+u-Math.max(0,Math.min(1,p[g]??0))*u;g===0?s.moveTo(k,E):s.lineTo(k,E)}for(let g=11;g>=0;g-=1){const k=v.l+g/11*r,E=v.t+u-Math.max(0,Math.min(1,$[g]??0))*u;s.lineTo(k,E)}s.closePath(),s.fill(),s.globalAlpha=1}for(const p of n.curves){s.strokeStyle=p.color,s.lineWidth=l?2.5:2,s.beginPath();for(let $=0;$<12;$+=1){const f=v.l+$/11*r,g=v.t+u-Math.max(0,Math.min(1,p.values[$]??0))*u;$===0?s.moveTo(f,g):s.lineTo(f,g)}if(s.stroke(),n.showDots!==!1){s.fillStyle=p.color;for(let $=0;$<12;$+=1){const f=v.l+$/11*r,g=v.t+u-Math.max(0,Math.min(1,p.values[$]??0))*u;s.beginPath(),s.arc(f,g,n.reducedMotion?2.5:3.2,0,Math.PI*2),s.fill()}}}}function rt(t,n){const o=t.map((s,a)=>({v:s,i:a})).sort((s,a)=>a.v-s.v).slice(0,3).map(s=>`#${s.i}=${s.v.toFixed(2)}`);return n==="zh-Hant"?`十二通道相對反應；較高：${o.join(", ")}。連線僅為閱讀輔助，不是時間波。`:`Twelve-channel relative responses; peaks: ${o.join(", ")}. The polyline aids reading — it is not a time wave.`}const P=Ht(),it=[..._t];function Me(){try{return X(localStorage.getItem(Z))}catch{return X(null)}}function z(t){try{localStorage.setItem(Z,JSON.stringify(t))}catch{}}function Y(t,n){const o=Ut(t);return o?o.name[n]:t}function vt(t,n){return t.components.map(o=>`${Y(o.odorId,n)} ${o.percent}%`).join(" + ")}function xe(t){var ft,mt,ht,gt;const n=document.querySelector("#playArea"),o=document.querySelector("#settingsPanel"),s=document.querySelector("#modeTabs");if(!n||!o||!s)throw new Error("spectrum DOM missing");const a=n,d=o,l=s;let r=Me(),u="practice",p="easy",$=G(),f=null,g=[],k=0,E="ready",L=0,I=[],T="",N=null,U=!1;nt(r),document.querySelectorAll("[data-close]").forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.close,c=i?document.querySelector(`#${i}`):null;c==null||c.close()})}),(ft=document.querySelector("#scienceButton"))==null||ft.addEventListener("click",()=>{var e;Vt(Ot(Gt(),"spectrum")),Lt(),(e=document.querySelector("#scienceDialog"))==null||e.showModal()}),(mt=document.querySelector("#guideButton"))==null||mt.addEventListener("click",()=>{var e;It(),(e=document.querySelector("#guideDialog"))==null||e.showModal()}),(ht=document.querySelector("#a11yButton"))==null||ht.addEventListener("click",()=>{r={...r,highContrast:!r.highContrast},z(r),nt(r),et()}),window.addEventListener("keydown",e=>{e.key==="Escape"&&document.querySelectorAll("dialog[open]").forEach(i=>i.close())});function q(){return t.getCopy().spectrum}function R(){return t.getLocale()}function et(){const e=q(),i=document.querySelector("[data-sp-lead]"),c=document.querySelector("[data-sp-heading]"),m=document.querySelector("[data-sp-science]"),x=document.querySelector("[data-sp-a11y]");i&&(i.textContent=e.lead),c&&(c.textContent=e.chooseRun),m&&(m.textContent=e.science),x&&(x.textContent=r.highContrast?e.contrastOn:e.contrastOff),document.querySelectorAll("[data-sp-close]").forEach(C=>{C.textContent=e.close})}function Lt(){const e=q(),i=document.querySelector("[data-science-title]"),c=document.querySelector("[data-science-body]");i&&(i.textContent=e.scienceTitle),c&&(c.innerHTML=`<p>${e.scienceBody}</p><p class="sp-disclaimer">${Bt.modelDisclaimer[R()]}</p>`)}function It(){const e=q(),i=document.querySelector("[data-guide-title]"),c=document.querySelector("[data-guide-body]");i&&(i.textContent=e.guideTitle),c&&(c.innerHTML=`<ol class="sp-guide-list"><li>${e.guide1}</li><li>${e.guide2}</li><li>${e.guide3}</li></ol><p>${e.axisNote}</p>`)}function nt(e){document.documentElement.classList.toggle("high-contrast",e.highContrast),document.documentElement.classList.toggle("reduced-motion",e.reducedMotion),window.matchMedia("(prefers-reduced-motion: reduce)").matches&&document.documentElement.classList.add("reduced-motion")}function K(){const e=q();l.innerHTML=`
      <button type="button" role="tab" class="level-tab${u==="practice"?" active":""}" data-mode="practice" aria-selected="${u==="practice"}">${e.practice}</button>
      <button type="button" role="tab" class="level-tab${u==="daily"?" active":""}" data-mode="daily" aria-selected="${u==="daily"}">${e.daily}</button>
    `,l.querySelectorAll("[data-mode]").forEach(i=>{i.addEventListener("click",()=>{u=i.dataset.mode,K(),D(),E==="ready"&&V()})})}function D(){var c,m,x,C,y,h;const e=q(),i=r.bestByScoreKey[`${p}|${F}`]??0;d.innerHTML=`
      <h3>${e.settings}</h3>
      <label class="sp-field">${e.difficulty}
        <select id="difficultySelect" data-testid="difficulty">
          <option value="easy"${p==="easy"?" selected":""}>${e.diffEasy}</option>
          <option value="hard"${p==="hard"?" selected":""}>${e.diffHard}</option>
        </select>
      </label>
      <p class="sp-muted">${p==="easy"?e.diffEasyHint:e.diffHardHint}</p>
      ${u==="practice"?`<label class="sp-field">${e.seed}
              <input id="seedInput" data-testid="seed" type="text" value="${$}" />
            </label>
            <button type="button" class="text-button" id="randomSeed">${e.randomizeSeed}</button>`:`<p class="sp-daily-note" data-testid="daily-note">${e.dailyNote}</p>`}
      <p class="sp-best">${e.best}: <strong data-testid="best-score">${i}</strong>
        <span class="sp-muted">(${e.scoreScope})</span></p>
      <label class="sp-check">
        <input type="checkbox" id="reducedMotion" ${r.reducedMotion?"checked":""} />
        ${e.reducedMotion}
      </label>
      <button type="button" class="text-button" id="clearData">${e.clearData}</button>
      <button type="button" class="text-button" id="replayTutorialBtn">${e.replayTutorial}</button>
    `,(c=d.querySelector("#difficultySelect"))==null||c.addEventListener("change",S=>{p=S.target.value,D(),E==="ready"&&V()}),(m=d.querySelector("#seedInput"))==null||m.addEventListener("change",S=>{$=S.target.value.trim()||G()}),(x=d.querySelector("#randomSeed"))==null||x.addEventListener("click",()=>{$=G(),D()}),(C=d.querySelector("#reducedMotion"))==null||C.addEventListener("change",S=>{r={...r,reducedMotion:S.target.checked},z(r),nt(r)}),(y=d.querySelector("#clearData"))==null||y.addEventListener("click",()=>{r=X(null),z(r),D()}),(h=d.querySelector("#replayTutorialBtn"))==null||h.addEventListener("click",()=>{r={...r,tutorialSeen:!1},z(r),pt()})}function V(){var c;E="ready";const e=q(),i=w(p);a.innerHTML=`
      <div class="ready-state" data-testid="ready">
        <p>${e.readyLead}</p>
        <ul class="sp-preset-facts">
          <li>${e.factOdors}: ${i.odorCount}</li>
          <li>${e.factComponents}: ${i.componentCountMin}${i.componentCountMin!==i.componentCountMax?`–${i.componentCountMax}`:""}</li>
          <li>${e.factStep}: ${i.percentStep}%</li>
          <li>${e.factGuesses}: ${i.maxGuesses}</li>
          <li>${e.factModel}: ${i.mixingModel}</li>
        </ul>
        <button type="button" class="primary-button" id="start" data-testid="start">${u==="daily"?e.startDaily:e.startPractice}</button>
      </div>
    `,(c=a.querySelector("#start"))==null||c.addEventListener("click",ut)}function ut(){const e=document.querySelector("#seedInput");u==="practice"&&e&&($=e.value.trim()||G()),f=u==="daily"?be({difficulty:p,signatures:P,odorIds:it,contentVersion:bt}):ge({difficulty:p,signatures:P,odorIds:it,contentVersion:bt,seed:$}),r=Jt(r,f.meta.seed),z(r),g=[],N=null,U=!1,k=Date.now(),wt(f.puzzle.poolIds),r.tutorialSeen?st():pt()}function wt(e){I=(e??(f==null?void 0:f.puzzle.poolIds)??it.slice(0,w(p).odorCount)).map((c,m)=>({odorId:c,selected:m<2,percent:m===0?60:m===1?40:0})),T=""}function ot(){return I.filter(e=>e.selected&&e.percent>0).map(e=>({odorId:e.odorId,percent:e.percent}))}function Tt(){return ot().reduce((e,i)=>e+i.percent,0)}function pt(){E="tutorial",L=0,W()}function W(){var h,S,b;const e=q(),c=[{title:e.tut1Title,body:e.tut1Body,demo:"single"},{title:e.tut2Title,body:e.tut2Body,demo:"mix"},{title:e.tut3Title,body:e.tut3Body,demo:"infer"}][L];a.innerHTML=`
      <div class="tutorial-state" data-testid="tutorial" data-tutorial-step="${L}">
        <p class="sp-step-label">${e.tutorial} ${L+1}/3</p>
        <h3>${c.title}</h3>
        <p>${c.body}</p>
        <p class="sp-axis-note">${e.axisNote}</p>
        <canvas class="sp-canvas" data-tut-canvas width="640" height="220" aria-label="${e.chartAria}"></canvas>
        <p class="sr-only" data-tut-sr></p>
        <div class="sp-actions">
          <button type="button" class="text-button" id="skipTutorial" data-testid="skip-tutorial">${e.skipTutorial}</button>
          ${L>0?`<button type="button" class="ghost-button" id="tutPrev">${e.back}</button>`:""}
          <button type="button" class="primary-button" id="tutNext" data-testid="tut-next">${L<2?e.next:e.startPlay}</button>
        </div>
      </div>
    `;const m=a.querySelector("[data-tut-canvas]");let C=P.get("banana");(c.demo==="mix"||c.demo==="infer")&&(C=xt(lt([{odorId:"banana",percent:60},{odorId:"lemon",percent:40}]),P)),B(m,{bars:{values:C,color:"#6ecf8a"},curves:[{values:C,color:"#c4a35a"}],xLabel:e.xAxis,yLabel:e.yAxis,highContrast:r.highContrast,reducedMotion:r.reducedMotion});const y=a.querySelector("[data-tut-sr]");y&&(y.textContent=rt(C,R())),(h=a.querySelector("#skipTutorial"))==null||h.addEventListener("click",()=>{r={...r,tutorialSeen:!0},z(r),st()}),(S=a.querySelector("#tutPrev"))==null||S.addEventListener("click",()=>{L=Math.max(0,L-1),W()}),(b=a.querySelector("#tutNext"))==null||b.addEventListener("click",()=>{L<2?(L+=1,W()):(r={...r,tutorialSeen:!0},z(r),st())})}function st(){E="play",A()}function A(){if(!f)return;const e=q(),i=w(p),c=i.maxGuesses-g.length,m=f.puzzle.observedSignal,x=Tt(),C=ot(),h=yt(C,{minPercent:i.minPercent,percentStep:i.percentStep,componentCountMin:i.componentCountMin,componentCountMax:i.componentCountMax}).ok&&c>0,S=i.revealComponentCount?`<p class="sp-mix-count" data-testid="mix-count">${e.mixCountReveal}: <strong>${f.puzzle.truth.components.length}</strong></p>`:"";a.innerHTML=`
      <div class="play-state" data-testid="play">
        <div class="sp-status">
          <span>${e.remaining}: <strong data-testid="remaining">${c}</strong></span>
          <span>${e.seed}: <code data-testid="play-seed">${f.meta.seed}</code></span>
        </div>
        <h3>${e.targetSignal}</h3>
        <p class="sp-axis-note">${e.axisNote}</p>
        ${S}
        <canvas class="sp-canvas" id="targetCanvas" width="640" height="240" aria-label="${e.chartAria}"></canvas>
        <p class="sr-only" id="targetSr"></p>

        ${N?qt(N,e):""}

        <section class="sp-builder" aria-label="${e.builder}" data-testid="builder">
          <div class="sp-builder-head">
            <h3>${e.builder}</h3>
            <p class="sp-muted">${e.poolSelect}</p>
          </div>
          <div id="builderSlots" class="sp-pool">${At(e)}</div>
          <p class="sp-sum" data-testid="sum-line">${e.sum}: <strong data-testid="sum">${x}</strong>/100
            ${x!==100?`<span class="sp-warn">${e.sumNeed100}</span>`:""}</p>
          ${T?`<p class="sp-autofill-note" data-testid="autofill-note" role="status">${T}</p>`:""}
          <div class="sp-actions">
            <button type="button" class="ghost-button" id="autofill" data-testid="autofill">${e.autofill}</button>
            <button type="button" class="primary-button" id="submitGuess" data-testid="submit" ${h?"":"disabled"}>${e.submit}</button>
          </div>
        </section>

        <section class="sp-history" data-testid="history">
          <button type="button" class="text-button" id="toggleHistory" data-testid="toggle-history" aria-expanded="${U}">
            ${e.history} (${g.length})
          </button>
          <div class="sp-history-scroll" ${U?"":"hidden"}>
            <table class="sp-history-table">
              <thead><tr><th>#</th><th>${e.guess}</th><th>A/B</th><th>${e.signalFit}</th></tr></thead>
              <tbody>
                ${g.length===0?`<tr><td colspan="4">${e.noHistory}</td></tr>`:g.map(M=>`<tr><td>${M.index}</td><td>${vt(M.guess,R())}</td><td>${M.a}A${M.b}B</td><td>${M.fit}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `,B(a.querySelector("#targetCanvas"),{bars:{values:m,color:"#5ec4d1"},curves:[{values:m,color:"#c4a35a"}],xLabel:e.xAxis,yLabel:e.yAxis,highContrast:r.highContrast,reducedMotion:r.reducedMotion});const b=a.querySelector("#targetSr");if(b&&(b.textContent=rt(m,R())),N){const M=a.querySelector("#feedbackCanvas");M&&B(M,{curves:[{values:m,color:"#c4a35a"},{values:N.guessSignal,color:"#6ecf8a"}],residualAgainst:{target:m,guess:N.guessSignal,color:"#d17a5e"},xLabel:e.xAxis,yLabel:e.yAxis,highContrast:r.highContrast,reducedMotion:r.reducedMotion})}i.showSignatureHints&&a.querySelectorAll("[data-hint-canvas]").forEach(M=>{const H=M.dataset.hintCanvas,O=P.get(H);O&&B(M,{curves:[{values:O,color:"#8a7a5a"}],xLabel:"",yLabel:"",highContrast:r.highContrast,reducedMotion:!0,showDots:!1})}),Pt(e)}function qt(e,i){return`
      <section class="sp-feedback" data-testid="feedback" aria-live="assertive">
        <p data-testid="ab-result"><strong>${e.a}A${e.b}B</strong> · ${i.signalFit}: <strong data-testid="fit-score">${e.fit}</strong></p>
        <p class="sp-muted">${i.abBlind}</p>
        <canvas class="sp-canvas" id="feedbackCanvas" width="640" height="220" aria-label="${i.chartAria}"></canvas>
        <ul class="sp-legend">
          <li><span class="swatch" style="background:#c4a35a"></span>${i.targetCurve}</li>
          <li><span class="swatch" style="background:#6ecf8a"></span>${i.guessCurve}</li>
          <li><span class="swatch" style="background:#d17a5e"></span>${i.residual}</li>
        </ul>
      </section>
    `}function At(e){const i=w(p);return I.map((c,m)=>{const x=i.showSignatureHints?`<canvas class="sp-hint-canvas" data-hint-canvas="${c.odorId}" width="200" height="48" aria-label="${e.signatureHint}"></canvas>`:"";return`
          <div class="sp-pool-row${c.selected?" is-on":""}" data-row="${m}">
            <label class="sp-check">
              <input type="checkbox" data-sel="${m}" data-testid="sel-${c.odorId}" ${c.selected?"checked":""} />
              <span>${Y(c.odorId,R())}</span>
            </label>
            ${x}
            <div class="sp-stepper" ${c.selected?"":"hidden"}>
              <button type="button" data-dec="${m}" aria-label="-">−</button>
              <input type="range" data-range="${m}" data-testid="range-${c.odorId}" min="${i.minPercent}" max="100" step="${i.percentStep}" value="${Math.max(c.percent,i.minPercent)}" />
              <input type="number" data-num="${m}" data-testid="percent-${c.odorId}" min="${i.minPercent}" max="100" step="${i.percentStep}" value="${c.percent}" />
              <button type="button" data-inc="${m}" aria-label="+">+</button>
            </div>
          </div>
        `}).join("")}function Pt(e){var m,x,C;const i=w(p);(m=a.querySelector("#toggleHistory"))==null||m.addEventListener("click",()=>{U=!U,A()}),(x=a.querySelector("#autofill"))==null||x.addEventListener("click",()=>{const y=I.filter(M=>M.selected);if(y.length===0){T=e.autofillFail,A();return}const h=y[y.length-1],b=100-y.filter(M=>M.odorId!==h.odorId).reduce((M,H)=>M+H.percent,0);if(b<i.minPercent||b%i.percentStep!==0||b>100)T=e.autofillFail;else{const M=h.percent;h.percent=b,T=e.autofillOk.replace("{odor}",Y(h.odorId,R())).replace("{from}",String(M)).replace("{to}",String(b))}A()}),(C=a.querySelector("#submitGuess"))==null||C.addEventListener("click",zt),a.querySelectorAll("[data-sel]").forEach(y=>{y.addEventListener("change",h=>{const S=Number(h.target.dataset.sel),b=h.target.checked;I[S].selected=b,b&&I[S].percent<i.minPercent&&(I[S].percent=i.minPercent),b||(I[S].percent=0),T="",A()})});const c=(y,h)=>{const S=i.percentStep;let b=Math.round(h/S)*S;b=Math.max(i.minPercent,Math.min(100,b)),I[y].percent=b,I[y].selected=!0,T="",A()};a.querySelectorAll("[data-inc]").forEach(y=>{y.addEventListener("click",()=>{const h=Number(y.dataset.inc);c(h,I[h].percent+i.percentStep)})}),a.querySelectorAll("[data-dec]").forEach(y=>{y.addEventListener("click",()=>{const h=Number(y.dataset.dec);c(h,I[h].percent-i.percentStep)})}),a.querySelectorAll("[data-range]").forEach(y=>{y.addEventListener("change",h=>{const S=Number(h.target.dataset.range);c(S,Number(h.target.value))})}),a.querySelectorAll("[data-num]").forEach(y=>{y.addEventListener("change",h=>{const S=Number(h.target.dataset.num);c(S,Number(h.target.value))})})}function zt(){if(!f)return;const e=w(p);if(g.length>=e.maxGuesses)return;const i=ot(),c=yt(i,{minPercent:e.minPercent,percentStep:e.percentStep,componentCountMin:e.componentCountMin,componentCountMax:e.componentCountMax});if(!c.ok)return;const m=c.canonical,x=ce(m,f.puzzle.truth,f.puzzle.poolIds),C=Ct(m,P,e.mixingModel,f.meta.seed),y=de(f.puzzle.observedSignal,C.observed),h={index:g.length+1,guess:m,a:x.a,b:x.b,fit:y,guessSignal:C.observed};g=[...g,h],N=h,T="";const S=te(m,f.puzzle.truth)||le(x,f.puzzle.poolIds.length);if(S||g.length>=e.maxGuesses){Nt(S);return}A()}function Nt(e){if(!f)return;E="result";const i=Date.now()-k,c=ye({solved:e,guessesUsed:g.length,difficulty:p,elapsedMs:i});r=Yt(r,c.scoreKey,c.totalScore),z(r),Rt(e,c)}function Rt(e,i){var h,S;if(!f)return;const c=q(),m=w(p),x=f.puzzle.truth,C=R(),y=x.components.map(b=>{const M=P.get(b.odorId),H=b.percent/100,O=M.map(J=>J*H);return`
          <div class="sp-contrib">
            <h4>${Y(b.odorId,C)} · ${b.percent}%</h4>
            <canvas class="sp-canvas sp-canvas-sm" data-contrib="${b.odorId}" width="640" height="160"></canvas>
            <p class="sr-only">${rt(O,C)}</p>
          </div>
        `}).join("");if(a.innerHTML=`
      <div class="result-state" data-testid="result" data-solved="${e}">
        <h3 data-testid="result-title">${e?c.solved:c.failed}</h3>
        <p>${c.truth}: <strong data-testid="truth">${vt(x,C)}</strong></p>
        <div class="sp-score-grid">
          <div>${c.guessScore}: <strong data-testid="guess-score">${i.guessScore}</strong></div>
          <div>${c.timeScore}: <strong data-testid="time-score">${i.timeScore}</strong></div>
          <div>${c.totalScore}: <strong data-testid="total-score">${i.totalScore}</strong></div>
          <div>${c.elapsed}: <strong data-testid="elapsed">${Se(i.elapsedMs)}</strong></div>
          <div>${c.guessesUsed}: <strong>${i.guessesUsed}/${i.maxGuesses}</strong></div>
          <div>${c.best}: <strong>${r.bestByScoreKey[i.scoreKey]??0}</strong></div>
        </div>
        <p class="sp-muted">${c.scoreScope}</p>
        ${m.mixingModel==="linear"?`<h4>${c.channelContribution}</h4>${y}`:`<h4>${c.satCompare}</h4>
               <canvas class="sp-canvas" id="satCanvas" width="640" height="220"></canvas>
               <ul class="sp-legend">
                 <li><span class="swatch" style="background:#6ecf8a"></span>${c.linear}</li>
                 <li><span class="swatch" style="background:#5ec4d1"></span>${c.saturated}</li>
                 <li><span class="swatch" style="background:#c4a35a"></span>${c.observed}</li>
               </ul>
               ${m.mixingModel==="saturatedNoisy"?`<p class="sp-disclaimer" data-testid="noise-disclaimer">${c.noiseDisclaimer}</p>`:""}`}
        <div class="sp-actions">
          <button type="button" class="primary-button" id="again" data-testid="again">${c.playAgain}</button>
          <button type="button" class="ghost-button" id="toSetup" data-testid="to-setup">${c.backSetup}</button>
        </div>
      </div>
    `,m.mixingModel==="linear")a.querySelectorAll("[data-contrib]").forEach(b=>{const M=b.dataset.contrib,H=x.components.find(at=>at.odorId===M),J=P.get(M).map(at=>at*(H.percent/100));B(b,{bars:{values:J,color:"#6ecf8a"},curves:[{values:J,color:"#c4a35a"}],xLabel:c.xAxis,yLabel:c.yAxis,highContrast:r.highContrast,reducedMotion:r.reducedMotion})});else{const b=a.querySelector("#satCanvas");b&&B(b,{curves:[{values:f.puzzle.linearSignal,color:"#6ecf8a"},{values:f.puzzle.saturatedSignal??f.puzzle.linearSignal,color:"#5ec4d1"},{values:f.puzzle.observedSignal,color:"#c4a35a"}],xLabel:c.xAxis,yLabel:c.yAxis,highContrast:r.highContrast,reducedMotion:r.reducedMotion})}(h=a.querySelector("#again"))==null||h.addEventListener("click",()=>{ut()}),(S=a.querySelector("#toSetup"))==null||S.addEventListener("click",()=>{f=null,K(),D(),V()})}function Dt(){et(),E==="ready"?(K(),D(),V()):E==="tutorial"?W():E==="play"&&A()}et(),K(),D(),V(),(gt=t.onReady)==null||gt.call(t,{refreshReady:Dt})}const tt=document.querySelector("#app");if(!tt)throw new Error("#app missing");const Ce=jt(Ft());let Q;const $t=Kt(tt,{homeHref:"../../index.html",actionsHtml:`
    <button class="ghost-button compact-label" id="guideButton" type="button">
      <span>?</span> ${Ce.spectrumShell.guide}
    </button>`,onLocaleChange:(t,n)=>{const o=tt.querySelector("#guideButton");o&&(o.innerHTML=`<span>?</span> ${n.spectrumShell.guide}`);try{const s=X(localStorage.getItem(Z));localStorage.setItem(Z,JSON.stringify({...s,locale:t}))}catch{}Q==null||Q()}}),Ee=Wt(tt);Ee.innerHTML=`
  <section class="sp-intro-banner" aria-labelledby="sp-title">
    <div class="eyebrow"><span></span> GAME 03</div>
    <h1 id="sp-title">Scent <em>Spectrum</em></h1>
    <p data-sp-lead></p>
  </section>
  <section class="sp-lab" aria-label="Scent Spectrum">
    <div class="sp-lab-header">
      <div>
        <span class="section-label">混香解碼局</span>
        <h2 data-sp-heading></h2>
      </div>
      <div class="sp-lab-actions">
        <button class="text-button" id="scienceButton" type="button" data-sp-science></button>
        <button class="text-button" id="a11yButton" type="button" data-sp-a11y></button>
      </div>
    </div>
    <div class="level-tabs" id="modeTabs" role="tablist"></div>
    <div class="sp-card">
      <aside class="sp-panel" id="settingsPanel"></aside>
      <section class="sp-play" id="playArea" aria-live="polite"></section>
    </div>
  </section>
  <dialog id="scienceDialog" class="modal guide-modal">
    <div class="modal-header">
      <div>
        <span class="section-label">~30 SEC</span>
        <h2 data-science-title></h2>
      </div>
      <button class="close-button" data-close="scienceDialog" type="button" aria-label="Close">×</button>
    </div>
    <div data-science-body></div>
    <button class="primary-button full-button" data-close="scienceDialog" type="button" data-sp-close></button>
  </dialog>
  <dialog id="guideDialog" class="modal guide-modal">
    <div class="modal-header">
      <div>
        <span class="section-label">GUIDE</span>
        <h2 data-guide-title></h2>
      </div>
      <button class="close-button" data-close="guideDialog" type="button" aria-label="Close">×</button>
    </div>
    <div data-guide-body></div>
    <button class="primary-button full-button" data-close="guideDialog" type="button" data-sp-close></button>
  </dialog>
`;xe({getCopy:()=>$t.getCopy(),getLocale:()=>$t.getLocale(),onReady:t=>{Q=t.refreshReady}});
