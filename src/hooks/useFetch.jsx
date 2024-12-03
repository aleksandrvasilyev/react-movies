import { useState, useCallback } from "react";

const defaultOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
};

const useFetch = (options = defaultOptions) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (url) => {
      try {
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
        return data;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  return { error, loading, fetchData };
};

export default useFetch;
