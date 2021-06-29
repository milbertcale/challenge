import {useState, useEffect} from 'react';
import{
    IonLabel,
    IonButton,
    IonSpinner,
    useIonToast,
    useIonLoading
} from '@ionic/react';

//import component
import OtpInput from 'react-otp-input';
import AccountWrapper from '../../components/AccountWrapper';
import NumberInput from '../../components/NumberInput';
import firebaseConfig from '../../firebase/firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/firestore';

//Import CSS
import '../../common.css'

const Register = ({history})=>{
    const [selectedCode, setSelectedCode] = useState("+65");
    const [canSubmit, setCanSubmit] = useState(false);
    const [mobileNumber, setMobileNumber] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [otp, setOtp] = useState("");
    const [registering,setRegistering]=useState(false);

    //For toast and loader
    const [presentToast,dismissToast] = useIonToast();
    const [presentLoading,dismissLoading] = useIonLoading();
    
    function onChangeHandler(_e){
        var mobNum = _e.detail.value;
        setMobileNumber(mobNum);
        setCanSubmit(mobNum>=7);
    }

    function onRegisterHandler(){
        setRegistering(true);
        var db = firebase.firestore();
        db.collection("users").doc(`${selectedCode}${mobileNumber}`).get().then(snapshot=>{
            if(snapshot.exists){
                presentToast("Mobile number already exist in the DB. Please sign-in",3000);
                setRegistering(false);
            }
            else{
                performOtp();
            }
        });
    }

    function performOtp(){
        window.appVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible"
            }
        );
        firebaseConfig.auth().signInWithPhoneNumber(`${selectedCode}${mobileNumber}`,window.appVerifier).then(_confirmResult=>{
            setRegistering(false);
            window.confirmResult = _confirmResult;
            setSubmitted(true);
            presentToast(`OTP has been sent to ${selectedCode}${mobileNumber}`,5000);
        }).catch(error=>{
            presentToast("Error occur:"+error,3000);
            setRegistering(false);
        })
    }

    function handleOtpInputChange(otp){
        if(otp.length===6){
            presentLoading("");
            window.confirmResult.confirm(otp).then(result=>{
                firebaseConfig.firestore().collection("users").doc(`${selectedCode}${mobileNumber}`).set({
                    createdDate:new Date().getTime()
                }).then(()=>{
                    dismissLoading();
                    setSubmitted(false);
                    // firebaseConfig.auth().signOut();
                    
                    presentToast(`You have successfully registered using your mobile number ${selectedCode}${mobileNumber}. Please sign in now.`,3000);
                    setTimeout(()=>{
                        // eslint-disable-next-line no-restricted-globals
                        history.replace('/login');
                        firebaseConfig.auth().signOut();
                    },3000);
                }).catch(error=>{
                    dismissLoading();
                    presentToast("Error registering your mobile number",3000);
                })
                
            }).catch(error=>{
                dismissLoading();
                presentToast("Verification code is wrong. Please try again",3000);
            })
        }
        setOtp(otp);
    }

    return <AccountWrapper>
        {submitted?
            <div>
                <IonLabel>Enter OTP to register</IonLabel>
                <OtpInput
                    containerStyle="otp-wrapper"
                    inputStyle="otp-input"
                    value={otp}
                    isInputNum={true}
                    onChange={handleOtpInputChange}
                    numInputs={6}
                />
                <IonButton fill={false}>Resend OTP</IonButton>
            </div>
            :
            <div>
                <IonLabel>Register using mobile number</IonLabel>
                <NumberInput
                    onChange = {onChangeHandler}
                    onCountryCodeSelected={value=>{
                        setSelectedCode(value.detail.value);
                    }}      
                    selectedCoutryCode={selectedCode}    
                />
                <div style={{display:"none"}} id="recaptcha-container"></div>
                <IonButton 
                    onClick={onRegisterHandler} 
                    className="login-btn-class" 
                    disabled={!canSubmit} 
                    expand="block" 
                    size="large">
                    {registering?<IonSpinner name="circles"/>:<></>}
                    REGISTER
                </IonButton>
                {!registering?
                    <IonButton 
                        style={{marginTop:20}}
                        className="link-class" 
                        fill="clear" 
                        autoCapitalize={false}
                        routerLink="/login">
                        Back to login
                    </IonButton>:<></>
                }
            </div>
        }
    </AccountWrapper>
}

export default Register;