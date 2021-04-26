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
            //allBooks: books
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

    const imageUrls = cycle.images;

    const handleBack = () => {
        history.go(-1);
    }
    const history = useHistory();

    return (
        <div className="displayCycle">
            {isPending && <div>Seeding cycle ...</div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info" onClick={handleBack}>
                        Back to all Cycles
                </button>
                    <div id="booksCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            {imageUrls.map((img, i) => (
                                <div className={"carousel-item " + (i == 0 ? 'active' : '')}>
                                    <img src={img.url} className="d-block w-100" alt="..." />
                                </div>
                            ))}
                        </div>
                        <div className="group">
                            <a className="carousel-control-prev" href="#booksCarousel" role="button" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#booksCarousel" role="button" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </a>
                        </div>
                    </div>
                    <div className="card mb-3">
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
                            <form className="d-inline" action="/">
                                    <button className="btn btn-danger">Delete</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default DisplayCycle;