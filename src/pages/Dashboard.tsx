import { useNavigate } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";
import { getUser, loggingOut } from "../api/auth";
import { Container, Typography, Button, Box, CircularProgress } from "@mui/material";
import { useAuth } from "../routes/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data : user , isLoading } = useQuery({ queryKey: ["user"], queryFn: getUser, retry: false });

  const handleLogout = async () => {
    await loggingOut()
    logout(); 
    navigate("/signin");
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" color="textSecondary" mt={2}>
          Hello, {user?.data?.user?.name || ''} 👋
        </Typography>
        <Typography variant="h6">Welcome to the App</Typography>
        <Button variant="contained" color="error" sx={{ mt: 3 }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
