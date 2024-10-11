import useSWR from "swr";
import axios from "axios";

// interface Job {
//   sessionId: string;
//   status: "in_queue" | "in_progress" | "completed" | "failed";
//   startedAt: string;
//   completedAt?: string;
//   resultFile?: string;
// }

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useFetchJobs = (sessionId: string) => {
  sessionId = "754be4e4-a0e9-4af6-a8b5-50778434d542";

  const { data, error } = useSWR(
    `http://0.0.0.0:8000/api/jobs/?session_uid=${sessionId}`,
    fetcher
  );

  return {
    data: data,
    loading: !error && !data,
    error: error?.message
  };
};

export default useFetchJobs;
