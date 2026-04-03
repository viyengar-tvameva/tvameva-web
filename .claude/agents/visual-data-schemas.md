# Visual Component Data Schemas

When producing content for solution areas, you can also produce structured data for visual components. These render as animated diagrams, infographics, and data visualizations on the website. The data is stored as JSON in Drupal CMS fields.

## Architecture Diagram (`architectureDiagram` field)
Renders as an animated stacked layer diagram in the hero section.

```typescript
{
  layers: [
    { id: string, label: string, description: string, color: string },
    // 3-5 layers, top to bottom
  ],
  badge?: string,  // badge text at bottom, e.g. "ACCELERATOR IP"
}
```

**Example (PropelEdge):**
```json
{
  "layers": [
    { "id": "output", "label": "Proposal Output", "description": "DOC · PDF · PPT · White-labeled Deliverables", "color": "#e8593c" },
    { "id": "pipeline", "label": "Agent Pipeline", "description": "Intake → POV → Demo → Proposal · Human Review Gates", "color": "#f5a623" },
    { "id": "knowledge", "label": "Knowledge Base", "description": "Institutional Memory · Past Proposals · Competitive Intel", "color": "#2ed8a3" },
    { "id": "sources", "label": "Data Sources", "description": "CRM · Web Research · Industry Analysis · Client Roadmaps", "color": "#4a90d9" }
  ],
  "badge": "Agentic Pipeline"
}
```

## Workflow Steps (`workflowSteps` field)
Renders as a connected pipeline flow with agent nodes and human review gates.

```typescript
{
  title?: string,
  steps: [
    {
      id: string,
      label: string,           // Step name
      agentName?: string,      // "Agent 01"
      description: string,     // What happens
      duration?: string,       // New time "5 hours"
      previousDuration?: string, // Old time "1 week"
      humanRole?: string,      // "Review and approve"
      outputs?: string[],      // ["DOC", "PDF"]
    }
  ]
}
```

## Metrics Comparison (`metricsComparison` field)
Renders as a before/after comparison table with animated improvement badges.

```typescript
{
  title?: string,
  oldLabel: string,    // "Before PropelEdge"
  newLabel: string,    // "With PropelEdge"
  metrics: [
    {
      label: string,       // "Proposal cycle time"
      oldValue: string,    // "1–3 weeks"
      newValue: string,    // "5 hours"
      improvement: string, // "95% faster"
    }
  ]
}
```

## Relationship Graph (`relationshipGraph` field)
Renders as a hub-and-spoke diagram showing SA connections.

```typescript
{
  nodes: [
    { id: string, label: string, color?: string, type?: "primary" | "secondary" }
  ],
  edges: [
    { source: string, target: string, label?: string }
  ],
  centerNode?: string  // id of the hub node
}
```

## Color Reference
- EngageOS: #2ed8a3 (teal)
- InsightLens: #4a90d9 (blue)
- PropelEdge: #e8593c (orange)
- ResolveIQ: #f5a623 (amber)
- SearchCore: #e8593c (orange)
- VisualForge: #a78bfa (purple)

## When to Produce Visual Data
- Always include `architectureDiagram` when creating/updating a solution area — it drives the hero section
- Include `workflowSteps` when the SA has a clear multi-step process (PropelEdge agents, InsightLens pipeline)
- Include `metricsComparison` when there's strong before/after quantified impact
- Include `relationshipGraph` when showing expansion paths to other SAs
