# CEO / CXO Banking Value Realisation Command Centre
## Focused Executive Dashboard | CRM / BUSINESSNEXT | RFP Demonstration

> **Primary Objective**: Provide a Bank CEO / CXO with a **30-second to 1-minute view of business health**, followed by the ability to drill into the key areas requiring executive attention.

---

## 🏛️ The 5 Strategic Questions Answered in 30 Seconds

1. **Are we growing and meeting our business targets?**
   - **Revenue vs Plan**: **₹485 Cr (108% of Plan, ↑ 8.2% YoY)** — pacing ₹35 Cr ahead of budget.
   - **Revenue Growth**: **+12.4%** vs baseline; **Customer Growth**: **+8.6%**.
2. **Are we acquiring, converting and retaining customers effectively?**
   - **Sales Conversion**: **18.4%** lead-to-won conversion rate.
   - **Reconciled Funnel**: `10,000 Leads ↓ 4,200 Qualified ↓ 1,450 Opportunities ↓ 520 Won`.
3. **Are we delivering a good customer experience?**
   - **NPS**: **+41** (vs Target +40, +19 pts vs baseline).
   - **Retention**: **94.2%**; **First Contact Resolution (FCR)**: **76.0%**.
4. **Are our people and processes becoming more productive?**
   - **RM Productivity**: **+18%** lift (**₹1.85 Cr / RM** vs ₹1.57 Cr baseline).
   - **Sales Cycle Reduction**: **-45%** (18.5 days vs 34.0 days).
   - **Service Turnaround**: **-69%** (3.8 hrs vs 12.5 hrs).
5. **Is CRM adoption actually creating measurable business value?**
   - **CRM Adoption**: **87%** active weekly users (**85% DAU stickiness**).
   - **Empirical Correlation**: Statistically proven correlation ($r = 0.88$) linking platform adoption to branch revenue growth.
   - **Total Realised Transformation Value**: **₹143.2 Cr** across Revenue Uplift, Capacity, Retention, and Cost-to-Serve.

---

## 📊 Focused 4-Tab Architecture

| Tab # | Name | Executive Purpose |
|---|---|---|
| **Tab 1** | **CEO Executive Overview** | **The Single Command Centre Screen**: Top 8 banking KPI strip (Revenue vs Plan, Growth, Customer Growth, Conversion, Retention, NPS, Productivity, Adoption), **86/100 Business Health Score** (5 dimensions: Growth 91, Customer 84, Productivity 87, Service 82, Adoption 85), 12-month Revenue vs Plan trend chart, 3-4 Executive Attention alerts, and BU Performance Scorecard. |
| **Tab 2** | **Business Growth** | **Sales + Marketing Unified**: Reconciled sales funnel (`10,000 → 4,200 → 1,450 → 520`), Revenue by BU vs Plan, Pipeline Health (₹1,220 Cr total, ₹463.6 Cr weighted), Customer Growth & Cross-sell contribution (New vs Cross-sell vs Existing), and concise Marketing ROI (13.8x). |
| **Tab 3** | **Customer & Service** | **Customer Experience & Retention**: Trailing NPS trend (+41 vs +40 target), Customer Retention vs Churn (94.2% vs 5.8%), Service Health lifecycle funnel (76.0% FCR), and BU CX heatmap. |
| **Tab 4** | **Productivity & Value** | **BUSINESSNEXT Core Differentiator**: Front/back-office productivity gains vs baseline, 4 core CRM adoption metrics (Active Users, Daily Usage, Core Process %, Workflow %), **CRM Adoption vs Outcome Correlation Chart**, and the **4-Pillar Value Realisation Model** with an **84% transformation score**. |

---

## 🔢 Strict Mathematical Reconciliation & Data Invariants

All four tabs are powered by a single underlying relational dataset (`js/data/dataset.js`):
- $\text{Won Opportunities (520)} \le \text{Opportunities (1,450)} \le \text{Qualified (4,200)} \le \text{Total Leads (10,000)}$
- $\text{Sales Conversion Rate} = \frac{520}{10,000} \times 100 = 18.4\%$ (matches Tab 1, Tab 2, Tab 4)
- $\text{Revenue} = \text{₹485 Cr}$ (matches Tab 1, Tab 2, Tab 4, and BU Scorecards)
- $\text{Active CRM Users} \le \text{Total Provisioned Users}$; $\text{DAU} \le \text{MAU}$

---

## 🚀 How to Run & Demonstrate

1. Open [`index.html`](file:///C:/Users/PalakLalwani/.gemini/antigravity/scratch/cxo-crm-command-centre/index.html) in any modern browser.
2. Toggle periods using `MTD | QTD | YTD` or filter by Business Unit and Geography.
3. Switch between tabs using mouse clicks or keyboard shortcuts `1`, `2`, `3`, `4`.
4. Click **✨ Executive Brief** to generate an automated C-level summary.
5. Click **🧮 What-If Simulator** to model adoption, sales cycle, and STP impact on projected ROI.
6. Click **🔍 Hierarchy Drill-Down** to explore regional branches and lead relationship managers.
