import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const DisplayBook = () => {

    //     const [book, setBook] = useState('');
    console.log("book specific page...");
    //const book = props.book; 
    //const book = global.selectedProduct;
    //console.log("book- ", book);
    const [isPending, setPending] = useState(true);
    //eventBus.remove("sendSelectedProduct");
    //window.location.href = `http://localhost:3000/categories/books/${book._id}`;

    const { id: productId } = useParams();
    const [book, setBook] = useState('');

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
                console.log(book, 'successful seed of our book!');
                setPending(false);
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const handleDelete = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`http://localhost:5000/categories/books/${productId}/delete`, {

        }, axiosConfig)
            .then((res) => {
                console.log('successfully deleted book!');
                history.go(-1);
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const imageUrls = book.images;

    const handleBack = () => {
        history.go(-1);
    }
    const history = useHistory();
    return (
        <div className="displayBook">
            {isPending && <div>Seeding book ...</div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info" onClick={handleBack}>
                        Back to all Books
                </button>
                    <div id="booksCarousel" className="carousel slide" data-bs-ride="carousel">
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
                    <div className="card mb-3">
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
                        {sessionStorage.getItem('currentUser') && book.userId._id == sessionStorage.getItem('currentUser') && (
                            <div class="card-body">
                                <a className="card-link btn btn-info" href={`/categories/books/${book._id}/edit`}>Edit</a>
                                &nbsp;
                            <form className="d-inline" action="/">
                                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default DisplayBook;