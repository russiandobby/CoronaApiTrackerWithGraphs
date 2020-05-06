import React,{useEffect,useState} from 'react';
import coronaImage from "../../images/bacteria.png"; 
import styles from  './Title.module.css';
import cx from 'classnames';

function Title({darkMode}) {
    const [darkTheme,setDarkTheme] = useState(false);
    useEffect(() => {
        if(darkMode === true){
            
            setDarkTheme(true)
        }else{
        
            setDarkTheme(false)
        }
        
     },[darkMode]);
    
    return (
        <div>
           <span className={cx(styles.text, darkTheme ? styles.dark : null)}>C</span><span><img className={styles.image} src={coronaImage} alt="covid-19" /></span><span className={cx(styles.text, darkTheme ? styles.dark : null)}>VID-19</span>
        </div>
    )
}
export default Title;
