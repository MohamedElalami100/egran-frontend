import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "./FarmerApi";

// React component
const ApiTest = () => {
  const queryKey = ["farmerId", 1];
  const queryFn = () => getDashboardStats(1);

  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Dashboard Stats</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ApiTest;
