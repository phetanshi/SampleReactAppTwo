import React, { useEffect, useState } from 'react'
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { loginRequest, protectedResources } from "../authConfig";

export const FetchData = () => {

  const { isLoading, error, execute } = useFetchWithMsal({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    let endpoint = "/weatherforecast";
    execute("GET", endpoint).then((response) => {
      setForecasts(response);
      console.log("useEffect response : ", response);
    });

    return () => {
      isCancelled = true;
    }
  }, [execute])
  

  return (
    <table className="table table-striped" aria-labelledby="tableLabel">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts && forecasts.map(forecast =>
          <tr key={forecast.date}>
            <td>{forecast.date}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
