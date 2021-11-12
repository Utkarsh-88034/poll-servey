import React from 'react'
import { Paper, Grid , TextField,Container,AppBar,Tab,Tabs,
    Typography ,RadioGroup,MenuItem,Select,
    FormControlLabel,Radio, Divider ,Button,FormHelperText,FormControl,InputLabel
} from '@material-ui/core'

const Survay = (props) => {
    const {classes} = props;
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>        
            <Paper style={{ padding: 10 }} variant="outlined" square  >
                <Grid container spacing={1} direction="row" justify="space-around"  alignItems="flex-start">
                <Grid item xs={4} >
                    <TextField                        
                            margin="normal"
                            required
                            fullWidth
                            id="surveySerachText"
                            label="VoterID/Mobile No."
                            name="surveySerachText"
                            autoComplete="surveySerachText"                          
                                
                    />                  
                       
                </Grid>  
                <Grid item xs={8} align="left" style={{marginTop : 20}}>
                    <Button variant="contained" size="medium" color="primary" type="submit" >Search</Button>   
                </Grid>    
             </Grid> 
             <AppBar position="static" color="transparent" elevation={0} >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"                
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="secondary"                  
                >
                    <Tab label="Voter Mapping"/>
                    <Tab label="Disposition" />
                    <Tab label="Booth level workers"/>  
                    <Tab label="Connect to your voters" />
                    <Tab label="D day solution"/>                 
                </Tabs>
            </AppBar>            
            </Paper>  
            <br/>            
         
      </div>
    )
}

export default Survay
