import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../api/api";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import imageURL from "../../assets/ternak_cover.jpg";
import { VisibilityOff, Visibility } from "@mui/icons-material";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const postLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await post("login", {
        name: username,
        password: password,
      });
      console.log(response?.data.data.acess_token);
      const access_token = response?.data.data.acess_token;
      localStorage.setItem("access_token", access_token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <Box width={"100vw"} display={"flex"}>
        <Box
          width={1 / 2}
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ backgroundImage: `url(${imageURL})`, backgroundSize: "cover" }}
        >
          {/*   */}
        </Box>
        <Box
          width={1 / 2}
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          bgcolor={"#F5F5F5"}
        >
          <Typography
            variant="h1"
            mb={"48px"}
            color={"#FF7F48"}
            fontWeight={600}
          >
            Inspirer
          </Typography>
          <form
            action=""
            onSubmit={(e) => postLogin(e)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField 
              id="Username" 
              label="Username"
              variant="outlined"
              sx={{ marginBottom: "32px" }}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField 
              id="Password" 
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              sx={{ marginBottom: "32px" }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>,
              }}
            />
            <Box display={"flex"} justifyContent={"center"}>
              <Button variant="contained" type="submit" sx={{backgroundColor: "#FF7F48"}}>Log In</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default Login;
