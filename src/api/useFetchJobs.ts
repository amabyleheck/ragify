import useSWR from "swr";
import axios from "axios";
import useSessionStorageId from "@/utils/localStorageId";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const useFetchJobs = () => {
  const { sessionId } = useSessionStorageId();

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
