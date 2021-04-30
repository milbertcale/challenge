import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import {ALPHA_VANTAGE_KEY} from '../../../config/constants';
import csv from 'csvtojson';

function HistoryStockGraph(props){
    const [xValuesDates,setXValuesDates] = useState([]);
    const [yValuesPrice,setYValuesPrice] = useState([]);
    
    useState(()=>{
        let xArray=[];
        let yArray=[];
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${props.symbol}&interval=15min&slice=year1month1&apikey=${ALPHA_VANTAGE_KEY}`)
        .then(response=>response.text())
        .then(data=>{
            csv().fromString(data).then(data=>{
                
                for(var i=0;i<data.length;i++){
                    xArray.push(data[i]["time"]);
                    yArray.push(data[i]["open"]);
                }
                setXValuesDates(xArray);
                setYValuesPrice(yArray);
            });
        });
    })

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

export default HistoryStockGraph;