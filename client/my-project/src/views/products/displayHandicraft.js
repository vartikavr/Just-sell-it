import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';


const DisplayHandicraft = () => {

    console.log("handicraft specific page...");
    const [isPending, setPending] = useState(true);

    const { id: productId } = useParams();
    const [handicraft, setHandicraft] = useState('');

    useEffect(() => {
        getHandicraft();
    }, []);

    const getHandicraft = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/categories/handicrafts/${productId}`, {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log("handicraft data: ", res.data.handicraft);
                setHandicraft(res.data.handicraft);
                console.log(handicraft, 'successful seed of our handicraft!');
                setPending(false);
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const imageUrls = handicraft.images;

    const handleBack = () => {
        history.go(-1);
    }
    const history = useHistory();


    return (
        <div className="displayHandicraft">
            {isPending && <div>Seeding cycle ...</div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info" onClick={handleBack}>
                        Back to all Handicrafts
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
                            <h5 className="card-title">{handicraft.title}</h5>
                            <p className="card-text">{handicraft.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Submitted by: {handicraft.userId.username}</li>
                            <li className="list-group-item">Price: ₹{handicraft.price}</li>
                        </ul>
                        {sessionStorage.getItem('currentUser') && handicraft.userId._id == sessionStorage.getItem('currentUser') && (
                            <div class="card-body">
                                <a className="card-link btn btn-info" href="/">Edit</a>
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

export default DisplayHandicraft;