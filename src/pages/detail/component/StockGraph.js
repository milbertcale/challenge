import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import {ALPHA_VANTAGE_KEY} from '../../../config/constants';

function StockGraph(props){
    const [xValuesDates,setXValuesDates] = useState([]);
    const [yValuesPrice,setYValuesPrice] = useState([]);
    
    useState(()=>{
        let xArray=[];
        let yArray=[];
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${props.symbol}&interval=5min&outputsize=full&apikey=${ALPHA_VANTAGE_KEY}`)
        .then(response=>response.json())
        .then(data=>{
            console.log("HELLO");
            console.log(data);
            for(var date in data["Time Series (5min)"]){
                xArray.push(date);
                yArray.push(data["Time Series (5min)"][date]["1. open"]);
            }
            setXValuesDates(xArray);
            setYValuesPrice(yArray);
        })
    },[]);

    return <Plot
        data={[
        {
            x: xValuesDates,
            y: yValuesPrice,
            type: 'scatter',
            marker: {color: '#2F4057'},
        },
        ]}
        layout={ {width: window.innerWidth, height: 350} }
    />
}

export default StockGraph;