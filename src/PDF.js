import { useTranslation } from 'react-i18next';

const PDF = () => {
    const { t } = useTranslation();
    
    return (
        <div>
            <h1>{t('pdf.pdf')}</h1>
            <div className="PDFLinks">
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book1.pdf`} target="_blank" rel="noopener noreferrer">{t('pdf.1')}</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book2pdf`} target="_blank" rel="noopener noreferrer">{t('pdf.2')}</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book3.pdf`} target="_blank" rel="noopener noreferrer">{t('pdf.3')}</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book4.pdf`} target="_blank" rel="noopener noreferrer">{t('pdf.4')}</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book5.pdf`} target="_blank" rel="noopener noreferrer">{t('pdf.5')}</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book6.pdf`} target="_blank" rel="noopener noreferrer">{t('pdf.6')}</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book7.pdf`} target="_blank" rel="noopener noreferrer">{t('pdf.7')}</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book8.pdf`} target="_blank" rel="noopener noreferrer">{t('pdf.8')}</a>
            </div>
        </div>
     );
}
 
export default PDF;