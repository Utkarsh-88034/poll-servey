import React from 'react'
import { Paper, Grid , TextField,
Typography ,RadioGroup,MenuItem,Select,
FormControlLabel,Radio, Divider ,Button,FormHelperText,FormControl,InputLabel
} from '@material-ui/core'
import {useFormik} from "formik";
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { selectUserInfoState,
    userInfoSateUpdate
} from "../Slice/UserSlice";

const validationSchema = 
    Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        gender: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
        contactNo: Yup.string().required('Required'),
        userTypeId: Yup.string().required('Required'),
        isActive: Yup.string().required('Required'),
        address: Yup.object().shape({
            addressLine1: Yup.string().required('Required'),
            cityName: Yup.string().required('Required'),
            pinCode: Yup.number().required('Required').max(7).min(7),
            stateCode: Yup.string().required('Required'),
        }), 
});



 
const Personal = ({classes,sateList,nextTabHandler}) => {
   
    const [stateObj, setStateObj] = React.useState(""); 
    const userInfoState = useSelector(selectUserInfoState);
    const dispatch = useDispatch();
  

    const formik = useFormik({
        initialValues : {
            ...userInfoState.data.basicInfo,
            "address" : {...userInfoState.data.basicInfo.address}
        },
        onSubmit : (values) => {   
          dispatch(userInfoSateUpdate(values));
          nextTabHandler();
        },       
    }); 
    
    const handleChangeForStateObj = (event) => {       
        setStateObj(event.target.value);   
        formik.setFieldValue(event.target.name,event.target.value)   
        
    };

    return (
        <div>
            <form  noValidate onSubmit={formik.handleSubmit}>
            <Paper style={{ padding: 16 }} variant="outlined" square  >
                <Grid container spacing={1} direction="row" justify="space-around"  alignItems="flex-start">
                    <Grid item xs={12} >
                        <Typography variant="h6" component="h6" align="left">
                            Basic Info : 
                        </Typography> 
                        <Divider/>
                        <Divider/>                   
                     </Grid>   
                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="userFirstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        helperText={formik.touched.firstName ? formik.errors.firstName : ""}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}          
                            
                        />          
                    </Grid>
                    <Grid item xs={4}>
                        <TextField                       
                        margin="normal"                        
                        fullWidth
                        id="uerMiddleName"
                        label="Middle Name"
                        name="middleName"
                        autoComplete="uerMiddleName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.middleName}                                              
                     />          
                    </Grid>
                    <Grid item xs={4}>
                        <TextField                       
                        margin="normal"
                        required
                        fullWidth
                        id="uerLastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="uerLastName" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName} 
                        helperText={formik.touched.lastName ? formik.errors.lastName : ""}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}                                                          
                     />          
                    </Grid>
                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="userEmail"
                        label="Email"
                        name="email"
                        autoComplete="userEmail" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        helperText={formik.touched.email ? formik.errors.email : ""}
                        error={formik.touched.email && Boolean(formik.errors.email)}                                                         
                     />          
                    </Grid>
                    <Grid item xs={4}>
                        <TextField                       
                        margin="normal"
                        required                        
                        fullWidth
                        id="uerContactNo"
                        label="ContactNo"
                        name="contactNo"
                        autoComplete="uerContactNo"   
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contactNo}
                        helperText={formik.touched.contactNo ? formik.errors.contactNo : ""}
                        error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}                                      
                     />          
                    </Grid>
                    <Grid item xs={1}>                                                                
                            <Typography align="left" className={classes.marginTop}>                            
                                Gender :
                            </Typography>      
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl required error={formik.touched.gender && Boolean(formik.errors.gender)}>                                                                
                            <RadioGroup aria-label="gender"  name="gender" row 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.gender || "M" }                       
                            >
                                <FormControlLabel value="M" control={<Radio color="primary"/>} label="Male"  />
                                <FormControlLabel value="F" control={<Radio color="primary" />} label="Female" /> 
                                <FormHelperText>{formik.touched.gender ? formik.errors.gender : ""}</FormHelperText>                           
                            </RadioGroup>  
                        </FormControl>       
                    </Grid>
                    <Grid item xs={6}>
                        <TextField                       
                        margin="normal"                        
                        fullWidth
                        id="uerAddressLine1"
                        label="Address Line-1"
                        name="address.addressLine1"
                        autoComplete="uerAddressLine1"
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.addressLine1}
                        error={formik.getFieldMeta("address.addressLine1").touched && Boolean(formik.getFieldMeta("address.addressLine1").errors)}
                        helperText={formik.getFieldMeta("address.addressLine1").touched ? formik.getFieldMeta("address.addressLine1").errors : ""}                  
                       
                     />      
                    </Grid>
                    <Grid item xs={6}>
                        <TextField                       
                        margin="normal"                        
                        fullWidth
                        id="uerAddressLine2"
                        label="Address Line-2"
                        name="address.addressLine2"
                        autoComplete="uerAddressLine2" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.addressLine2}                           
                     />          
                    </Grid>
                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="userCityName"
                        label="City Name"
                        name="address.cityName"
                        autoComplete="cityName" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.cityName}                             
                        />          
                    </Grid>
                    <Grid item xs={4}>
                        <TextField                       
                        margin="normal"                        
                        fullWidth
                        id="uerPinCode"
                        label="Pin Code"
                        name="address.pinCode"
                        autoComplete="uerPinCode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.pinCode}                               
                     />          
                    </Grid>
                    <Grid item xs={4}>
                       <FormControl required fullWidth  style={{marginTop:16}}>
                       <InputLabel id="user-state-select-label">State</InputLabel>
                            <Select
                                labelId="user-state-mutiple-checkbox-label"
                                id="user-state-mutiple-checkbox"
                                value={formik.values.address.stateCode || ""}
                                onChange={handleChangeForStateObj}
                                fullWidth
                                name="address.stateCode"                                 
                                onBlur={formik.handleBlur}
                                color="primary"
                                
                                
                            >
                            
                                
                            {
                                sateList.map(({ stateCode, stateName }) => (
                                    <MenuItem color="primary" key={stateCode} value={stateCode}>{stateName}</MenuItem>
                                ))
                            }

                            </Select>  
                            <FormHelperText></FormHelperText>           
                         </FormControl>     
                    </Grid>                  

                    <Grid item xs={2}>                                                                
                            <Typography align="left" className={classes.marginTop}>                            
                               Privilage Type :
                            </Typography>      
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl required error={formik.touched.userTypeId && Boolean(formik.errors.userTypeId)}>
                            <RadioGroup aria-label="userTypeId" name="userTypeId" row
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userTypeId  || "2"}  
                            
                            >
                                <FormControlLabel  value="1" control={<Radio color="primary" />} label="Admin" />
                                <FormControlLabel value="2"  control={<Radio color="primary" />} label="Non-Admin" />
                            </RadioGroup> 
                        </FormControl>                                  
                    </Grid>

                    <Grid item xs={2}>                                                                
                            <Typography align="left" className={classes.marginTop}>                            
                               Operation Status :
                            </Typography>      
                    </Grid> 
                    <Grid item xs={4}>
                    <FormControl required error={formik.touched.isActive && Boolean(formik.errors.isActive)}>
                        <RadioGroup aria-label="isActive" name="isActive" row  
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.isActive || "false"}  
                        >
                            <FormControlLabel value="true" control={<Radio color="primary" />} label="Active" />
                            <FormControlLabel value="false" control={<Radio color="primary" />} label="In-Active" />
                        </RadioGroup> 
                    </FormControl>             
                    </Grid> 

                    <Grid item xs={12} align="right">                                                                
                        <Button variant="contained" size="medium" color="primary" type="submit" >Next</Button>   
                    </Grid>     
                </Grid>
            </Paper>
            </form>
        </div>
    )
}

export default Personal
