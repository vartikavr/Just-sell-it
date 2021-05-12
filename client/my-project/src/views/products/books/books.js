import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Books = () => {

    const [allBooks, setAllBooks] = useState([]);
    const [isPending, setPending] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/books', {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const books = res.data;
                setAllBooks(books);
                console.log(allBooks, 'successful seed!');
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


    const handleSelect = (event) => {
        const id = event.target.id;
        console.log(id);
        console.log("event..", event.target)
        history.push(`/categories/books/${id}`);

    }

    const redirectTo = () => {
        history.push('/categories/books/new');
    }

    return (
        <div className="books">
            {isPending && <div><h4>pending ...</h4></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info sell-item" onClick={redirectTo}>
                        Sell Book
                    </button>
                    <div className="grid-display-products d-flex flex-row flex-wrap">
                        {allBooks.map((book) => (
                            <div className="card col-lg-2 pt-3 mt-3 ms-5 me-5 ps-3 pe-3">
                                <div className="col">
                                    <div className="col">
                                        <img className="img-fluid displayThumbnail" alt="" src={book.images[0].url}
                                            id={book._id}
                                            onClick={handleSelect}
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="card-body data-display-grid">
                                            <h2 className="card-title data-display-heading">{book.title}</h2>
                                            <h5 className="card-title data-display-subheading">Written By- {book.author}</h5>
                                            <p className="card-text data-display-price">
                                                ₹{book.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mb-3"></div>
                </div>
            }
        </div>
    );
}

export default Books;