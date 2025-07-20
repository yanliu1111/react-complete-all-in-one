import { useEffect, useState } from "react";

import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 2000); // Simulate loading delay
      }
    };

    fetchData(dataUrl);
    return () => {
      isMounted = false; // Cleanup to avoid setting state on unmounted component
      source.cancel("Component unmounted, request canceled.");
    };
  }, [dataUrl]);

  return { data, isLoading, error };
}

export default useAxiosFetch;