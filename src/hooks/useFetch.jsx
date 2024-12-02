import { useState, useCallback } from "react";

const defaultOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
};

const useFetch = (options = defaultOptions) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (url) => {
      try {
        setData([]);
        setLoading(true);
        setError(null);

        const data = await Promise.all(
          url.map(async (urlItem) => {
            const response = await fetch(urlItem, options);

            if (!response.ok) {
              throw new Error("Error while fetching data.");
            }

            return response.json();
          })
        );

        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  return { data, error, loading, fetchData };
};

export default useFetch;
