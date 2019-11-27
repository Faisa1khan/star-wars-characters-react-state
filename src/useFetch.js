import React, { useState } from 'react';
export const useFetch = url => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  React.useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        setResponse(response);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, [url]);
  return [response, loading, error];
};
