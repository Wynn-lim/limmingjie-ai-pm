import { asset } from "../../content/portfolio";
import { sizeOf } from "../../content/imageSizes";
import ImageZoom from "../media/ImageZoom";

interface AccountLike {
  id: string;
  name: string;
  position: string;
  responsibility: string;
  image: string;
  evidence: string;
  metrics: { value: string; label: string; scope: string }[];
  note?: string;
  dashboard?: string;
}

/** 账号矩阵卡片：截图 / 定位 / 职责 / 截图时数据 */
export default function AccountCard({
  account,
  showDashboard = false,
}: {
  account: AccountLike;
  showDashboard?: boolean;
}) {
  return (
    <article className="account" data-testid={`account-${account.id}`}>
      <div className="account__shot">
        <img
          src={asset(account.image)}
          alt={`${account.name} 账号截图`}
          width={sizeOf(account.image)?.w}
          height={sizeOf(account.image)?.h}
          loading="lazy"
        />
      </div>
      <div className="account__body">
        <div className="eyebrow">{account.evidence}</div>
        <h3 className="account__name">{account.name}</h3>
        <p className="account__pos">{account.position}</p>
        <p className="account__role">我的职责：{account.responsibility}</p>

        <div className="grid-12" style={{ gap: 10, marginTop: 2 }}>
          {account.metrics.map((m) => (
            <div className="col-6" key={m.label + m.value}>
              <div className="metric" style={{ padding: "13px 14px 12px" }}>
                <div className="metric__value metric__value--sm">{m.value}</div>
                <div className="metric__label" style={{ fontSize: "13.5px" }}>
                  {m.label}
                </div>
                <div className="metric__scope">口径：{m.scope}</div>
              </div>
            </div>
          ))}
        </div>

        {account.note && <p className="note">{account.note}</p>}

        {showDashboard && account.dashboard && (
          <div style={{ marginTop: 10 }}>
            <ImageZoom
              images={[
                {
                  src: asset(account.dashboard),
                  label: `${account.name} 后台截图 2026-09-14`,
                  sizePath: account.dashboard,
                },
              ]}
            />
          </div>
        )}
      </div>
    </article>
  );
}
