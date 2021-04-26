import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Handicrafts = () => {

    const [allHandicrafts, setAllHandicrafts] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        getAllHandicrafts();
    }, []);

    const getAllHandicrafts = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/handicrafts', {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const handicrafts = res.data;
                setAllHandicrafts(handicrafts);
                console.log(allHandicrafts, 'successful seed!');
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
        history.push(`/categories/handicrafts/${id}`);
    }
    const history = useHistory();

    const redirectTo = () => {
        history.push('/categories/handicrafts/new');
    }

    return (
        <div className="handicrafts">
            {isPending && <div><h1>pending ...</h1></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <h1>All handicrafts - </h1>
                    <button type="button" className="btn btn-info" onClick={redirectTo}>
                        Add new handicraft to sell
                    </button>
                    {allHandicrafts.map((handicraft) => (
                        <div className="card mt-3 ms-3 me-3">
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <img className="img-fluid" alt="" src={handicraft.images[0].url} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <button type="button" id={handicraft._id} className="btn btn-info" onClick={handleSelect}>
                                            View
                                        </button>
                                        <h2 className="card-title">{handicraft.title}</h2>

                                        <p className="card-text">
                                            <small>₹{handicraft.price}</small>
                                        </p>
                                        <p className="card-text">{handicraft.description}</p>
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

export default Handicrafts;