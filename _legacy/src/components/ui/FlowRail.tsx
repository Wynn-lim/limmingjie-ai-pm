export interface RailStep {
  no?: string;
  name: string;
  note?: string;
}

/** 轨道式流程：左轨道 + 编号节点，用于主工作流 */
export default function FlowRail({ steps }: { steps: RailStep[] }) {
  return (
    <div className="flow-rail">
      {steps.map((s, i) => (
        <div className="flow-rail__item" key={s.name}>
          <div className="flow-rail__node" aria-hidden="true">
            {s.no ?? String(i + 1).padStart(2, "0")}
          </div>
          <div>
            <div className="flow-rail__name">{s.name}</div>
            {s.note && <div className="flow-rail__note">{s.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
