const PDF = () => {
    return (
        <div>
            <h1>PDFs</h1>
            <div className="PDFLinks">
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book1.pdf`} target="_blank" rel="noopener noreferrer">Download Book 1</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book2pdf`} target="_blank" rel="noopener noreferrer">Download Book 2</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book3.pdf`} target="_blank" rel="noopener noreferrer">Download Book 3</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book4.pdf`} target="_blank" rel="noopener noreferrer">Download Book 4</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book5.pdf`} target="_blank" rel="noopener noreferrer">Download Book 5</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book6.pdf`} target="_blank" rel="noopener noreferrer">Download Book 6</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book7.pdf`} target="_blank" rel="noopener noreferrer">Download Book 7</a>
                <a className="PDF" href={`${process.env.PUBLIC_URL}/Book8.pdf`} target="_blank" rel="noopener noreferrer">Download Book 8</a>
            </div>
        </div>
     );
}
 
export default PDF;