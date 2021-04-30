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

const Login = ({history})=>{
    const [selectedCode, setSelectedCode] = useState("+65");
    const [canSubmit, setCanSubmit] = useState(false);
    const [mobileNumber, setMobileNumber] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [otp, setOtp] = useState("");
    const [loggingIn,setLoggingIn]=useState(false)

    //For toast and loader
    const [presentToast,dismissToast] = useIonToast();
    const [presentLoading,dismissLoading] = useIonLoading();

    function onChangeHandler(_e){
        var mobNum = _e.detail.value;
        setMobileNumber(mobNum);
        setCanSubmit(mobNum>=7);
    }

    function onLoginHandler(){
        setLoggingIn(true);
        var db = firebase.firestore();
        db.collection("users").doc(`${selectedCode}${mobileNumber}`).get().then(snapshot=>{
            if(snapshot.exists){
                performOtp();
            }
            else{
                presentToast("Mobile number does not exist in the DB. Please register.",3000);
                setLoggingIn(false);
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
            setLoggingIn(false);
            window.confirmResult = _confirmResult;
            setSubmitted(true);
            presentToast(`OTP has been sent to ${selectedCode}${mobileNumber}`,5000);
        }).catch(error=>{
            presentToast("Error occur:"+error,3000);
            setLoggingIn(false);
        })
    }

    function handleOtpInputChange(otp){
        if(otp.length===6){
            presentLoading("");
            window.confirmResult.confirm(otp).then(result=>{
                firebaseConfig.firestore().collection("users").doc(`${selectedCode}${mobileNumber}`).update({
                    lastLogin:new Date().getTime()
                }).then(()=>{
                    dismissLoading();
                    setSubmitted(false);
                    //redirect to the dashboard
                    history.replace('/dashboard');
                }).catch(error=>{
                    presentToast("Error logging in your mobile number",3000);
                })
                
            }).catch(error=>{
                presentToast("Verification code is wrong. Please try again",3000);
            })
        }
        setOtp(otp);
    }

    return <AccountWrapper>
        {submitted?
            <div>
                <IonLabel>Enter OTP to login</IonLabel>
                <OtpInput
                    containerStyle="otp-wrapper"
                    inputStyle="otp-input"
                    value={otp}
                    isInputNum={true}
                    onChange={handleOtpInputChange}
                    numInputs={6}
                />
                <IonButton fill={false} value="Resend in"/>
            </div>
            :
            <div>
                <IonLabel>Login using mobile number</IonLabel>
                <NumberInput
                    onChange = {onChangeHandler}
                    onCountryCodeSelected={value=>{
                        setSelectedCode(value.detail.value);
                    }}      
                    selectedCoutryCode={selectedCode}    
                />
                <div style={{display:"none"}} id="recaptcha-container"></div>
                <IonButton 
                    onClick={onLoginHandler} 
                    className="login-btn-class" 
                    disabled={!canSubmit} 
                    expand="block" 
                    size="large" 
                >
                    {loggingIn?<IonSpinner name="circles"/>:<></>}
                    LOGIN
                </IonButton>
                {!loggingIn?
                    <div style={{
                        marginTop:40, 
                        display:"flex", 
                        flexDirection:"row", 
                        alignItems:"center",
                        justifyContent:"center"
                        }}>
                        <IonLabel style={{
                            marginRight:5
                        }}>No Account?</IonLabel>
                        <IonButton 
                            className="link-class" 
                            fill="clear" 
                            autoCapitalize={false}
                            routerLink="/register">
                            Register here
                        </IonButton>
                    </div>:<></>
                }
                
            </div>
            }
    </AccountWrapper>
}

export default Login;