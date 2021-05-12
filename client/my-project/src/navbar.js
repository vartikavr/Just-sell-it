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
                        {localStorage.getItem('isLoggedIn') && (
                            <div className="navbar-nav">
                                <a className="nav-item active" aria-current="page" href="/categories">Categories</a>
                            </div>
                        )}
                        {localStorage.getItem('isLoggedIn') && localStorage.getItem('isAuthorized') && (
                            <div className="navbar-nav">
                                <a className="nav-item active" aria-current="page" href="/admin/users">All Users</a>
                            </div>
                        )}
                        <div className="navbar-nav ms-auto">
                            {!localStorage.getItem('isLoggedIn') && (
                                <a className="nav-item d-block" href="/login">Login</a>
                            )}
                            {!localStorage.getItem('isLoggedIn') && (
                                <a className="nav-item d-block" href="/admin/register">Register as Admin</a>
                            )}
                            {!localStorage.getItem('isLoggedIn') && (
                                <a className="nav-item" href="/register">Register as User</a>
                            )}
                            {localStorage.getItem('isLoggedIn') && (
                                <a className="nav-item" href="/user">My Profile</a>
                            )}
                            {localStorage.getItem('isLoggedIn') && (
                                <a className="nav-item" href="/user/wishlist">My Wishlist</a>
                            )}
                            {localStorage.getItem('isLoggedIn') && (
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