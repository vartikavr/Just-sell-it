import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import config from '../../config';

const Wishlist = () => {

    const [books, setBooks] = useState([]);
    const [cycles, setCycles] = useState([]);
    const [furniture, setFurniture] = useState([]);
    const [handicrafts, setHandicrafts] = useState([]);
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [isPending, setIsPending] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        productInfo();
    }, [isDeleted]);

    useEffect(() => {
        totalPrice();
    }, [isPending]);

    const productInfo = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`${config.SERVER_URI}/user/wishlist`, {
        }, axiosConfig)
            .then(async (res) => {
                setIsPending(true);
                console.log("wishlist data seeded", res.data);
                setBooks(res.data.books);
                if (res.data.books.length != 0) {
                    setIsEmpty(false);
                }
                setCycles(res.data.cycles);
                if (res.data.cycles.length != 0) {
                    setIsEmpty(false);
                }
                setFurniture(res.data.furniture);
                if (res.data.furniture.length != 0) {
                    setIsEmpty(false);
                }
                setHandicrafts(res.data.handicrafts);
                if (res.data.handicrafts.length != 0) {
                    setIsEmpty(false);
                }
                setItems(res.data.others);
                if (res.data.others.length != 0) {
                    setIsEmpty(false);
                }
                console.log('successful completion of seed of wishlist!');
                setIsPending(false);
            })
            .catch((e) => {
                setIsPending(true);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const totalPrice = () => {
        var sum = 0;
        for (const index in books) {
            sum += books[index].price;
        }
        for (const index in cycles) {
            sum += cycles[index].price;
        }
        for (const index in furniture) {
            sum += furniture[index].price;
        }
        for (const index in handicrafts) {
            sum += handicrafts[index].price;
        }
        for (const index in items) {
            sum += items[index].price;
        }
        setPrice(sum);
    }

    const handleBookSelect = (event) => {
        const id = event.target.id;
        console.log(id);
        console.log("event..", event.target)
        history.push(`/categories/books/${id}`);
    }
    const handleCycleSelect = (event) => {
        const id = event.target.id;
        console.log(id);
        console.log("event..", event.target)
        history.push(`/categories/cycles/${id}`);
    }
    const handleFurnitureSelect = (event) => {
        const id = event.target.id;
        console.log(id);
        console.log("event..", event.target)
        history.push(`/categories/furniture/${id}`);
    }
    const handleHandicraftSelect = (event) => {
        const id = event.target.id;
        console.log(id);
        console.log("event..", event.target)
        history.push(`/categories/handicrafts/${id}`);
    }
    const handleOtherSelect = (event) => {
        const id = event.target.id;
        console.log(id);
        console.log("event..", event.target)
        history.push(`/categories/others/${id}`);
    }

    const handleBookRemove = (event) => {
        setIsDeleted(false);
        const id = event.target.id;
        console.log(id);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${config.SERVER_URI}/user/wishlist/books/${id}/delete`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("removed from wishlist");
                setIsDeleted(true);
            })
            .catch((e) => {
                setIsDeleted(false);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const handleCycleRemove = (event) => {
        setIsDeleted(false);
        const id = event.target.id;
        console.log(id);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${config.SERVER_URI}/user/wishlist/cycles/${id}/delete`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("removed from wishlist");
                setIsDeleted(true);
            })
            .catch((e) => {
                setIsDeleted(false);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const handleFurnitureRemove = (event) => {
        setIsDeleted(false);
        const id = event.target.id;
        console.log(id);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${config.SERVER_URI}/user/wishlist/furniture/${id}/delete`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("removed from wishlist");
                setIsDeleted(true);
            })
            .catch((e) => {
                setIsDeleted(false);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const handleHandicraftRemove = (event) => {
        setIsDeleted(false);
        const id = event.target.id;
        console.log(id);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${config.SERVER_URI}/user/wishlist/handicrafts/${id}/delete`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("removed from wishlist");
                setIsDeleted(true);
            })
            .catch((e) => {
                setIsDeleted(false);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const handleOtherRemove = (event) => {
        setIsDeleted(false);
        const id = event.target.id;
        console.log(id);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${config.SERVER_URI}/user/wishlist/others/${id}/delete`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("removed from wishlist");
                setIsDeleted(true);
            })
            .catch((e) => {
                setIsDeleted(false);
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
        <div className="wishlist">
            {isPending && isEmpty && <div><h4>loading ...</h4></div>}
            {!isPending && isEmpty && <div className="noProductsFound"><h4 className="text-center mt-3" style={{ fontSize: 30, color: "#94618E" }}>No products in wishlist.</h4></div>}
            {!isPending && (price !== 0) && <div className="wishlistPrice"><h4 className="text-center mt-3" style={{ fontSize: 30, color: "#94618E" }}>Total price of items in wishlist: ₹{price}</h4></div>}
            {!isPending && !isEmpty &&
                <div className="dataDisplay mt-3">
                    <div className="grid-display-products d-flex flex-row flex-wrap">
                        {books.map((book) => (
                            <div className="card col-lg-2 pt-3 mt-3 ms-5 me-5 ps-3 pe-3">
                                <div className="col">
                                    <div className="col">
                                        <img className="img-fluid displayThumbnail" alt="" src={book.images[0].url}
                                            id={book._id}
                                            onClick={handleBookSelect}
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="card-body data-display-grid-wishlist">
                                            <h2 className="card-title data-display-heading">{book.title}</h2>
                                            <p className="card-text data-display-subheading">
                                                <b> ₹{book.price}</b>
                                            </p>
                                            <button className="btn btn-danger"
                                                id={book._id}
                                                onClick={handleBookRemove}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {cycles.map((cycle) => (
                            <div className="card col-lg-2 pt-3 mt-3 ms-5 me-5 ps-3 pe-3">
                                <div className="col">
                                    <div className="col">
                                        <img className="img-fluid displayThumbnail" alt="" src={cycle.images[0].url}
                                            id={cycle._id}
                                            onClick={handleCycleSelect}
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="card-body data-display-grid-wishlist">
                                            <h2 className="card-title data-display-heading">{cycle.title}</h2>
                                            <p className="card-text data-display-subheading">
                                                <b>₹{cycle.price}</b>
                                            </p>
                                            <button className="btn btn-danger"
                                                id={cycle._id}
                                                onClick={handleCycleRemove}>
                                                Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {furniture.map((f) => (
                            <div className="card col-lg-2 pt-3 mt-3 ms-5 me-5 ps-3 pe-3">
                                <div className="col">
                                    <div className="col">
                                        <img className="img-fluid displayThumbnail" alt="" src={f.images[0].url}
                                            id={f._id}
                                            onClick={handleFurnitureSelect}
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="card-body data-display-grid-wishlist">
                                            <h2 className="card-title data-display-heading">{f.title}</h2>
                                            <p className="card-text data-display-subheading">
                                                <b>₹{f.price}</b>
                                            </p>
                                            <button className="btn btn-danger"
                                                id={f._id}
                                                onClick={handleFurnitureRemove}>
                                                Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {handicrafts.map((h) => (
                            <div className="card col-lg-2 pt-3 mt-3 ms-5 me-5 ps-3 pe-3">
                                <div className="col">
                                    <div className="col">
                                        <img className="img-fluid displayThumbnail" alt="" src={h.images[0].url}
                                            id={h._id}
                                            onClick={handleHandicraftSelect}
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="card-body data-display-grid-wishlist">
                                            <h2 className="card-title data-display-heading">{h.title}</h2>
                                            <p className="card-text data-display-subheading">
                                                <b>₹{h.price}</b>
                                            </p>
                                            <button className="btn btn-danger"
                                                id={h._id}
                                                onClick={handleHandicraftRemove}>
                                                Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {items.map((item) => (
                            <div className="card col-lg-2 pt-3 mt-3 ms-5 me-5 ps-3 pe-3">
                                <div className="col">
                                    <div className="col">
                                        <img className="img-fluid displayThumbnail" alt="" src={item.images[0].url}
                                            id={item._id}
                                            onClick={handleOtherSelect}
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="card-body data-display-grid-wishlist">
                                            <h2 className="card-title data-display-heading">{item.title}</h2>
                                            <p className="card-text data-display-subheading">
                                                <b>₹{item.price}</b>
                                            </p>
                                            <button className="btn btn-danger"
                                                id={item._id}
                                                onClick={handleOtherRemove}>
                                                Remove</button>
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

export default Wishlist;