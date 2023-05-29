import axios from "axios";
import { useState, useEffect } from "react";


export const useAxiosRequest = (url: string, payload?: Record<string, any>, pagination?: boolean) => {
  const [loading, setLoading] = useState(false);
  const [response, setData] = useState<any[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const axiosConfig = {
      method: "GET",
      url: url,
      ...(payload ? { payload } : {}),
    };

    axios(axiosConfig)
      .then((response) => {
        setData(response.data);
        if (pagination) {
           setData(response.data.results);
        }

        setError(null);
      })
      .catch((error) => {
        setData([]);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, response, error };
};
