import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Cards from './componenets/Cards/Cards';
// import Chart from './componenets/Chart/Chart';
// import CountryPicker from './componenets/CountryPicker/CountryPicker';
import {Cards,Chart,CountryPicker} from './componenets';
import {fetchData} from './api'
import styles from './App.module.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       data:{}
    };  
}


async componentDidMount(){
  const data = await fetchData();
  console.log(data);
  this.setState({data:data})

}




  render(){
    const {data} = this.state;


    return(
      <div className={styles.container}>

        <Cards  data={data}/>
        <CountryPicker />
        <Chart />

      </div>
    )
  }
 
}

export default App;
