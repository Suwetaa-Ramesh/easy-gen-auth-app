import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../api/auth";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../routes/AuthContext";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      setErrorMessage("");
      const response = await signIn(data);
      localStorage.setItem("jwt", response.data);
      login(response.data);
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" sx={{textAlign: 'center', m:1}}>Sign In</Typography>
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>} 
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth  sx={{m:1}}label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
          <TextField fullWidth  sx={{m:1}} label="Password" type={showPassword ? "text" : "password"}{...register("password")} error={!!errors.password} helperText={errors.password?.message} 
          slotProps={{
            input: {
              endAdornment:  <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
            },
          }}/>
          <Button type="submit" variant="contained" fullWidth sx={{ m: 1 }}>Sign In</Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
