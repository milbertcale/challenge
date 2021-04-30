import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton} from '@ionic/react';
import HistoryStockGraph from './component/HistoryStockGraph';
import Info from './component/Info';
import StockGraph from './component/StockGraph';
function History(props){
  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons>
            <IonBackButton text="Details" defaultHref={`${props.history.location.pathname.substring(0, props.history.location.pathname.lastIndexOf('/'))}`}></IonBackButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <h1 style={{textAlign:"center"}}>STOCK MARKET HISTORY</h1>
      <HistoryStockGraph symbol={props.match.params.symbol}/>
      <div style={{textAlign:"center", padding:20}}>
        <IonButton routerLink={`${props.history.location.pathname.substring(0, props.history.location.pathname.lastIndexOf('/'))}`}>Back</IonButton>
      </div>
    </IonContent>
  </IonPage>
}

export default History;