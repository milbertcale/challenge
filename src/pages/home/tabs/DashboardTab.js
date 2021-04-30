import { IonContent,IonCard,IonCardHeader,IonCardSubtitle,IonCardTitle,IonCardContent, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import firebaseConfig from '../../../firebase/firebaseConfig';
import Followed from './components/Followed';

function DashboardTab(props){
    const [watchlist, setWatchlist] = useState([]);
    if(firebaseConfig.auth().currentUser!=null){
        firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.phoneNumber).get().then(snapshots=>{
            setWatchlist(snapshots.data()["watchlist"]);
        })
    }
    else{
    }
    return <IonContent
        className="dashboard-tab-class"
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}>
        <h1 style={{textAlign:"center", color:"white"}}>Dashboard</h1>
        {watchlist!==undefined&&watchlist.length>0?
            watchlist.map((item,index)=><Followed key={index} item={item} history={props.history}/>):
            <div style={{textAlign:"center",color:"white"}}>No data in your watchlist</div>
        }
    </IonContent>
}

export default DashboardTab;