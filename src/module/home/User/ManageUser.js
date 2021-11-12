import React from 'react'

import * as UserService from "../Service/UserService"
import {selectAuthState} from "../../login/LoginSlice"; 
import { useSelector } from "react-redux";
import {HTTP} from "../../common"

import {Paper, Button,ButtonGroup,Container} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';


import {
  SearchState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  PagingState,
  SortingState,
  
} from "@devexpress/dx-react-grid";
import {
  SearchPanel,
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
  Toolbar,
  VirtualTable,
  TableColumnVisibility,
  ColumnChooser,
  TableFixedColumns,
} from "@devexpress/dx-react-grid-material-ui";
import * as axios from  "axios";

const columns = [
  { name: "name", title: "Name" , columnName: "name", width : 280},
  { name: "contactNo", title: "Mobile" , columnName: "contactNo", width : 200},
  { name: "email", title: "Mail" , columnName: "email", width : 280 },
  { name: "gender", title: "Sex" , columnName: "gender",align: 'center', width : 100},
  { name: "userType", title: "Type" , columnName: "userType" , width : 100},
  { name: "isActive", title: "Status" , columnName: "isActive", width : 100},
  { name: "id", title: "User Id" , columnName: "id", width : 100},
  { name: "action", title: "Action" , columnName: "action", width : 180},
];





const getHiddenColumnsFilteringExtensions = hiddenColumnNames => hiddenColumnNames
  .map(columnName => ({
    columnName,
    predicate: () => false,
}));




const ManageUser = () => {


  const authState = useSelector(selectAuthState);
  const [users,setUsers] = React.useState([]);
  const history = useHistory();


  const [defaultHiddenColumnNames] = React.useState(['action']);
  const [filteringColumnExtensions, setFilteringColumnExtensions] = React.useState(
    getHiddenColumnsFilteringExtensions(defaultHiddenColumnNames),
  );

  const onHiddenColumnNamesChange = hiddenColumnNames => setFilteringColumnExtensions(
    getHiddenColumnsFilteringExtensions(hiddenColumnNames),
  ); 


  const [rightColumns] = React.useState(["action"]);

  const [sortingStateColumnExtensions] = React.useState([
    { columnName: 'action', sortingEnabled: false , align: 'center'},
  ]);

  const [tableColumnExtensions] = React.useState(columns);

  const onEdit = (id) => {
    const idValue = window.btoa(id);
    history.push(`${"/home/edituser/?_usid="+idValue}`);
    
  }
  const onDelete = (id) =>{

  }

    
  React.useEffect(()=>{

    async function fetchData() {
      try{
        const response = await  UserService.fetchUsersInfo(authState,setUsers);
        if(response.status===HTTP.CODE.OK){
          setUsers(mapUserArrayToDataTable(response.data.users));     
        }
      }catch(error){
          console.log(error.response);
      }
    }
    fetchData();

  },[]);


const mapUserArrayToDataTable= (usersArr)=>{
    return usersArr.map((user) =>{
          return {
            "name": `${user.basicInfo.firstName +" "+ user.basicInfo.lastName}`,
            "contactNo": user.basicInfo.contactNo,
            "email": user.basicInfo.email,
            "gender": user.basicInfo.gender,
            "userType": user.basicInfo.userType,
            "isActive": user.basicInfo.isActive ? "Yes" : "No",
            "id": user.userId,
            "action" :  <ButtonGroup color="primary" aria-label="outlined primary button group">
                          <Button onClick={()=>onEdit(user.userId)}> <EditIcon /></Button>
                          <Button onClick={()=>onDelete(user.userId)}> <DeleteIcon /></Button>                   
                        </ButtonGroup>,
          }
        }
     )
  };
   
   
  
    return (
        

      <Container component="main" fixed>
           <Paper >
                <Grid rows={users} columns={columns} >

                <SortingState
                    defaultSorting={[{ columnName: "firstName", direction: "asc" }]}
                    columnExtensions={sortingStateColumnExtensions}
                  />
                  
                  <IntegratedSorting />
                  <PagingState defaultCurrentPage={0} pageSize={100} />
                  <IntegratedPaging />
                  <SearchState defaultValue="" />
                  <IntegratedFiltering
                    columnExtensions={filteringColumnExtensions}
                  />                
                  
                  <Table />
                  <VirtualTable  columnExtensions={tableColumnExtensions}
                  />
                  
                   <TableHeaderRow showSortingControls={true} />

                   <TableColumnVisibility
                      defaultHiddenColumnNames={defaultHiddenColumnNames}
                      onHiddenColumnNamesChange={onHiddenColumnNamesChange}
                    />
                  <TableFixedColumns          
                    rightColumns={rightColumns}
                  /> 
                  <Toolbar />              
                
                         
                  <SearchPanel />
                  <ColumnChooser />       
                  <PagingPanel />                 
                  
                   
                </Grid>
            </Paper>
        </Container>
    )
}

export default ManageUser
