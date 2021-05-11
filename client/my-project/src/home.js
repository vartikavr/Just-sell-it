const Home = () => {
    return (
        <div className="home d-flex text-white bg-dark p-3 mx-auto flex-column">
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16">
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z" />
                        </svg>
                        &nbsp; Just Sell It</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {sessionStorage.getItem('isLoggedIn') && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/categories">Browse</a>
                                </li>
                            )}
                            {sessionStorage.getItem('isLoggedIn') && sessionStorage.getItem('isAuthorized') && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/users">Users</a>
                                </li>
                            )}
                            {sessionStorage.getItem('isLoggedIn') && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/user">Profile</a>
                                </li>
                            )}
                            {sessionStorage.getItem('isLoggedIn') && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/user/wishlist">Wishlist</a>
                                </li>
                            )}
                            {!sessionStorage.getItem('isLoggedIn') && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/register">Admin</a>
                                </li>
                            )}
                            {!sessionStorage.getItem('isLoggedIn') && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            )}
                            {!sessionStorage.getItem('isLoggedIn') && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            )}
                            {sessionStorage.getItem('isLoggedIn') && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/logout">Logout</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="main text-center mt-auto">
                <h2>Just Sell It</h2>
                <p>
                    An online selling - buying store<br />
                    Transactions made easy! </p>
            </div>
            <div className="footer text-center mt-auto text-white-50">
                <p>&copy; Made by and for students of Banasthali Vidyapith</p>
            </div>
        </div>
    );
}

export default Home;