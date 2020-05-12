import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import Cards from './componenets/Cards/Cards';
// import Chart from './componenets/Chart/Chart';
// import CountryPicker from './componenets/CountryPicker/CountryPicker';
import { Cards, Chart, CountryPicker } from "./componenets";
import { fetchData } from "./api";
import styles from "./App.module.css";
import coronaImage from "./images/covid-main-image.png";
import Title from './componenets/Title/Title';

// MUI
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Switch, FormControlLabel,Paper } from "@material-ui/core";
import BrightnessIcon from '@material-ui/icons/Brightness5';
import Moon from '@material-ui/icons/NightsStay';

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#e91e63",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#faeb00",
      dark: "#ba000d",
      contrastText: "#000",
      white: "#ffffff",
    },
    type: "light",
  },
});
const darkTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#e91e63",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#faeb00",
      dark: "#ba000d",
      contrastText: "#000",
      white: "#ffffff",
    },
    type: "dark",
  }
  
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      country: "",
      theme: mainTheme,
      darkMode:false
    };
  }

  async componentDidMount() {
    const data = await fetchData();
    // console.log(data);
    this.setState({ data: data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    // console.log(country);
    // console.log(data);
    // Fetch Data
    this.setState({ data: data, country: country });
    // set the state
  };

  useDarkMode = () => {
    const {
      palette: { type },
    } = this.state.theme;
    console.log("TYPE:" + type);

      if(type === 'light'){
        this.setState({theme:darkTheme,darkMode:!this.state.darkMode})
      } else {
        this.setState({theme:mainTheme,darkMode:!this.state.darkMode})
      }

    // const updatedTheme = {
    //   ...this.state.theme,
    //   palette: {
    //     ...this.state.theme.palette,
    //     type: type === "light" ? "dark" : "light",
    //   },
    // };

    // this.setState({ theme: updatedTheme, count: 1 }, () =>
    //   console.log(this.state.theme)
    // );
  };

  render() {
    const { data, country, theme,darkMode } = this.state;

    const themeConfig = createMuiTheme(theme);
    console.log(data);
    return (
      <MuiThemeProvider theme={themeConfig}>
        <Paper style={{minHeight:"100vh"}} square>
        <div className={styles.container}>
       
          <FormControlLabel label={darkMode ? <Moon className={styles.themeIcon}/> : <BrightnessIcon className={styles.themeIcon}/>} className={styles.switch} control={<Switch onClick={this.useDarkMode}/>} /> 
          
          <Title darkMode={darkMode} />
          <Cards data={data} darkMode={darkMode}/>
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} darkMode={darkMode} />
        </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
