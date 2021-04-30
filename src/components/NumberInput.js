import{
    IonSelect,
    IonSelectOption,
    IonInput,
} from '@ionic/react';

import countries from '../assets/json/countrys.json';

function NumberInput(props){
    return <div className="mobile-num-class">
        <div>
            <IonSelect 
                className="country-code-dd-class"
                interface="popover" 
                selectedText={props.selectedCoutryCode}
                onIonChange={props.onCountryCodeSelected}                    
            >
                {
                    countries.map(item=><IonSelectOption 
                                            key={item.code} value={item.dial_code}
                                        >
                                            {item.name+" "+item.dial_code}
                                        </IonSelectOption>
                    )
                }
            </IonSelect>
        </div>
        <div>
            <IonInput style={{width:"100%"}} onIonChange={props.onChange}/>
        </div>
    </div>
}

export default NumberInput;