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
                console.log("error in client", e)
            })
    }


    const handleSelect = (event) => {
        const id = event.target.id;
        console.log(id);
        console.log("event..", event.target)
        history.push(`/categories/books/${id}`);
        // const axiosConfig = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
        // axios.post('http://localhost:5000/categories/books', {
        //     productId: id
        // },
        //     axiosConfig)
        //     .then((res) => {
        //         console.log('successfully sent id for the book!');
        //         console.log("ok", id);
        //         console.log("book details-", res.data);
        //         setBook(res.data);
        //         //global.selectedProduct = res.data;
        //         //console.log("global-", global.selectedProduct)
        //         //history.push(`/categories/books/${id}`);
        //         //console.log(name, username, email);
        //     })
        //     .catch((e) => {
        //         console.log("error in client", e)
        //     })

    }

    const redirectTo = () => {
        history.push('/categories/books/new');
    }

    return (
        <div className="books">
            {isPending && <div><h1>pending ...</h1></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <h1>All books - </h1>
                    <button type="button" className="btn btn-info" onClick={redirectTo}>
                        Add new book to sell
                    </button>
                    {allBooks.map((book) => (
                        <div className="card mt-3 ms-3 me-3">
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <img className="img-fluid" alt="" src={book.images[0].url} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <button type="button" id={book._id} className="btn btn-info" onClick={handleSelect}>
                                            View
                                        </button>
                                        <h2 className="card-title">{book.title}</h2>
                                        <h5 className="card-title">Written By- {book.author}</h5>
                                        <p className="card-text">
                                            <small>₹{book.price}</small>
                                        </p>
                                        <p className="card-text">{book.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Books;