const PDF = () => {
    return (
        <div>
            <h1>PDFs</h1>
            <div className="pdfLinks">
                <a href={`${process.env.PUBLIC_URL}/testpdf.pdf`} target="_blank" rel="noopener noreferrer">
                    Download Test PDF
                </a>
            </div>
        </div>
     );
}
 
export default PDF;