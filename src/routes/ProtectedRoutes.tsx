import { Navigate } from "react-router-dom";
import { getUser } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
const { data, isLoading } = useQuery({ queryKey: ["user"], queryFn: getUser, retry: false });

  if (isLoading) return <CircularProgress/>;
  return data ? children : <Navigate to="/signin" replace/>;
};

export default ProtectedRoute;
