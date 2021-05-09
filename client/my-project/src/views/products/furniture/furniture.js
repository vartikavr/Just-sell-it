import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Furniture = () => {

    const [allFurniture, setAllFurniture] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        getAllFurniture();
    }, []);

    const getAllFurniture = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/furniture', {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const furniture = res.data;
                setAllFurniture(furniture);
                console.log(allFurniture, 'successful seed!');
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

    const handleSelect = (event) => {
        const id = event.target.id;
        console.log(id);
        console.log("event..", event.target)
        history.push(`/categories/furniture/${id}`);
    }
    const history = useHistory();

    const redirectTo = () => {
        history.push('/categories/furniture/new');
    }

    return (
        <div className="furniture">
            {isPending && <div><h4>pending ...</h4></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info sell-item" onClick={redirectTo}>
                        Sell furniture
                    </button>
                    <div className="ms-5 d-flex flex-row flex-wrap">
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
                                                ₹{f.price}
                                            </p>
                                            <p className="card-text">{f.description}</p>
                                            <button type="button" id={f._id} className="btn btn-info" onClick={handleSelect}>
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

export default Furniture;