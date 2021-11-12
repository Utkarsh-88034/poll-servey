import React from 'react'

const VoterMapping = () => {

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
                   
                    <Grid item xs={4}>
                       <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="voterId"
                        label="Voter Id"
                        name="voterId"
                        autoComplete="voterId"                                
                            
                        />          
                    </Grid>                    
                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="voterName"
                        label="voterName"
                        name="voterName"
                        autoComplete="voterName" 
                                                                              
                     />          
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl required >                                                                
                            <RadioGroup aria-label="gender"  name="gender" row 
                                                 
                            >
                                <FormControlLabel value="M" control={<Radio color="primary"/>} label="Male"  />
                                <FormControlLabel value="F" control={<Radio color="primary" />} label="Female" /> 
                                
                            </RadioGroup>  
                        </FormControl>    
                    </Grid>  


                    <Grid item xs={4}>
                        <TextField                       
                        margin="normal"                        
                        fullWidth
                        id="voterAge"
                        label="Voter Age"
                        name="voterAge"
                        autoComplete="voterAge"
                                
                       
                     />      
                    </Grid>
                    <Grid item xs={4}>
                        <TextField                       
                        margin="normal"                        
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="phoneNumber" 
                                           
                     />          
                    </Grid>
                    <Grid item xs={4}>
                        <TextField                       
                        margin="normal"                        
                        fullWidth
                        id="caste"
                        label="Caste"
                        name="caste"
                        autoComplete="caste"
                                                  
                     />          
                    </Grid>


                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="guardianName"
                        label="Guardian Name"
                        name="guardianName"
                        autoComplete="guardianName" 
                                                  
                        />          
                    </Grid>
                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="guardianRelationship"
                        label="Relationship with guardian"
                        name="guardianRelationship"
                        autoComplete="guardianRelationship" 
                                                  
                        />          
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Qualification Code</InputLabel>
                            <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={age}
                            onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Ten</MenuItem>
                            <MenuItem value={2}>Upto 7</MenuItem>
                            <MenuItem value={3}>Upto 10</MenuItem>
                            <MenuItem value={4}>12th</MenuItem>
                            <MenuItem value={5}>Some college</MenuItem>
                            <MenuItem value={6}>Graduate/ Post Grad</MenuItem>
                            <MenuItem value={7}>Prof. – Doc. / Eng</MenuItem>
                            <MenuItem value={8}>Any other Prof</MenuItem>
                            </Select>
                        </FormControl>   
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
                                name="stateCode"                                
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

                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="district"
                        label="District"
                        name="district"
                        autoComplete="district" 
                                                  
                        />          
                    </Grid>

                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="totalVotersInFamily"
                        label="Total Voters In Family"
                        name="totalVotersInFamily"
                        autoComplete="totalVotersInFamily" 
                                                  
                        />          
                    </Grid>


                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="validVoterCount"
                        label="How many valid Voter"
                        name="validVoterCount"
                        autoComplete="validVoterCount" 
                                                  
                        />          
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Voter Status</InputLabel>
                            <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={age}
                            onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Active Voter</MenuItem>
                            <MenuItem value={2}>Not in position to vote</MenuItem>
                            <MenuItem value={3}>Voter shifted to other location</MenuItem>
                            <MenuItem value={4}>Voter shifted to other booth</MenuItem>
                            <MenuItem value={5}>No more voters</MenuItem>                           
                            </Select>
                        </FormControl>   
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Occupation</InputLabel>
                            <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={age}
                            onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Unemployed</MenuItem>
                            <MenuItem value={2}>Student</MenuItem>
                            <MenuItem value={3}>Housewife</MenuItem>
                            <MenuItem value={4}>Retired</MenuItem>
                            <MenuItem value={5}>State Govt. Employee</MenuItem>
                            <MenuItem value={6}>Central Govt. Employee</MenuItem>
                            <MenuItem value={7}>Private Employee</MenuItem>
                            <MenuItem value={8}>Business</MenuItem>
                            <MenuItem value={9}>Farmer</MenuItem>
                            <MenuItem value={10}>Domestic worker</MenuItem>
                            </Select>
                        </FormControl>   
                    </Grid>

                    

                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Religious  Category</InputLabel>
                            <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={age}
                            onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Hindi</MenuItem>
                            <MenuItem value={2}>Jain</MenuItem>
                            <MenuItem value={3}>Buddhist</MenuItem>
                            <MenuItem value={4}>Sikh</MenuItem>
                            <MenuItem value={5}>Muslim</MenuItem>                     
                            </Select>
                        </FormControl>   
                    </Grid>
                    <Grid item xs={4}>
                       <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="constituency"
                        label="Constituency"
                        name="constituency"
                        autoComplete="constituency"                                
                            
                        />          
                    </Grid>                    
                    <Grid item xs={4}>
                        <TextField                        
                        margin="normal"
                        required
                        fullWidth
                        id="pollStation"
                        label="Polling Station"
                        name="pollStation"
                        autoComplete="pollStation" 
                                                                              
                     />          
                    </Grid>



                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Voter Disposition</InputLabel>
                            <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={age}
                            onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Extremely Positive</MenuItem>
                            <MenuItem value={2}>Positive</MenuItem>
                            <MenuItem value={3}>Neutral</MenuItem>
                            <MenuItem value={4}>Negative</MenuItem>
                            <MenuItem value={5}>Extremely Negative</MenuItem>                     
                            </Select>
                        </FormControl>   
                    </Grid>
                    <Grid item xs={8}>
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

export default VoterMapping
