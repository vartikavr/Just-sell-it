import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const DisplayCycle = () => {

    console.log("cycle specific page...");
    const [isPending, setPending] = useState(true);

    const { id: productId } = useParams();
    const [cycle, setCycle] = useState('');

    useEffect(() => {
        getCycle();
    }, []);

    const getCycle = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/categories/cycles/${productId}`, {
        }, axiosConfig)
            .then((res) => {
                console.log("cycle data: ", res.data.cycle);
                setCycle(res.data.cycle);
                console.log(cycle, 'successful seed of our cycle!');
                setPending(false);
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`http://localhost:5000/categories/cycles/${productId}/delete`, {

        }, axiosConfig)
            .then((res) => {
                console.log('successfully deleted cycle!');
                history.push('/categories/cycles');
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const imageUrls = cycle.images;

    const handleBack = () => {
        history.push('/categories/cycles');
    }
    const history = useHistory();

    return (
        <div className="displayCycle">
            {isPending && <div>Seeding cycle ...</div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info ms-4 mt-3 " onClick={handleBack}>
                        All Cycles
                </button>
                    <div className="mt-5"></div>
                    <div className="row mainContent-item mt-5 d-flex align-items-center ms-auto me-auto">
                        <div id="cyclesCarousel" className="col-md-6 carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                {imageUrls.map((img, i) => (
                                    <div className={"carousel-item " + (i == 0 ? 'active' : '')}>
                                        <img src={img.url} className="d-block w-100" alt="..." />
                                    </div>
                                ))}
                            </div>
                            <div className="group">
                                <a className="carousel-control-prev" href="#cyclesCarousel" role="button" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#cyclesCarousel" role="button" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </a>
                            </div>
                        </div>
                        <div className="card col-md-6 h-300">
                            <div className="card-body">
                                <h5 className="card-title">{cycle.title}</h5>
                                <p className="card-text">{cycle.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Submitted by: {cycle.userId.username}</li>
                                <li className="list-group-item">Price: ₹{cycle.price}</li>
                                <li className="list-group-item">Model No: {cycle.modelNo}</li>
                                <li className="list-group-item text-muted">Age: {cycle.age}</li>
                            </ul>
                            {sessionStorage.getItem('currentUser') && cycle.userId._id == sessionStorage.getItem('currentUser') && (
                                <div class="card-body">
                                    <a className="card-link btn btn-info" href={`/categories/cycles/${cycle._id}/edit`}>Edit</a>
                                    &nbsp;
                            <form className="d-inline" onSubmit={handleDelete}>
                                        <button className="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default DisplayCycle;