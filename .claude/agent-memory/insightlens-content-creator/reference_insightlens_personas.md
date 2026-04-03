---
name: InsightLens Buyer Personas and Value Proposition Angles
description: How to frame InsightLens messaging for different enterprise buyer personas (CDO, CFO, VP Data, COO)
type: reference
---

## Primary personas for InsightLens

**CDO / VP of Data Engineering**
- Pain: fragmented pipelines, no single source of truth, data quality fires, team stuck firefighting instead of building
- Frame: pipeline reliability SLA, data quality governance, analyst time reclaimed
- Language they trust: "dbt contracts," "lineage documentation," "schema drift detection," "Cloud Composer orchestration"

**CFO / VP Finance (FP&A)**
- Pain: monthly close takes days of manual reconciliation, planning cycle too slow, no forward-looking revenue model
- Frame: FP&A planning cycle compression, single source of truth for revenue metrics, Vertex AI forecasting
- Proof point: B2B SaaS company reduced 3-day manual close to same-day

**COO / Supply Chain Leader**
- Pain: demand forecasting relies on gut feel and historical sales, stockouts and excess inventory both visible only in hindsight
- Frame: prescriptive reorder recommendations, demand forecasting accuracy improvement, working capital optimization
- Proof point: manufacturing client, 18pp forecast accuracy improvement

**VP Sales / CRO**
- Pain: churn identified reactively, no predictive lead scoring, reps don't know which accounts to prioritize
- Frame: churn propensity model with 90-day early-warning, opportunity scoring, pipeline analytics in Looker
- Language: "prediction-to-action adoption rate," "sales cycle compression"

## Tone calibration by persona
- CDO/VP Data: lean technical — mention specific GCP services, dbt, Kubeflow. They will probe the stack.
- CFO: anchor everything to business outcomes and time savings. Avoid jargon. Lead with the metric, follow with the mechanism.
- COO: operational specificity. "Weekly prescriptive reorder recommendations" not "AI-driven supply chain optimization."
- CRO/VP Sales: connect the model to rep behavior. Not "churn model deployed" — "CSMs receive prioritized intervention lists with confidence scores."
