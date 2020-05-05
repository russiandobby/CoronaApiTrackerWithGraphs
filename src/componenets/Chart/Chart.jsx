import React,{useState,useEffect} from 'react';
import {fetchDailyData} from '../../api/index';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css';

function Chart({data:{confirmed,deaths,recovered},country,darkMode}) {
   
    const [dailyData,setDailyData] = useState([]);
    const [globalDr,setGlobalDr] = useState(0);
    const [darkTheme,setDarkTheme] = useState(false);
    
    

    useEffect(() => {
        const fetchApi = async()=>{
            setDailyData( await fetchDailyData());
        }  
        fetchApi();
    //    setGlobalDr((deaths.value/confirmed.value)*100);   
    },[]);

    useEffect(() => {
        
        if(confirmed){
            let deathRate = ((deaths.value / confirmed.value) * 100).toFixed(2);
            console.log(deathRate);
            setGlobalDr(deathRate);
        }
    //    setGlobalDr((deaths.value/confirmed.value)*100);   
    },[confirmed,deaths]);

    useEffect(() => {
       if(darkMode === true){
           console.log('dark is true');
           setDarkTheme(true)
       }else{
        console.log('dark is false');
           setDarkTheme(false)
       }
       
    },[darkMode]);
   

    const lineChart = (
        dailyData.length !== 0 ? (
        <Line 
        
        options={{
            title:{
                display:true,
                text:`Death Rate: ${globalDr}`,
                fontSize:20,
                fontColor:'red'
            },
            responsive:true,
            legend:{
                labels:{
                    fontColor:darkTheme ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
                    fontSize:15,
                    fontStyle:'bold'
                }
            },
            scales:{
                xAxes: [{
                    gridLines: {
                        color: darkTheme ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.1)' ,
                        lineWidth: 1
                    },
                    ticks: {
                      fontColor: darkTheme ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
                      fontSize:1 // this here
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: darkTheme ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.1)',
                        // lineWidth: 1
                    },
                    ticks: {
                      fontColor: darkTheme ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
                    //   fontSize:1 // this here
                    }
                }]
            }
        }}

        data={{
            
           
            labels:dailyData.map(({date}) => date),
            datasets:[{
                data:dailyData.map(({confirmed}) => confirmed),
                label:'Infected',
               
                borderColor:darkTheme ? '#ffe817' :'#3333ff',
               
                fill:true
            },{
                data:dailyData.map(({deaths}) => deaths),
                label:'Deaths',
                borderColor:'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill:true
            }],
        }}
        
        />
        ) : (
           null 
        )
        
    );

 

    const barChart = (
        confirmed 
        ? (
            <Bar
            
            data={{
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                    label:'People',
                    backgroundColor:['rgba(0, 0, 255, 0.5)','rgba(0, 255, 0, 0.5)','rgba(255, 0, 0, 0.5)'],
                    data:[confirmed.value,recovered.value,deaths.value]
                }]
            }}
            options={{
                legend:{display:false},
                fontSize:20,
                title:{display:true, text:`Current state in ${country}, with Death Rate of ${globalDr}`}
            }}
            />
        ) : (
            null
        )
    )



    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
         
        </div>
    )
}
export default Chart;