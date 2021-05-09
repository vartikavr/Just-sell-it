import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const DisplayBook = () => {

    console.log("book specific page...");
    const [isPending, setPending] = useState(true);

    const { id: productId } = useParams();
    const [book, setBook] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        getBook();
    }, []);

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
                console.log(book, 'successful seed of our book!');
                setPending(false);
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
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
                console.log("error in client", e)
            })
    }

    const imageUrls = book.images;

    const handleBack = () => {
        history.push('/categories/books');
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
                        <div id="booksCarousel" className="col-md-6 carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                {imageUrls.map((img, i) => (
                                    <div className={"carousel-item " + (i == 0 ? 'active' : '')}>
                                        <img src={img.url} className="d-block w-100" alt="..." />
                                    </div>
                                ))}
                            </div>
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
                            {currentUser !== '' && book.userId._id == currentUser && (
                                <div class="card-body">
                                    <a className="card-link btn btn-info" href={`/categories/books/${book._id}/edit`}>Edit</a>
                                    &nbsp;
                                <form className="d-inline" onSubmit={handleDelete}>
                                        <button className="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default DisplayBook;