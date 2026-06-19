# Interactive Portfolio Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio so projects are shown as clear switchable columns/cards and project charts are Plotly interactive charts instead of report screenshots.

**Architecture:** Keep the current static site. Add public aggregate JSON files, add `src/charts.js` for Plotly rendering, update `src/app.js` to show one active project detail at a time, and remove AEDC PDF page screenshots from displayed data.

**Tech Stack:** Vanilla JavaScript, Plotly.js CDN, static JSON, existing Python/CSV extraction scripts, Node content checks.

---

## File Structure

- Modify `index.html`: add Plotly CDN before module script.
- Modify `src/data.js`: replace static chart image metadata with `interactiveCharts` metadata.
- Modify `src/app.js`: add active project state, clickable project cards, and a single active project detail panel.
- Create `src/charts.js`: render Plotly charts for each project id.
- Modify `src/styles.css`: add project switcher, active card, chart container styles.
- Create `public/data/*.json`: aggregate data for interactive charts.
- Modify `scripts/verify-content.mjs`: verify data files and Plotly containers.

## Task 1: Create Aggregate Data JSON

**Files:**
- Create: `public/data/enpak-market.json`
- Create: `public/data/enpak-forecast.json`
- Create: `public/data/credit-score-bands.json`
- Create: `public/data/credit-feature-importance.json`
- Create: `public/data/unicef-donation-distribution.json`
- Create: `public/data/unicef-channel-performance.json`
- Create: `public/data/aedc-seifa-dv2.json`
- Create: `public/data/aedc-top-dv2.json`

- [ ] **Step 1: Generate credit JSON from existing CSV**

Run this command from repo root:

```bash
mkdir -p public/data
python3 - <<'PY'
import csv, json
from pathlib import Path

base = Path('/Users/yyaoi001/Documents/Codex/2026-06-19/6-69-ai-hr-https-v/tmp/credit_project/第六阶段_最终交付物/04_输出结果/final_project_outputs')

with (base / 'score_band_analysis.csv').open() as f:
    rows = [r for r in csv.DictReader(f) if r['split'] == 'holdout']
for r in rows:
    for k in ['bad_rate', 'capture_rate', 'lift']:
        r[k] = round(float(r[k]), 4)
Path('public/data/credit-score-bands.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2))

with (base / 'final_feature_importance.csv').open() as f:
    rows = list(csv.DictReader(f))[:15]
for r in rows:
    r['importance'] = int(float(r['importance']))
Path('public/data/credit-feature-importance.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2))
PY
```

Expected: two credit JSON files exist in `public/data/`.

- [ ] **Step 2: Generate AEDC JSON from processed CSV**

Run:

```bash
python3 - <<'PY'
import csv, json, math
from pathlib import Path

src = Path('/Users/yyaoi001/Desktop/6860/6860ass2/proceed/aedc_2021_with_seifa_clean.csv')
rows = []
with src.open() as f:
    for r in csv.DictReader(f):
        name = r.get('lga_name') or r.get('LGA_NAME') or r.get('lga_name_2021') or ''
        dv2 = r.get('dv2_pct') or r.get('DV2_pct') or r.get('dv2_percent') or r.get('DV2') or ''
        irsd = r.get('irsd_score') or r.get('IRSD_score') or ''
        if not name or not dv2 or not irsd:
            continue
        try:
            item = {'lga': name, 'dv2': float(dv2), 'irsd': float(irsd)}
        except ValueError:
            continue
        if math.isfinite(item['dv2']) and math.isfinite(item['irsd']):
            rows.append(item)

rows = sorted(rows, key=lambda x: x['dv2'], reverse=True)
Path('public/data/aedc-seifa-dv2.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2))
Path('public/data/aedc-top-dv2.json').write_text(json.dumps(rows[:20], ensure_ascii=False, indent=2))
print(len(rows), rows[:3])
PY
```

Expected: two AEDC JSON files exist and output count is greater than 100.

- [ ] **Step 3: Create Enpak aggregate JSON manually from deck values**

Create `public/data/enpak-market.json`:

```json
[
  {"borough":"Bronx","business_density":80.94,"population_density":12339,"median_income":49000,"education_share":27.7},
  {"borough":"Brooklyn","business_density":98.52,"population_density":15172,"median_income":69727,"education_share":40.5},
  {"borough":"Manhattan","business_density":400.93,"population_density":29729,"median_income":99880,"education_share":66.5},
  {"borough":"Queens","business_density":36.38,"population_density":8243,"median_income":74737,"education_share":35.3},
  {"borough":"Staten Island","business_density":23.48,"population_density":3277,"median_income":96787,"education_share":34.8}
]
```

Create `public/data/enpak-forecast.json`:

```json
[
  {"month":"2026-02","forecast":309.7,"lower":132.3,"upper":487.1},
  {"month":"2026-03","forecast":404.5,"lower":196.1,"upper":612.9},
  {"month":"2026-04","forecast":361.1,"lower":125.7,"upper":596.5},
  {"month":"2026-05","forecast":451.9,"lower":192.3,"upper":711.6},
  {"month":"2026-06","forecast":431.5,"lower":149.8,"upper":713.3},
  {"month":"2026-07","forecast":395.0,"lower":92.7,"upper":697.3},
  {"month":"2026-08","forecast":390.8,"lower":69.3,"upper":712.3},
  {"month":"2026-09","forecast":343.7,"lower":4.0,"upper":683.3},
  {"month":"2026-10","forecast":377.3,"lower":20.5,"upper":734.2},
  {"month":"2026-11","forecast":326.1,"lower":-47.2,"upper":699.3},
  {"month":"2026-12","forecast":324.6,"lower":-64.4,"upper":713.5},
  {"month":"2027-01","forecast":330.5,"lower":-73.6,"upper":734.6}
]
```

- [ ] **Step 4: Create UNICEF aggregate JSON from report-level values**

Create `public/data/unicef-donation-distribution.json`:

```json
[
  {"bucket":"0-25","count":16000},
  {"bucket":"25-50","count":14500},
  {"bucket":"50-100","count":17000},
  {"bucket":"100-200","count":8500},
  {"bucket":"200-500","count":4200},
  {"bucket":"500+","count":2391}
]
```

Create `public/data/unicef-channel-performance.json`:

```json
[
  {"segment":"Tax pages","mean_revenue":128,"type":"Page theme"},
  {"segment":"Emergency pages","mean_revenue":64,"type":"Page theme"},
  {"segment":"Email","mean_revenue":118,"type":"Traffic"},
  {"segment":"QR traffic","mean_revenue":110,"type":"Traffic"},
  {"segment":"Paid search","mean_revenue":76,"type":"Traffic"},
  {"segment":"Mobile","mean_revenue":67.7,"type":"Device"},
  {"segment":"Desktop","mean_revenue":116.7,"type":"Device"},
  {"segment":"Tablet","mean_revenue":116.7,"type":"Device"}
]
```

- [ ] **Step 5: Verify JSON parse**

Run:

```bash
node -e "for (const f of ['enpak-market','enpak-forecast','credit-score-bands','credit-feature-importance','unicef-donation-distribution','unicef-channel-performance','aedc-seifa-dv2','aedc-top-dv2']) JSON.parse(require('fs').readFileSync('public/data/'+f+'.json','utf8')); console.log('json ok')"
```

Expected: `json ok`.

- [ ] **Step 6: Commit**

Run:

```bash
git add public/data
git commit -m "data: add aggregate chart datasets"
```

## Task 2: Add Plotly Chart Renderer

**Files:**
- Modify: `index.html`
- Create: `src/charts.js`

- [ ] **Step 1: Add Plotly CDN to `index.html`**

Insert before `src/app.js`:

```html
<script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>
```

- [ ] **Step 2: Create `src/charts.js`**

Create functions:

- `renderProjectCharts(projectId)`
- `renderEnpakCharts()`
- `renderCreditCharts()`
- `renderUnicefCharts()`
- `renderAedcCharts()`

Each function fetches JSON from `public/data/*.json`, renders into `.plotly-chart[data-chart="..."]`, and uses responsive layout.

- [ ] **Step 3: Verify syntax**

Run:

```bash
node --check src/charts.js
```

Expected: no syntax errors.

- [ ] **Step 4: Commit**

Run:

```bash
git add index.html src/charts.js
git commit -m "feat: add interactive chart renderer"
```

## Task 3: Refactor Project Display To Active Panel

**Files:**
- Modify: `src/data.js`
- Modify: `src/app.js`
- Modify: `src/styles.css`

- [ ] **Step 1: Update data model**

Replace each project's `charts` image list with `interactiveCharts`, for example:

```js
interactiveCharts: [
  { id: "enpak-market", title: "NYC borough 市场指标对比" },
  { id: "enpak-forecast", title: "SARIMA 12 个月活动趋势预测" }
]
```

Use two chart IDs for each project:

- Enpak: `enpak-market`, `enpak-forecast`
- Credit: `credit-score-bands`, `credit-feature-importance`
- UNICEF: `unicef-donation-distribution`, `unicef-channel-performance`
- AEDC: `aedc-seifa-dv2`, `aedc-top-dv2`

- [ ] **Step 2: Update `src/app.js` rendering**

Implement:

- `let activeProjectId = "enpak";`
- Project cards as buttons/cards with `data-project-id`.
- One `#active-case-study` panel.
- On card click, update active state, re-render active detail, call `renderProjectCharts(activeProjectId)`.

- [ ] **Step 3: Remove old static chart gallery**

Remove image chart rendering and the AEDC screenshot references from UI.

- [ ] **Step 4: Update CSS**

Add:

- `.project-card.active`
- `.project-card button` reset or make entire card a button
- `.active-case-panel`
- `.interactive-chart-grid`
- `.plotly-chart`

- [ ] **Step 5: Verify syntax and check**

Run:

```bash
npm run check
node --check src/app.js
node --check src/data.js
```

Expected: content check passes and no syntax errors.

- [ ] **Step 6: Commit**

Run:

```bash
git add src/data.js src/app.js src/styles.css scripts/verify-content.mjs
git commit -m "feat: switch projects with interactive detail panel"
```

## Task 4: Update Content Check And Browser Verification

**Files:**
- Modify: `scripts/verify-content.mjs`

- [ ] **Step 1: Update content check**

Check:

- 4 projects exist.
- each project has at least one `interactiveCharts` item.
- all 8 `public/data/*.json` files exist.
- old AEDC screenshot filenames are not referenced in `src/data.js`.
- `index.html` includes Plotly CDN.

- [ ] **Step 2: Run checks**

Run:

```bash
npm run check
node --check src/app.js
node --check src/data.js
node --check src/charts.js
```

Expected: all pass.

- [ ] **Step 3: Browser check**

Open `http://127.0.0.1:4173`.

Verify:

- Enpak is active by default.
- Clicking each project card changes the detail panel.
- AEDC shows interactive charts, not PDF screenshots.
- Console has no errors.
- No horizontal overflow.

- [ ] **Step 4: Commit**

Run:

```bash
git add scripts/verify-content.mjs
git commit -m "test: verify interactive portfolio structure"
```

If `scripts/verify-content.mjs` was already committed in Task 3, skip this commit.

## Self-Review

Spec coverage:

- Project four-card/column entry: Task 3.
- One active detail panel: Task 3.
- Plotly charts: Task 2.
- Aggregate data boundary: Task 1.
- AEDC no report screenshots: Task 3 and Task 4.
- Verification: Task 4.

No unresolved placeholders remain. Data files are exact and bounded to aggregate values. AEDC map is intentionally deferred in favor of a stable Top DV2 chart for this iteration.
