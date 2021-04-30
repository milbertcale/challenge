import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { useState } from 'react';

import DashboardTab from './tabs/DashboardTab';
import SearchTab from './tabs/SearchTab';

import './Dashboard.css';

const Dashboard=({history,match})=>{
    const [value, setValue] = useState("dashboard");

    return <div className="dashboard-wrapper">
        <div>
            <Tabs history={history} value={value}/>
        </div>
        <BottomNavigation 
            value={value}
            showLabels
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Dashboard" value="dashboard" icon={<DashboardIcon />} />
            <BottomNavigationAction label="Find" value="findpage" icon={<FindInPageIcon />} />
        </BottomNavigation>
    </div>
}

function Tabs(props){
    if(props.value==="dashboard"){
        return <DashboardTab history={props.history}/>
    }
    return <SearchTab history={props.history}/>
}

export default Dashboard;