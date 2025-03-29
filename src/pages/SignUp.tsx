import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../api/auth";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert, Link, InputAdornment, IconButton  } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";


const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) ,  mode: "onBlur",});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setErrorMessage("");
      await signUp(data);
      navigate("/signin");
    } catch (error:any) {
      setErrorMessage(error.response?.data?.message || "User already exists");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" sx={{textAlign: 'center', m:1}}>Sign Up</Typography>
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>} 
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth sx={{m:1}} label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
          <TextField fullWidth sx={{m:1}} label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
          <TextField fullWidth sx={{m:1}} label="Password"  type={showPassword ? "text" : "password"}{...register("password")} error={!!errors.password} helperText={errors.password?.message} 
              slotProps={{
                input: {
                  endAdornment:  <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                },
              }}/>
          <TextField
            fullWidth sx={{ m: 1 }} label="Confirm Password"  type={showPassword ? "text" : "password"}
            {...register("confirmPassword")} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}
            slotProps={{
              input: {
                endAdornment:  <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              },
            }}/>
          <Button  type="submit" variant="contained" fullWidth sx={{ m: 1 }}>Sign Up</Button>
        </form>
      </Box>
      <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account? <Link href="/signin">Sign in</Link>
      </Typography>
    </Container>
  );
};

export default SignUp;
