const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>ClassManager</h1>
            <div className="links">
                <a className="pdfLink" href="/pdf">download books</a>
                <a className="freeTimeLink" href="/freeTimes">Find Available Times</a>
                <a className="link" href="/">Calendar</a>
                <a className="link" href="/database">Students</a>
            </div>
        </nav>
    );
  }
   
  export default Navbar;