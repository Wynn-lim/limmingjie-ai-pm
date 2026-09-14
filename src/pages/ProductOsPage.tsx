import { appendixCase } from "../content/portfolio";
import CaseDetail from "../components/cases/CaseDetail";
import BackToOverview from "../components/cases/BackToOverview";

/** 附加区：不进入 15 分钟标准主线，只在被追问其他 Agent 产品时打开 */
export default function ProductOsPage() {
  return (
    <CaseDetail study={appendixCase}>
      <BackToOverview label="返回总览（附加内容）" />
    </CaseDetail>
  );
}
