import React from 'react'
import { Paper, Grid , TextField,
Typography ,RadioGroup,MenuItem,Select,
FormControlLabel,Radio, Divider ,Button,FormHelperText,FormControl,InputLabel
} from '@material-ui/core'
import {useFormik} from "formik";
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { selectCompanyInfoState,
    companyInfoSateUpdate
} from "../Slice/CompanySlice";


const validationSchema = 
    Yup.object().shape({
        firstName: Yup.string().required('Required'),       
        contactNo: Yup.string().required('Required'),  
        email: Yup.string().required('Required'),      
        isActive: Yup.string().required('Required'),
        address: Yup.object().shape({
            addressLine1: Yup.string().required('Required'),
            cityName: Yup.string().required('Required'),
            pinCode: Yup.number().required('Required').max(7).min(7),
            stateCode: Yup.string().required('Required'),
        }), 
});



 
const CompanyBasicInfo = ({classes,sateList,nextTabHandler}) => {
   
    const [stateObj, setStateObj] = React.useState(""); 
    const companyInfoState = useSelector(selectCompanyInfoState);
    const dispatch = useDispatch();
     
    const formik = useFormik({
        initialValues : {
            ...companyInfoState.data.companyBasicInfo,
            "address" : {...companyInfoState.data.companyBasicInfo.address}
        },
        onSubmit : (values) => {   
          dispatch(companyInfoSateUpdate(values));
          console.log(JSON.stringify(values)); 
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
                        id="businessName"
                        label="Business Name"
                        name="businessName"
                        autoComplete="businessName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.businessName}
                        helperText={formik.touched.businessName ? formik.errors.businessName : ""}
                        error={formik.touched.businessName && Boolean(formik.errors.businessName)}          
                            
                        />          
                    </Grid>                    
                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="companyEmail"
                        label="Email"
                        name="email"
                        autoComplete="companyEmail" 
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
                        id="companyContactNo"
                        label="ContactNo"
                        name="contactNo"
                        autoComplete="companyContactNo"   
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contactNo}
                        helperText={formik.touched.contactNo ? formik.errors.contactNo : ""}
                        error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}                                      
                     />          
                    </Grid>                    
                    <Grid item xs={6}>
                        <TextField                       
                        margin="normal"                        
                        fullWidth
                        id="companyAddressLine1"
                        label="Address Line-1"
                        name="address.addressLine1"
                        autoComplete="companyAddressLine1"
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
                        id="companyAddressLine2"
                        label="Address Line-2"
                        name="address.addressLine2"
                        autoComplete="companyAddressLine2" 
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
                        id="companyCityName"
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
                        id="companyPinCode"
                        label="Pin Code"
                        name="address.pinCode"
                        autoComplete="companyPinCode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.pinCode}                               
                     />          
                    </Grid>
                    <Grid item xs={4}>
                       <FormControl required fullWidth  style={{marginTop:16}}>
                       <InputLabel id="company-state-select-label">State</InputLabel>
                            <Select
                                labelId="company-state-mutiple-checkbox-label"
                                id="company-state-mutiple-checkbox"
                                value={formik.values.address.stateCode || ""}
                                onChange={handleChangeForStateObj}
                                fullWidth
                                name="address.stateCode"                                
                                onBlur={formik.handleBlur}
                                color="primary"
                            >
                            
                                
                            {
                                sateList.map(({ stateCode, stateName }) => (
                                    <MenuItem key={stateCode} value={stateCode}>{stateName}</MenuItem>
                                ))
                            }

                            </Select>  
                            <FormHelperText></FormHelperText>           
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
                            <FormControlLabel value="true" control={<Radio color="primary"/>} label="Active" />
                            <FormControlLabel value="false" control={<Radio color="primary"/>} label="In-Active" />
                        </RadioGroup> 
                    </FormControl>             
                    </Grid> 
                    <Grid item xs={6}>  
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

export default CompanyBasicInfo
