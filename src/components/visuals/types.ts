// =============================================================================
// Visual Component Data Types — CMS-driven diagram/infographic data
// =============================================================================
// These types define the JSON shape stored in Drupal text_long fields.
// Content agents produce this data. Visual components render it.
// =============================================================================

/** Layer in a stacked architecture diagram */
export interface ArchitectureLayer {
  id: string;
  label: string;
  description: string;
  color: string;
  platforms?: string[];
}

/** Full architecture diagram data (field_architecture_diagram) */
export interface ArchitectureDiagramData {
  layers: ArchitectureLayer[];
  badge?: string;
  flowDirection?: 'top-down' | 'bottom-up';
}

/** Single step in an agent/workflow pipeline */
export interface WorkflowStep {
  id: string;
  label: string;
  agentName?: string;
  description: string;
  duration?: string;
  previousDuration?: string;
  humanRole?: string;
  outputs?: string[];
}

/** Full workflow pipeline data (field_workflow_steps) */
export interface WorkflowData {
  steps: WorkflowStep[];
  title?: string;
  orientation?: 'horizontal' | 'vertical';
}

/** Single metric in a before/after comparison */
export interface MetricItem {
  label: string;
  oldValue: string;
  newValue: string;
  improvement: string;
  icon?: string;
}

/** Full metrics comparison data (field_metrics_comparison) */
export interface MetricsComparisonData {
  title?: string;
  oldLabel: string;
  newLabel: string;
  metrics: MetricItem[];
}

/** Node in a relationship graph */
export interface GraphNode {
  id: string;
  label: string;
  color?: string;
  type?: 'primary' | 'secondary';
}

/** Edge in a relationship graph */
export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

/** Full relationship graph data (field_relationship_graph) */
export interface RelationshipGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  centerNode?: string;
}
