import { aiDirector } from "../content/portfolio";
import CaseDetail from "../components/cases/CaseDetail";
import BackToOverview from "../components/cases/BackToOverview";

export default function AiDirectorPage() {
  return (
    <CaseDetail study={aiDirector}>
      <BackToOverview />
    </CaseDetail>
  );
}
