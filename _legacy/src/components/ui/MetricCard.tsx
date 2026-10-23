import type { EvidenceStatus, Metric } from "../../types/portfolio";

const statusText: Record<EvidenceStatus, string> = {
  real: "真实工作",
  screenshot: "截图时数据",
  demo: "产品Demo",
  concept: "产品方案",
  forecast: "规划目标",
};

export function EvidenceChip({ status }: { status: EvidenceStatus }) {
  return <span className={`chip chip--${status}`}>{statusText[status]}</span>;
}

export default function MetricCard({
  metric,
  size = "lg",
  showStatus = true,
}: {
  metric: Metric;
  size?: "lg" | "sm";
  showStatus?: boolean;
}) {
  return (
    <div className="metric" data-status={metric.status}>
      <div className={size === "lg" ? "metric__value" : "metric__value metric__value--sm"}>
        {metric.value}
      </div>
      <div className="metric__label">
        {metric.label}
        {showStatus && <EvidenceChip status={metric.status} />}
      </div>
      <div className="metric__scope">口径：{metric.scope}</div>
    </div>
  );
}
