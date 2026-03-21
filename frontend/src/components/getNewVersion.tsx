import { useState } from "react";
import type { VersionType } from "../types/interfaces";
import { APIRequests } from "../services/apiRequests";

export function GetNewVersion({
  id,
  setVersion,
}: {
  id: string;
  setVersion: React.Dispatch<React.SetStateAction<VersionType | null>>;
}) {
  const { getVersion, getVerionHistory } = APIRequests();
  const [versionHistory, setVersionHistory] = useState<VersionType[] | null>(
    null
  );
  const [isReturned, setIsReturned] = useState<boolean>(false);
  const [isHided, setIsHided] = useState<boolean>(false);

  const getHistory = () => {
    getVerionHistory(id, setVersionHistory);
  };

  const getVersionInfo = (version: string) => {
    getVersion(id, version, setVersion, setIsReturned);
  };

  return (
    <section className="versions-section">
      <div>
        <h2>Versions:</h2>
        <section className="versions-buttons">
          <button
            onClick={() => getHistory()}
            className="get-history-button cursor-btn"
          >
            Get history
          </button>
          {versionHistory && (
            <button
              onClick={() => setIsHided(!isHided)}
              className="get-history-button cursor-btn"
            >
              {isHided ? "Show" : "Hide"}
            </button>
          )}
        </section>
      </div>
      {isReturned && (
        <button
          onClick={() => {
            setIsReturned(false);
            setVersion(null);
          }}
          className="undo-button cursor-btn"
        >
          Undo
        </button>
      )}
      {versionHistory && !isHided && (
        <section>
          <ul className="versions-history">
            {versionHistory.map((ver) => (
              <li key={ver.version} className="version-element">
                <p>
                  {ver.version}. {ver.description}
                </p>

                <aside>
                  <h4>Changer: {ver.changed_by}</h4>
                  <button
                    onClick={() => getVersionInfo(ver.version)}
                    className="rollback-btn cursor-btn"
                  >
                    Rollback {ver.version}
                  </button>
                </aside>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
