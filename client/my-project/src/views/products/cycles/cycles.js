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
        <div className="cycles">
            {isPending && <div><h1>pending ...</h1></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <h1>All cycles - </h1>
                    <button type="button" className="btn btn-info" onClick={redirectTo}>
                        Add new cycle to sell
                    </button>
                    {allCycles.map((cycle) => (
                        <div className="card mt-3 ms-3 me-3">
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <img className="img-fluid" alt="" src={cycle.images[0].url} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <button type="button" id={cycle._id} className="btn btn-info" onClick={handleSelect}>
                                            View
                                        </button>
                                        <h2 className="card-title">{cycle.title}</h2>
                                        <p className="card-text">
                                            ₹{cycle.price}
                                        </p>
                                        <p className="card-text">Model Number- #{cycle.modelNo}</p>
                                        <p className="card-text">{cycle.description}</p>
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

export default Cycles;