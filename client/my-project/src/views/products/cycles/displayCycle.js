import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import { useState, useEffect } from 'react';

const DisplayCycle = () => {

    console.log("cycle specific page...");
    const [isPending, setPending] = useState(true);
    const [addToWishlist, setAddToWishlist] = useState(false);
    const [message, setMessage] = useState(false);

    const { id: productId } = useParams();
    const [cycle, setCycle] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [role, setRole] = useState('');
    const [wishlistCycles, setWishlistCycles] = useState([]);

    useEffect(() => {
        getCycle();
    }, [addToWishlist]);

    const getCycle = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/categories/cycles/${productId}`, {
        }, axiosConfig)
            .then((res) => {
                console.log("cycle data: ", res.data.cycle);
                setCycle(res.data.cycle);
                setCurrentUser(res.data.currentUser);
                setRole(res.data.role);
                setWishlistCycles(res.data.wishlistCycles);
                console.log(cycle, 'successful seed of our cycle!');
                setPending(false);
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`http://localhost:5000/categories/cycles/${productId}/delete`, {

        }, axiosConfig)
            .then((res) => {
                console.log('successfully deleted cycle!');
                history.push('/categories/cycles');
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isOwner == false) {
                    history.push('/categories/cycles')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const imageUrls = cycle.images;

    const handleBack = () => {
        history.push('/categories/cycles');
    }

    const handleWishlist = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/user/wishlist/cycles/${productId}/add`, {

        }, axiosConfig)
            .then(() => {
                console.log('successfully added cycle in wishlist!');
                setAddToWishlist(true);
            })
            .catch((e) => {
                setAddToWishlist(false);
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const handleChat = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`http://localhost:5000/chat/${productId}`, {
            category: "cycles"
        }, axiosConfig)
            .then(() => {
                console.log('successfully message sent!');
                setMessage(true);
            })
            .catch((e) => {
                setMessage(false);
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const history = useHistory();

    return (
        <div className="displayCycle">
            {isPending && <div><h4>Seeding cycle ...</h4></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info ms-4 mt-3 " onClick={handleBack}>
                        All Cycles
                </button>
                    <div className="mt-5"></div>
                    <div className="row mainContent-item mt-5 d-flex align-items-center ms-auto me-auto">
                        {addToWishlist && (
                            <FlashMessage duration={5000}>
                                <div className="flash-success">
                                    <p>Product added to your wishlist!</p>
                                </div>
                            </FlashMessage>
                        )}
                        {message && (
                            <FlashMessage duration={5000}>
                                <div className="flash-success">
                                    <p>An email has been sent to you. Check inbox!</p>
                                </div>
                            </FlashMessage>
                        )}
                        <div id="cyclesCarousel" className="col-md-6 carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                {imageUrls.map((img, i) => (
                                    <div className={"carousel-item " + (i == 0 ? 'active' : '')}>
                                        <img src={img.url} className="d-block w-100" alt="..." />
                                    </div>
                                ))}
                            </div>
                            {imageUrls.length > 1 &&
                                <div className="group">
                                    <a className="carousel-control-prev" href="#cyclesCarousel" role="button" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#cyclesCarousel" role="button" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </a>
                                </div>
                            }
                        </div>
                        <div className="card col-md-6 h-300">
                            <div className="card-body">
                                <h5 className="card-title">{cycle.title}</h5>
                                <p className="card-text">{cycle.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Submitted by: {cycle.userId.username}</li>
                                <li className="list-group-item">Price: ₹{cycle.price}</li>
                                <li className="list-group-item">Model No: {cycle.modelNo}</li>
                                <li className="list-group-item text-muted">Age: {cycle.age}</li>
                            </ul>
                            <div class="card-body">
                                {currentUser !== '' && cycle.userId._id == currentUser && (
                                    <a className="card-link btn btn-info me-2" href={`/categories/cycles/${cycle._id}/edit`}>Edit</a>
                                )}
                                {currentUser !== '' && (cycle.userId._id == currentUser || role == "admin") && (
                                    <form className="d-inline" onSubmit={handleDelete}>
                                        <button className="btn btn-danger me-2">Delete</button>
                                    </form>
                                )}
                                {currentUser !== '' && cycle.userId._id !== currentUser && !(wishlistCycles.includes(productId)) && (
                                    <form className="d-inline" onSubmit={handleWishlist}>
                                        <button className="btn btn-info me-2">Add to Wishlist</button>
                                    </form>
                                )}
                                {currentUser !== '' && cycle.userId._id !== currentUser && (wishlistCycles.includes(productId)) && (
                                    <form className="d-inline">
                                        <button className="btn btn-info me-2 disabled">Added in Wishlist</button>
                                    </form>
                                )}
                                {currentUser !== '' && (cycle.userId._id !== currentUser) && !message && (
                                    <form className="d-inline" onSubmit={handleChat}>
                                        <button className={"btn btn-info me-2 " + ((role == "admin") ? 'mt-2' : '')}>Contact Seller</button>
                                    </form>
                                )}
                                {currentUser !== '' && (cycle.userId._id !== currentUser) && message && (
                                    <form className="d-inline" onSubmit={handleChat}>
                                        <button className="btn btn-info me-2 disabled">Email sent</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default DisplayCycle;