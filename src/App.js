import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import Login from './pages/account/Login';
import Register from './pages/account/Register';
import Dashboard from './pages/home/Dashboard';
import Details  from './pages/detail/Details';
import History  from './pages/detail/History';
import firebaseConfig from './firebase/firebaseConfig';

/* Theme variables */
import './theme/variables.css';

const App = () => (
  <IonApp>
    <IonReactRouter>
      <Switch>
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/dashboard" exact render={({history,match})=>{
              if(firebaseConfig.auth().currentUser!==undefined)return <Dashboard history={history} match={match}/>
              return <Redirect to="/login" />
            }}/>
            <Route path="/dashboard/detail/:symbol" exact render={({history,match})=>{
              if(firebaseConfig.auth().currentUser!==undefined)return <Details history={history} match={match}/>
              return <Redirect to="/login" />
            }}/>
            <Route path="/dashboard/detail/:symbol/history" exact render={({history,match})=>{
              if(firebaseConfig.auth().currentUser!==undefined)return <History history={history} match={match}/>
              return <Redirect to="/login" />
            }}/>
            <Route path="/dashboard/detail/history" exact render={({history,match})=>{
              if(firebaseConfig.auth().currentUser!==undefined)return <History history={history} match={match}/>
              return <Redirect to="/login" />
            }}/>
      </Switch>
    </IonReactRouter>
  </IonApp>
);

function  Test(props){
  return <div>{props.match.params.symbol}</div>
}

export default App;
