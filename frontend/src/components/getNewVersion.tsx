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

  const getHistory = () => {
    getVerionHistory(id, setVersionHistory);
  };

  const getVersionInfo = (version: string) => {
    getVersion(id, version, setVersion, setIsReturned);
  };

  return (
    <div>
      {versionHistory && (
        <div>
          <h2>Versions:</h2>
          <ul>
            {versionHistory.map((ver) => (
              <li key={ver.version}>
                <p>Version: {ver.version}</p>
                <p>Changer: {ver.changed_by}</p>
                <button onClick={() => getVersionInfo(ver.version)}>
                  Повернутися до версії {ver.version}:
                </button>
              </li>
            ))}
          </ul>
          {isReturned && (
            <button
              onClick={() => {
                setIsReturned(false);
                setVersion(null);
              }}
            >
              Скасувати
            </button>
          )}
        </div>
      )}
      <button onClick={() => getHistory()}>Get version history.</button>
    </div>
  );
}
