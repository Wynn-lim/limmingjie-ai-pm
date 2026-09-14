import { ragExpert } from "../content/portfolio";
import CaseDetail from "../components/cases/CaseDetail";
import BackToOverview from "../components/cases/BackToOverview";

export default function RagExpertPage() {
  return (
    <CaseDetail study={ragExpert}>
      <BackToOverview />
    </CaseDetail>
  );
}
