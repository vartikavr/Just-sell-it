import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Cycles = () => {

    const [allCycles, setAllCycles] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        getAllCycles();
    }, []);

    const getAllCycles = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/cycles', {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const cycles = res.data;
                setAllCycles(cycles);
                console.log(allCycles, 'successful seed!');
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
        history.push(`/categories/cycles/${id}`);
    }
    const history = useHistory();

    const redirectTo = () => {
        history.push('/categories/cycles/new');
    }

    return (
        <div className="cycles" id="allCycles">
            {isPending && <div><h4>pending ...</h4></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info sell-item" onClick={redirectTo}>
                        Sell cycle
                    </button>
                    <div className="grid-display-products d-flex flex-row flex-wrap">
                        {allCycles.map((cycle) => (
                            <div className="card col-lg-2 pt-3 mt-3 ms-5 me-5 ps-3 pe-3">
                                <div className="col">
                                    <div className="col">
                                        <img className="img-fluid displayThumbnail" alt="" src={cycle.images[0].url}
                                            id={cycle._id}
                                            onClick={handleSelect}
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="card-body data-display-grid">
                                            <h2 className="card-title data-display-heading">{cycle.title}</h2>
                                            <p className="card-text data-display-subheading mt-2">Model Number: #{cycle.modelNo}</p>
                                            <p className="card-text data-display-price">
                                                <b>₹{cycle.price}</b>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mb-5"></div>
                </div>
            }
        </div>
    );
}

export default Cycles;