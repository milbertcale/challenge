import { IonContent,IonSearchbar, IonList, IonItem, IonLabel, IonAvatar, IonButton } from '@ionic/react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectHits, connectSearchBox } from 'react-instantsearch-dom';
import {ALGOLIA_ID, ALGOLIA_KEY} from '../../../config/constants';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../../firebase/firebaseConfig';
import { useState } from 'react';

var history;
function SearchTab(props){
    const searchClient = algoliasearch(
        ALGOLIA_ID,
        ALGOLIA_KEY
    );
    history = props.history;

    return <div className="search-tab-wrapper-class">
        <h1>Search Instruments</h1>
        <InstantSearch indexName="nasdaq" searchClient={searchClient}>
            <CustomSearchBox />
            <div style={{height:10}}/>
            <IonContent
                className="search-tab-class"
                scrollEvents={true}
                onIonScrollStart={() => {}}
                onIonScroll={() => {}}
                onIonScrollEnd={() => {}}>
                <CustomHits/>
            </IonContent>
        </InstantSearch>
    </div>
}

function SearchBox({currentRefinement, isSearchStalled, refine }){
    return <IonSearchbar 
        className="search-field-class" 
        value={currentRefinement}
        onIonChange={event => {
            refine(event.currentTarget.value)
        }}
        animated/>
}

const CustomSearchBox = connectSearchBox(SearchBox);

function Hits({ hits }){
    const [list, setList]=useState([]);
    if(firebaseConfig.auth().currentUser!=null){
        firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.phoneNumber).get().then(snapshots=>{
            var watchlist = snapshots.data()["watchlist"];
            if(watchlist===undefined) watchlist=[];
            setList(watchlist);
        })
    }
    else{
    }
    return <>
       {
           hits.map((item,index) => {
               return <div key={index} className="custom-searched-item-class" onClick={()=>selectItem(item)}>
                   <div>{item["Symbol"]}</div>
                   <div>
                       <h3>{item["Company Name"]}</h3>
                       <IonLabel>{item["Security Name"]}</IonLabel>
                   </div>
                   <div>
                       <IonButton 
                            disabled={list.indexOf(item["Symbol"])>=0}
                            style={{marginRight:20}}
                            onClick={e=>{
                                e.stopPropagation();
                                if(firebaseConfig.auth().currentUser!=null){
                                    firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.phoneNumber).get().then(snapshots=>{
                                        var watchlist = snapshots.data()["watchlist"];
                                        setList(watchlist);
                                        if(watchlist.indexOf(item["Symbol"])<0){
                                            watchlist.push(item["Symbol"]);
                                            firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.phoneNumber).set({
                                                watchlist:watchlist
                                            }).then(()=>{
                                                setList(watchlist);
                                            });
                                    }

                                })
                            }
                            else{
                            }
                       }}>
                           {list.indexOf(item["Symbol"])>=0?"FOLLOWED":"FOLLOW"}
                       </IonButton>
                   </div>
               </div>
           })
       }
    </>
}

function selectItem(item){
    history.push(`/dashboard/detail/${item["Symbol"]}`)
}

const CustomHits = connectHits(Hits);

export default SearchTab;