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
            {isPending && <div><h1>pending ...</h1></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <h1>All furniture - </h1>
                    <button type="button" className="btn btn-info" onClick={redirectTo}>
                        Add new furniture to sell
                    </button>
                    {allFurniture.map((f) => (
                        <div className="card mt-3 ms-3 me-3">
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <img className="img-fluid" alt="" src={f.images[0].url} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <button type="button" id={f._id} className="btn btn-info" onClick={handleSelect}>
                                            View
                                        </button>
                                        <h2 className="card-title">{f.title}</h2>

                                        <p className="card-text">
                                            ₹{f.price}
                                        </p>
                                        <p className="card-text">{f.description}</p>
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

export default Furniture;