/** Canvas helpers for Scent Spectrum (channel index ≠ time). */

export type ChartSeries = {
  values: readonly number[];
  color: string;
  fill?: string;
};

function setupCanvas(canvas: HTMLCanvasElement): {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
} | null {
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 640;
  const cssH = canvas.clientHeight || 240;
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  return { ctx, w: cssW, h: cssH };
}

const PAD = { l: 52, r: 14, t: 18, b: 40 };

function drawAxes(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  xLabel: string,
  yLabel: string,
  highContrast: boolean,
): void {
  const plotW = w - PAD.l - PAD.r;
  const plotH = h - PAD.t - PAD.b;
  ctx.strokeStyle = highContrast ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.18)';
  ctx.fillStyle = highContrast ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD.l, PAD.t);
  ctx.lineTo(PAD.l, PAD.t + plotH);
  ctx.lineTo(PAD.l + plotW, PAD.t + plotH);
  ctx.stroke();

  ctx.font = '11px ui-monospace, monospace';
  ctx.textAlign = 'center';
  for (let j = 0; j < 12; j += 1) {
    const x = PAD.l + (j / 11) * plotW;
    ctx.fillText(String(j), x, h - 18);
  }
  ctx.fillText(xLabel, PAD.l + plotW / 2, h - 4);

  ctx.save();
  ctx.translate(14, PAD.t + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText(yLabel, 0, 0);
  ctx.restore();
}

export function drawChannelChart(
  canvas: HTMLCanvasElement,
  options: {
    bars?: ChartSeries;
    curves: ChartSeries[];
    residualAgainst?: { target: readonly number[]; guess: readonly number[]; color: string };
    xLabel: string;
    yLabel: string;
    highContrast?: boolean;
    reducedMotion?: boolean;
    showDots?: boolean;
  },
): void {
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, w, h } = setup;
  const hc = Boolean(options.highContrast);
  const plotW = w - PAD.l - PAD.r;
  const plotH = h - PAD.t - PAD.b;

  drawAxes(ctx, w, h, options.xLabel, options.yLabel, hc);

  if (options.bars) {
    const groupW = plotW / 12;
    const barW = Math.max(6, groupW * 0.55);
    for (let j = 0; j < 12; j += 1) {
      const v = Math.max(0, Math.min(1, options.bars.values[j] ?? 0));
      const bh = v * plotH;
      const x = PAD.l + j * groupW + (groupW - barW) / 2;
      ctx.fillStyle = options.bars.color;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(x, PAD.t + plotH - bh, barW, bh);
      ctx.globalAlpha = 1;
    }
  }

  if (options.residualAgainst) {
    const { target, guess, color } = options.residualAgainst;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.22;
    ctx.beginPath();
    for (let j = 0; j < 12; j += 1) {
      const x = PAD.l + (j / 11) * plotW;
      const y = PAD.t + plotH - Math.max(0, Math.min(1, target[j] ?? 0)) * plotH;
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    for (let j = 11; j >= 0; j -= 1) {
      const x = PAD.l + (j / 11) * plotW;
      const y = PAD.t + plotH - Math.max(0, Math.min(1, guess[j] ?? 0)) * plotH;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  for (const series of options.curves) {
    ctx.strokeStyle = series.color;
    ctx.lineWidth = hc ? 2.5 : 2;
    ctx.beginPath();
    for (let j = 0; j < 12; j += 1) {
      const x = PAD.l + (j / 11) * plotW;
      const y = PAD.t + plotH - Math.max(0, Math.min(1, series.values[j] ?? 0)) * plotH;
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    if (options.showDots !== false) {
      ctx.fillStyle = series.color;
      for (let j = 0; j < 12; j += 1) {
        const x = PAD.l + (j / 11) * plotW;
        const y = PAD.t + plotH - Math.max(0, Math.min(1, series.values[j] ?? 0)) * plotH;
        ctx.beginPath();
        ctx.arc(x, y, options.reducedMotion ? 2.5 : 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

export function drawSignatureHint(
  canvas: HTMLCanvasElement,
  values: readonly number[],
  highContrast = false,
): void {
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 280;
  const cssH = canvas.clientHeight || 72;
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  const pad = { l: 4, r: 4, t: 6, b: 14 };
  const plotW = cssW - pad.l - pad.r;
  const plotH = cssH - pad.t - pad.b;
  const n = 12;
  const gap = 2;
  const barW = Math.max(4, (plotW - gap * (n - 1)) / n);
  const color = highContrast ? '#111' : '#c4a35a';
  const muted = highContrast ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.28)';

  ctx.strokeStyle = muted;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.l, pad.t + plotH);
  ctx.lineTo(pad.l + plotW, pad.t + plotH);
  ctx.stroke();

  for (let j = 0; j < n; j += 1) {
    const v = Math.max(0, Math.min(1, values[j] ?? 0));
    const h = Math.max(1, v * plotH);
    const x = pad.l + j * (barW + gap);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.35 + v * 0.65;
    ctx.fillRect(x, pad.t + plotH - h, barW, h);
    ctx.globalAlpha = 1;
    ctx.fillStyle = muted;
    ctx.font = '9px ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(String(j), x + barW / 2, cssH - 2);
  }

  // Peak markers for the top 2 channels
  const ranked = values
    .map((v, i) => ({ v, i }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 2);
  ctx.fillStyle = highContrast ? '#000' : '#ffe9a8';
  ctx.font = 'bold 10px ui-monospace, monospace';
  for (const p of ranked) {
    const x = pad.l + p.i * (barW + gap) + barW / 2;
    const y = pad.t + plotH - Math.max(0, Math.min(1, p.v)) * plotH - 2;
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function channelSummaryText(
  values: readonly number[],
  locale: 'zh-Hant' | 'en',
): string {
  const peaks = values
    .map((v, i) => ({ v, i }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 3)
    .map((p) => `#${p.i}=${p.v.toFixed(2)}`);
  if (locale === 'zh-Hant') {
    return `\u5341\u4e8c\u901a\u9053\u76f8\u5c0d\u53cd\u61c9\uff1b\u8f03\u9ad8\uff1a${peaks.join(', ')}\u3002\u9023\u7dda\u50c5\u70ba\u95b1\u8b80\u8f14\u52a9\uff0c\u4e0d\u662f\u6642\u9593\u6ce2\u3002`;
  }
  return `Twelve-channel relative responses; peaks: ${peaks.join(', ')}. The polyline aids reading — it is not a time wave.`;
}
