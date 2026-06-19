const chartConfig = {
  responsive: true,
  displayModeBar: false
};

const baseLayout = {
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  font: {
    family: 'Inter, "PingFang SC", "Microsoft YaHei", Arial, sans-serif',
    color: "#17202a"
  },
  margin: { t: 36, r: 20, b: 56, l: 58 },
  hoverlabel: {
    bgcolor: "#ffffff",
    bordercolor: "#d9e2ea",
    font: { color: "#17202a" }
  }
};

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

function plot(target, traces, layout) {
  if (!window.Plotly || !target) return;
  window.Plotly.react(target, traces, { ...baseLayout, ...layout }, chartConfig);
}

function currencyTick(value) {
  return `$${Number(value).toLocaleString()}`;
}

async function renderEnpakCharts() {
  const market = await loadJson("public/data/enpak-market.json");
  const forecast = await loadJson("public/data/enpak-forecast.json");

  plot(
    document.querySelector('[data-chart="enpak-market"]'),
    [
      {
        type: "bar",
        x: market.map((d) => d.borough),
        y: market.map((d) => d.business_density),
        marker: { color: "#167a7f" },
        customdata: market.map((d) => [d.population_density, d.median_income, d.education_share]),
        hovertemplate:
          "<b>%{x}</b><br>Business density: %{y:.2f}/km²<br>Population density: %{customdata[0]:,.0f}/km²<br>Median income: $%{customdata[1]:,.0f}<br>Bachelor+: %{customdata[2]:.1f}%<extra></extra>"
      }
    ],
    {
      title: { text: "NYC borough 商业密度对比", x: 0, xanchor: "left" },
      yaxis: { title: "Weighted business density / km²", gridcolor: "#e7edf3" },
      xaxis: { tickangle: -18 }
    }
  );

  plot(
    document.querySelector('[data-chart="enpak-forecast"]'),
    [
      {
        type: "scatter",
        mode: "lines",
        x: forecast.map((d) => d.month),
        y: forecast.map((d) => d.upper),
        line: { width: 0 },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        type: "scatter",
        mode: "lines",
        x: forecast.map((d) => d.month),
        y: forecast.map((d) => d.lower),
        fill: "tonexty",
        fillcolor: "rgba(22, 122, 127, 0.14)",
        line: { width: 0 },
        name: "Forecast interval",
        hoverinfo: "skip"
      },
      {
        type: "scatter",
        mode: "lines+markers",
        x: forecast.map((d) => d.month),
        y: forecast.map((d) => d.forecast),
        name: "Forecast",
        line: { color: "#235b9f", width: 3 },
        marker: { size: 7 },
        hovertemplate: "<b>%{x}</b><br>Forecast events: %{y:.1f}<extra></extra>"
      }
    ],
    {
      title: { text: "SARIMA 12 个月活动趋势预测", x: 0, xanchor: "left" },
      yaxis: { title: "Events", gridcolor: "#e7edf3" },
      xaxis: { tickangle: -30 }
    }
  );
}

async function renderCreditCharts() {
  const bands = await loadJson("public/data/credit-score-bands.json");
  const importance = await loadJson("public/data/credit-feature-importance.json");

  plot(
    document.querySelector('[data-chart="credit-score-bands"]'),
    [
      {
        type: "bar",
        x: bands.map((d) => d.risk_band),
        y: bands.map((d) => d.bad_rate * 100),
        marker: { color: "#167a7f" },
        customdata: bands.map((d) => [d.capture_rate * 100, d.lift]),
        hovertemplate:
          "<b>%{x}</b><br>Bad rate: %{y:.2f}%<br>Capture rate: %{customdata[0]:.2f}%<br>Lift: %{customdata[1]:.2f}x<extra></extra>"
      }
    ],
    {
      title: { text: "Holdout 风险分层坏账率", x: 0, xanchor: "left" },
      yaxis: { title: "Bad rate (%)", gridcolor: "#e7edf3" },
      xaxis: { tickangle: -35 }
    }
  );

  const top = [...importance].reverse();
  plot(
    document.querySelector('[data-chart="credit-feature-importance"]'),
    [
      {
        type: "bar",
        orientation: "h",
        x: top.map((d) => d.importance),
        y: top.map((d) => d.feature),
        marker: { color: "#235b9f" },
        hovertemplate: "<b>%{y}</b><br>Importance: %{x}<extra></extra>"
      }
    ],
    {
      title: { text: "Top 15 特征重要性", x: 0, xanchor: "left" },
      xaxis: { title: "Importance", gridcolor: "#e7edf3" },
      yaxis: { automargin: true },
      margin: { t: 36, r: 20, b: 46, l: 150 }
    }
  );
}

async function renderUnicefCharts() {
  const distribution = await loadJson("public/data/unicef-donation-distribution.json");
  const performance = await loadJson("public/data/unicef-channel-performance.json");

  plot(
    document.querySelector('[data-chart="unicef-donation-distribution"]'),
    [
      {
        type: "bar",
        x: distribution.map((d) => d.bucket),
        y: distribution.map((d) => d.count),
        marker: { color: "#167a7f" },
        hovertemplate: "<b>AUD %{x}</b><br>Sessions: %{y:,}<extra></extra>"
      }
    ],
    {
      title: { text: "捐赠金额分布（聚合展示）", x: 0, xanchor: "left" },
      xaxis: { title: "Donation amount bucket" },
      yaxis: { title: "Sessions", gridcolor: "#e7edf3" }
    }
  );

  plot(
    document.querySelector('[data-chart="unicef-channel-performance"]'),
    [
      {
        type: "bar",
        x: performance.map((d) => d.segment),
        y: performance.map((d) => d.mean_revenue),
        marker: { color: performance.map((d) => (d.type === "Device" ? "#235b9f" : d.type === "Traffic" ? "#167a7f" : "#357a38")) },
        customdata: performance.map((d) => d.type),
        hovertemplate: "<b>%{x}</b><br>Type: %{customdata}<br>Mean revenue: AUD %{y:.1f}<extra></extra>"
      }
    ],
    {
      title: { text: "渠道/页面/设备平均捐赠表现", x: 0, xanchor: "left" },
      yaxis: { title: "Mean revenue (AUD)", gridcolor: "#e7edf3" },
      xaxis: { tickangle: -28 }
    }
  );
}

async function renderAedcCharts() {
  const scatter = await loadJson("public/data/aedc-seifa-dv2.json");
  const top = await loadJson("public/data/aedc-top-dv2.json");

  plot(
    document.querySelector('[data-chart="aedc-seifa-dv2"]'),
    [
      {
        type: "scatter",
        mode: "markers",
        x: scatter.map((d) => d.irsd),
        y: scatter.map((d) => d.dv2),
        text: scatter.map((d) => d.lga),
        marker: {
          size: scatter.map((d) => (d.dv2 >= 30 ? 11 : 7)),
          color: scatter.map((d) => d.dv2),
          colorscale: "Tealgrn",
          reversescale: false,
          colorbar: { title: "DV2 %" },
          opacity: 0.78,
          line: { color: "#ffffff", width: 0.6 }
        },
        hovertemplate: "<b>%{text}</b><br>IRSD: %{x:.0f}<br>DV2: %{y:.1f}%<extra></extra>"
      }
    ],
    {
      title: { text: "SEIFA IRSD 与 DV2 关系", x: 0, xanchor: "left" },
      xaxis: { title: "IRSD score (lower = more disadvantaged)", gridcolor: "#e7edf3" },
      yaxis: { title: "DV2 (%)", gridcolor: "#e7edf3" }
    }
  );

  const bars = [...top].reverse();
  plot(
    document.querySelector('[data-chart="aedc-top-dv2"]'),
    [
      {
        type: "bar",
        orientation: "h",
        x: bars.map((d) => d.dv2),
        y: bars.map((d) => d.lga),
        marker: { color: "#167a7f" },
        customdata: bars.map((d) => d.irsd),
        hovertemplate: "<b>%{y}</b><br>DV2: %{x:.1f}%<br>IRSD: %{customdata:.0f}<extra></extra>"
      }
    ],
    {
      title: { text: "Top 20 DV2 LGAs", x: 0, xanchor: "left" },
      xaxis: { title: "DV2 (%)", gridcolor: "#e7edf3" },
      yaxis: { automargin: true },
      margin: { t: 36, r: 20, b: 46, l: 180 }
    }
  );
}

export async function renderProjectCharts(projectId) {
  const renderers = {
    enpak: renderEnpakCharts,
    credit: renderCreditCharts,
    unicef: renderUnicefCharts,
    aedc: renderAedcCharts
  };

  const renderer = renderers[projectId];
  if (!renderer) return;

  try {
    await renderer();
  } catch (error) {
    const panel = document.querySelector("#active-case-study .case-charts");
    if (panel) {
      panel.insertAdjacentHTML("beforeend", `<p class="chart-error">图表加载失败：${error.message}</p>`);
    }
    console.error(error);
  }
}
