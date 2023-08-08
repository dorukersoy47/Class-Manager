const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>ClassManager</h1>
            <div className="links">
                <a className="freeTimeLink" href="/freeTimes">Find Free Lesson Time</a>
                <a className="link" href="/">Calendar</a>
                <a className="link" href="/database">Database</a>
            </div>
        </nav>
    );
  }
   
  export default Navbar;