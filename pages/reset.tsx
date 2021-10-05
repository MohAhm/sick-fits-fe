import { RequestReset } from "../components/RequestReset";
import { Reset } from "../components/Reset";

export default function ResetPage({ query }: { query: any }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }

  return (
    <div>
      <p>RESET YOUR PASSWORD {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
