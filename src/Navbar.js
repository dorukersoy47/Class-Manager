import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import enFlag from './images/en.svg';
import trFlag from './images/tr.svg';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    }
    
    return (
        <nav className="navbar">
            <h1>ClassManager</h1>
            <div className="links">
                <a className="pdfLink" href="/pdf">{t('downloadBooks')}</a>
                <a className="freeTimeLink" href="/freeTimes">{t('findAvailableTimes')}</a>
                <a className="link" href="/">{t('calendar')}</a>
                <a className="link" href="/database">{t('students')}</a>
            </div>
            <img src={enFlag} alt="EN" style={{ cursor: "pointer", marginRight: "8px", marginLeft: "125px" }} onClick={() => changeLanguage("en")} />
            <img src={trFlag} alt="TR" style={{ cursor: "pointer" }} onClick={() => changeLanguage("tr")}/>
        </nav>
    );
  }
   
  export default Navbar;