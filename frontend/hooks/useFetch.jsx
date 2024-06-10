import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortController = new AbortController();
  const signal = abortController.signal;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { signal });
        if (response.status !== 200) {
          throw new Error("Network response has been failed");
        }

        const { data } = response;

        setData(data);
        setLoading(false);
      } catch (e) {
        if (e.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(e);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
};
