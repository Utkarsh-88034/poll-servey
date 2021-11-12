import React, {useState, useEffect} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useSelector,useDispatch} from "react-redux";
import {selectAuthState} from "./LoginSlice"; 
import * as loginService  from "./LoginService";
import FormHelperText from "@material-ui/core/FormHelperText";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useHistory } from 'react-router-dom';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://quantumcloud360.com/">
        QuantumCloud360
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    elevation : "1",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const initialValues = {
  username : 'dalal.sourav12345@gmail.com',
  password : 'Welcome123'
};

const authCheck = (val) => {
   console.log(val);
} 

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const history = useHistory();
  const formik = useFormik({
    initialValues,
    onSubmit : (values) => {     
     dispatch(loginService.login(values,history)); 
    
     //console.log(value);
    },
    validationSchema,
  });

  

  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />           
      <div className={classes.paper}>     
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in 
        </Typography>
        {
           authState.error ?  <FormHelperText error component="h1" variant="standard"	>{authState.error}</FormHelperText> : null
        }      
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus            
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            helperText={formik.touched.username ? formik.errors.username : ""}
            error={formik.touched.username && Boolean(formik.errors.username)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            helperText={formik.touched.password ? formik.errors.password : ""}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
           
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>           
            <Grid item xs>
              {
                authState.isSubmited ?  <><LinearProgress /><br/></> : null
                
              }     
                      
              <Link href="#" variant="body2">
                Forgot password?
              </Link> 
            </Grid>           
          </Grid>                  
        </form>
      </div>      
      <Box mt={8}>        
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
