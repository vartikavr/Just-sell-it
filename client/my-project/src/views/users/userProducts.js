import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const UserProducts = () => {

    const [allBooks, setAllBooks] = useState([]);
    const [allCycles, setAllCycles] = useState([]);
    const [allFurniture, setAllFurniture] = useState([]);
    const [allHandicrafts, setAllHandicrafts] = useState([]);
    const [allOthers, setAllOthers] = useState([]);
    const [isPending, setPending] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        getAllBooks();
        getAllCycles();
        getAllFurniture();
        getAllHandicrafts();
        getAllOthers();
    }, []);


    const getAllBooks = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/user/books', {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const books = res.data;
                setAllBooks(books);
                if (books.length != 0) {
                    setIsEmpty(false);
                }
                console.log(allBooks, 'successful seed!');
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                console.log("error in client", e)
            })
    }
    const getAllCycles = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/user/cycles', {

        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const cycles = res.data;
                setAllCycles(cycles);
                if (cycles.length != 0) {
                    setIsEmpty(false);
                }
                console.log(allCycles, 'successful seed!');
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                console.log("error in client", e)
            })
    }
    const getAllFurniture = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/user/furniture', {

        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const furniture = res.data;
                setAllFurniture(furniture);
                if (furniture.length != 0) {
                    setIsEmpty(false);
                }
                console.log(allFurniture, 'successful seed!');
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                console.log("error in client", e)
            })
    }
    const getAllHandicrafts = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/user/handicrafts', {

        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const handicrafts = res.data;
                setAllHandicrafts(handicrafts);
                console.log(handicrafts)
                if (handicrafts.length != 0) {
                    setIsEmpty(false);
                }
                console.log(allHandicrafts, 'successful seed!');
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                console.log("error in client", e)
            })
    }
    const getAllOthers = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/user/others', {

        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const others = res.data;
                setAllOthers(others);
                if (others.length != 0) {
                    setIsEmpty(false);
                }
                console.log(allOthers, 'successful seed!');
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
    const history = useHistory();

    return (
        <div className="UserProducts">
            <button className="btn btn-secondary col-md-6 rounded-0"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/user';
                }}>
                My Profile
            </button>
            <button className="btn btn-info col-md-6 rounded-0">
                My Products
            </button>
            {isPending && isEmpty && <div><h4>loading ...</h4></div>}
            {!isPending && isEmpty && <div className="noProductsFound"><h4 className="text-center mt-3">No products found.</h4></div>}
            {!isPending && !isEmpty &&
                <div className="dataDisplay mt-3">
                    <div className="ms-5 d-flex flex-row flex-wrap">
                        {allBooks.map((book) => (
                            <div className="card col-lg-3 pt-3 mt-3 ms-5 me-5 ps-lg-3">
                                <div className="col">
                                    <div className="col ps-sm-5 ps-lg-0">
                                        <img className="img-fluid displayThumbnail" alt="" src={book.images[0].url} />
                                    </div>
                                    <div className="col">
                                        <div className="card-body ps-sm-5 ps-lg-0">
                                            <h2 className="card-title">{book.title}</h2>
                                            <p className="card-text">
                                                <small>₹{book.price}</small>
                                            </p>
                                            <button type="button" id={book._id} className="btn btn-info" onClick={handleBookSelect}>
                                                View
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {allCycles.map((cycle) => (
                            <div className="card col-lg-3 pt-3 mt-3 ms-5 me-5 ps-lg-3">
                                <div className="col">
                                    <div className="col ps-sm-5 ps-lg-0">
                                        <img className="img-fluid displayThumbnail" alt="" src={cycle.images[0].url} />
                                    </div>
                                    <div className="col">
                                        <div className="card-body ps-sm-5 ps-lg-0">
                                            <h2 className="card-title">{cycle.title}</h2>
                                            <p className="card-text">
                                                <small>₹{cycle.price}</small>
                                            </p>
                                            <button type="button" id={cycle._id} className="btn btn-info" onClick={handleCycleSelect}>
                                                View
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {allFurniture.map((f) => (
                            <div className="card col-lg-3 pt-3 mt-3 ms-5 me-5 ps-lg-3">
                                <div className="col">
                                    <div className="col ps-sm-5 ps-lg-0">
                                        <img className="img-fluid displayThumbnail" alt="" src={f.images[0].url} />
                                    </div>
                                    <div className="col">
                                        <div className="card-body ps-sm-5 ps-lg-0">
                                            <h2 className="card-title">{f.title}</h2>
                                            <p className="card-text">
                                                <small>₹{f.price}</small>
                                            </p>
                                            <button type="button" id={f._id} className="btn btn-info" onClick={handleFurnitureSelect}>
                                                View
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {allHandicrafts.map((h) => (
                            <div className="card col-lg-3 pt-3 mt-3 ms-5 me-5 ps-lg-3">
                                <div className="col">
                                    <div className="col ps-sm-5 ps-lg-0">
                                        <img className="img-fluid displayThumbnail" alt="" src={h.images[0].url} />
                                    </div>
                                    <div className="col">
                                        <div className="card-body ps-sm-5 ps-lg-0">
                                            <h2 className="card-title">{h.title}</h2>
                                            <p className="card-text">
                                                <small>₹{h.price}</small>
                                            </p>
                                            <button type="button" id={h._id} className="btn btn-info" onClick={handleHandicraftSelect}>
                                                View
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {allOthers.map((item) => (
                            <div className="card col-lg-3 pt-3 mt-3 ms-5 me-5 ps-lg-3">
                                <div className="col">
                                    <div className="col ps-sm-5 ps-lg-0">
                                        <img className="img-fluid displayThumbnail" alt="" src={item.images[0].url} />
                                    </div>
                                    <div className="col">
                                        <div className="card-body ps-sm-5 ps-lg-0">
                                            <h2 className="card-title">{item.title}</h2>
                                            <p className="card-text">
                                                <small>₹{item.price}</small>
                                            </p>
                                            <button type="button" id={item._id} className="btn btn-info" onClick={handleOtherSelect}>
                                                View
                                        </button>
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

export default UserProducts;