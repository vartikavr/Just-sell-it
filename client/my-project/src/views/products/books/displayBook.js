import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import FlashMessage from 'react-flash-message';
const DisplayBook = () => {

    console.log("book specific page...");
    const [isPending, setPending] = useState(true);
    const [addToWishlist, setAddToWishlist] = useState(false);
    const [message, setMessage] = useState(false);

    const { id: productId } = useParams();
    const [book, setBook] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [role, setRole] = useState('');
    const [wishlistBooks, setWishlistBooks] = useState([]);

    useEffect(() => {
        getBook();
    }, [addToWishlist]);

    const getBook = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/categories/books/${productId}`, {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log("book data: ", res.data.book);
                setBook(res.data.book);
                setCurrentUser(res.data.currentUser);
                setRole(res.data.role);
                setWishlistBooks(res.data.wishlistBooks);
                console.log(book, 'successful seed of our book!');
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
        axios.post(`http://localhost:5000/categories/books/${productId}/delete`, {

        }, axiosConfig)
            .then((res) => {
                console.log('successfully deleted book!');
                history.push('/categories/books');
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isOwner == false) {
                    history.push('/categories/books')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const imageUrls = book.images;

    const handleBack = () => {
        history.push('/categories/books');
    }

    const handleWishlist = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/user/wishlist/books/${productId}/add`, {

        }, axiosConfig)
            .then(() => {
                console.log('successfully added book in wishlist!');
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
            category: "books"
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
        <div className="displayBook">
            {isPending && <div><h4>Seeding book ...</h4></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info ms-4 mt-3 " onClick={handleBack}>
                        All Books
                    </button>
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
                        <div id="booksCarousel" className="col-md-6 carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                {imageUrls.map((img, i) => (
                                    <div className={"carousel-item " + (i == 0 ? 'active' : '')}>
                                        <img src={img.url} className="d-block w-100" alt="..." />
                                    </div>
                                ))}
                            </div>
                            {imageUrls.length > 1 &&
                                <div className="group">
                                    <a className="carousel-control-prev" href="#booksCarousel" role="button" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#booksCarousel" role="button" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </a>
                                </div>
                            }
                        </div>
                        <div className="card col-md-6 h-300">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-muted">Edition: {book.edition}</li>
                                <li className="list-group-item">Author: {book.author}</li>
                                <li className="list-group-item">Submitted by: {book.userId.username}</li>
                                <li className="list-group-item">Price: ₹{book.price}</li>
                                <li className="list-group-item">Pages: {book.pages}</li>
                            </ul>
                            <div class="card-body">
                                {currentUser !== '' && book.userId._id == currentUser && (
                                    <a className="card-link btn btn-info me-2" href={`/categories/books/${book._id}/edit`}>Edit</a>
                                )}
                                {currentUser !== '' && (book.userId._id == currentUser || role == "admin") && (
                                    <form className="d-inline" onSubmit={handleDelete}>
                                        <button className="btn btn-danger me-2">Delete</button>
                                    </form>
                                )}
                                {currentUser !== '' && book.userId._id !== currentUser && !(wishlistBooks.includes(productId)) && (
                                    <form className="d-inline" onSubmit={handleWishlist}>
                                        <button className="btn btn-info me-2">Add to Wishlist</button>
                                    </form>
                                )}
                                {currentUser !== '' && book.userId._id !== currentUser && (wishlistBooks.includes(productId)) && (
                                    <form className="d-inline">
                                        <button className="btn btn-info disabled me-2">Added in Wishlist</button>
                                    </form>
                                )}
                                {currentUser !== '' && (book.userId._id !== currentUser) && !message && (
                                    <form className="d-inline" onSubmit={handleChat}>
                                        <button className={"btn btn-info me-2 " + ((role == "admin") ? 'mt-2' : '')}>Contact Seller</button>
                                    </form>
                                )}
                                {currentUser !== '' && (book.userId._id !== currentUser) && message && (
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

export default DisplayBook;