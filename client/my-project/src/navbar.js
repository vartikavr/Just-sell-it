const Navbar = () => {
    return (
        <div className="header">
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Just Sell It</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {sessionStorage.getItem('currentUser') && (
                            <div className="navbar-nav">
                                <a className="nav-item active" aria-current="page" href="/categories">Select Category</a>
                            </div>
                        )}
                        <div className="navbar-nav ms-auto">
                            {!sessionStorage.getItem('currentUser') && (
                                <a className="nav-item d-block" href="/login">Login</a>
                            )}
                            {!sessionStorage.getItem('currentUser') && (
                                <a className="nav-item" href="/register">Register</a>
                            )}
                            {sessionStorage.getItem('currentUser') && (
                                <a className="nav-item" href="/logout">Logout</a>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div >
    );
}

export default Navbar;