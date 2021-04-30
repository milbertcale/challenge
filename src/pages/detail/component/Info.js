import { useEffect, useState } from "react";
import { ALPHA_VANTAGE_KEY } from "../../../config/constants";

function Info(props){
    const [info,setInfo]=useState({});
    
    useState(()=>{
        fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${props.symbol}&apikey=${ALPHA_VANTAGE_KEY}`)
        .then(response=>response.json())
        .then(data=>{
            setInfo(data);
        })
    })

    return <>
        <div style={{padding:"0px 20px"}}>
            <h1>{info["Name"]}</h1>
            {
                info["Description"]
            }
        </div>
    </>
}

export default Info;