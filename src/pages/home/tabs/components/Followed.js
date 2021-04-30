import {IonCard,IonCardHeader,IonCardTitle,IonCardContent, IonButton, useIonAlert } from '@ionic/react';
import { useEffect } from 'react';
import firebaseConfig from '../../../../firebase/firebaseConfig';
import StockGraph from '../../../detail/component/StockGraph';

function Followed(props){
    const [present] = useIonAlert();
    return <IonCard>
        <IonCardHeader>
            <IonCardTitle>{props.item}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            <StockGraph symbol={props.item}/>
        </IonCardContent>
        <div style={{textAlign:"center",margin:20}}>
            <IonButton routerLink={`${props.history.location.pathname}/dashboard/history`} >View Stock History</IonButton>
            <IonButton  onClick={()=>{
                present({
                    cssClass: 'my-css',
                    header: 'Unfollow',
                    message: 'Are you sure you want to remove this instrument from watchlist?',
                    buttons: [
                      'No',
                      { text: 'Yes', handler: (d) => {
                        if(firebaseConfig.auth().currentUser!=null){
                            firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.phoneNumber).get().then(snapshots=>{
                                var watchlist = snapshots.data()["watchlist"];
                                watchlist.splice(watchlist.indexOf(props.item),1);
                                firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.phoneNumber).set({
                                    watchlist:watchlist
                                }).then(()=>{
                                    
                                })
                            })
                        }
                        else{
                            
                        }
                      }},
                    ],
                    onDidDismiss: (e) => console.log('did dismiss'),
                })
            }} color="danger">Remove</IonButton>
        </div>
    </IonCard>
}

export default Followed;