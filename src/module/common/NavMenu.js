import DashboardIcon from '@material-ui/icons/Dashboard';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import SettingsIcon from '@material-ui/icons/Settings'
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dashboard from '../home/Dashboard/Dashboard';
import Survay from '../home/Survay/Survay';
import ManageCustomer from '../home/Customer/ManageCustomer';
import CustomerAdd from '../home/Customer/CustomerAdd';
import UserAdd from '../home/User/UserAdd';
import ManageUser from '../home/User/ManageUser';
import Settings from '../home/Settings/Settings';
import CompanyAdd from '../home/Company/CompanyAdd';
import CompanyManage from '../home/Company/CompanyManage';

const NavMenu = {
     "sideMenu":[
        {
           "label":"Dashboard",
           "code":"dash-1",
           "link":"/home/dashboard",
           "Icon":DashboardIcon,
           "active":true,
           "show" :  true,
           "page": Dashboard,
        },
        {
           "label":"Survay",
           "code":"surv-1",
           "link":"/home/survay",
           "Icon":QuestionAnswerIcon,
           "show" :  true,
           "active":true,
           "page": Survay,
        },
        {
         "label":"Company",
         "code":"copm-1",
         "link":"",
         "Icon": BusinessIcon,
         "active":true,
         "show" :  true,
         "items":[
            {
               "label":"New Company",
               "code":"copm-new-1",
               "link":"/home/newcompany",
               "Icon":"",
               "active":true,
               "show" :  true,
               "page": CompanyAdd,
            },
            {
             "label":"Edit Company",
             "code":"copm-edit-1",
             "link":"/home/editcompany",
             "Icon":"",
             "active": true,
             "show" :  false,
             "page": CompanyAdd,
            },
            {
               "label":"Manage Company",
               "code":"copm-man-2",
               "link":"/home/managecompany",
               "Icon":"",
               "active":true,
               "show" :  true,
               "page": CompanyManage,
            }
         ]
        },
        {
           "label":"Customer",
           "code":"cust-1",
           "link":"",
           "Icon":PeopleIcon,
           "active":true,
           "show" :  true,
           "items":[              
              {
                 "label":"New Customer",
                 "code":"cust-new-1",
                 "link":"/home/newcustomer",
                 "Icon":"",
                 "active":true,
                 "show" :  true,
                 "page": CustomerAdd,
              },
              {
                 "label":"Manage Customer",
                 "code":"cust-man-1",
                 "link":"/home/managecustomer",
                 "Icon":"",
                 "active":true,
                 "show" :  true,
                 "page": ManageCustomer,
              }
           ]
        },
        {
           "label":"User",
           "code":"user-1",
           "link":"",
           "Icon":PersonIcon,
           "active":true,
           "show" :  true,
           "items":[
              {
                 "label":"New User",
                 "code":"user-new-1",
                 "link":"/home/newuser",
                 "Icon":"",
                 "active":true,
                 "show" :  true,
                 "page": UserAdd,
              },
              {
               "label":"Edit User",
               "code":"user-edit-1",
               "link":"/home/edituser",
               "Icon":"",
               "active": true,
               "show" :  false,
               "page": UserAdd,
              },
              {
                 "label":"Manage User",
                 "code":"user-man-2",
                 "link":"/home/manageuser",
                 "Icon":"",
                 "active":true,
                 "show" :  true,
                 "page": ManageUser,
              }
           ]
        },
        {
           "label":"Setting",
           "code":"sett-1",
           "link":"/home/setting",
           "Icon":SettingsIcon,
           "active":true,
           "show" :  true,
           "page": Settings,
        }
     ],
     "profileAppbarMenu":[
        {
           "label":"Account setting",
           "code":"pam-1-account",
           "link":"/home/setting",
           "Icon":SettingsIcon,
           "active":true,
           "show" :  true,
           "page": Settings,
        },
        {
           "label":"Disable alert",
           "code":"pam-1-disalert",
           "link":"",
           "Icon":NotificationsOffIcon,
           "active":true,
           "show" :  true,
           "page": Settings,
        },
        {
           "label":"Sign out",
           "code":"pam-1-signout",
           "link":"/home/logoutsetting",
           "Icon":ExitToAppIcon,
           "active":true,
           "show" :  true,
           "page": Settings,
        }
     ]
  }

export default NavMenu;

 