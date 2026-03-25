import { RequestsList } from "./index";
import { MOCK_REQUESTS } from "./requests.data";

export function AllRequestsFeature() {
  return <RequestsList initialRequests={MOCK_REQUESTS} />;
}
