import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../Componets/Img/boy2.png";
function SignInSide() {
  const navigate = useNavigate();
  const [signin, setSignIn] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setData(JSON.parse(localStorage.getItem("user")));
  }, []);

 
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());

    if (formDataObject.email && formDataObject.password) {
      if (!localStorage.getItem("user")) {
        localStorage.setItem(
          "user",
          JSON.stringify([
            {
              email: formDataObject.email,
              password: formDataObject.password,
            },
          ])
        );
        navigate("/home", { state: formDataObject.email });
      } else {
        for (let val of data) {
          setEmail(val.email);
          if (val.email.includes(formDataObject.email)) {
            if (signin) {
              if (val.password === formDataObject.password) {
                navigate("/home", { state: formDataObject.email });
              } else {
                alert("Password does not match");
              }
            } else {
              alert("User already exists");
              setSignIn(true);
            }
            return true;
          }
        }
        if (!signin && email !== formDataObject.email) {
          localStorage.setItem(
            "user",
            JSON.stringify([
              ...data,
              {
                email: formDataObject.email,
                password: formDataObject.password,
              },
            ])
          );
          navigate("/home", { state: formDataObject.email });
        } else {
          alert("User does not exist");
          setSignIn(false);
        }
      }
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ bgcolor: "#332941" }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5" sx={{ color: "#F8E559" }}>
              {signin ? "Sign in" : "Sign up"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Name"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  style: { color: "#F8E559" }, // Set the color of the label
                }}
                InputProps={{
                  style: { color: "#F8E559" }, // Set the color of the text input
                }}
                selectedInput= {{
                 style:{ backgroundColor: "#F8E559"} // Set the background color of the selected input
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  style: { color: "#F8E559" }, // Set the color of the label
                }}
                InputProps={{
                  style: { color: "#F8E559" }, // Set the color of the text input
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    style={{ color: "#F8E559" }}
                  />
                }
                label={
                  <span style={{ color: "#F8E559" }}>Remember me</span> // Set the color of the label
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  "&:hover": {
                    bgcolor: "#5A549E",
                    color: "#FFF",
                  },
                  bgcolor: "#3B3486",
                  color: "#F8E559",
                }}>
                Sign {signin ? "in" : "up"}
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={() => {
                      setSignIn(!signin);
                      setEmail("");
                    }}
                    style={{ color: "#F8E559" }} // Set the color of the link
                  >
                    {signin
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
