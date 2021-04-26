import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditHandicraft = () => {

    const { id: productId } = useParams();
    const [handicraft, setHandicraft] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [isPending, setPending] = useState(true);
    const [isMount, setMount] = useState(false);

    useEffect(() => {
        getHandicraft();
    }, []);

    useEffect(() => {
        checkChanges();
    }, [isMount]);

    const getHandicraft = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/categories/handicrafts/${productId}`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("handicraft data: ", res.data.handicraft);
                setHandicraft(res.data.handicraft);
                console.log(handicraft, 'successful seed of our handicraft!');
                setMount(true);
                setPending(false);
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const history = useHistory();

    const checkChanges = () => {
        if (isMount) {
            if (title === '') {
                setTitle(handicraft.title);
            }
            if (description === '') {
                setDescription(handicraft.description);
            }
            if (color === '') {
                setColor(handicraft.color);
            }
            if (price === '') {
                setPrice(handicraft.price);
            }
            if (image === '') {
                setImage(handicraft.images[0].url);
            }
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setPending(true);

        try {
            const axiosConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            await axios.post(`http://localhost:5000/categories/handicrafts/${productId}/edit`, {
                title, description, color, price, image
            },
                axiosConfig
            )
                .then((res) => {
                    console.log(res.data);
                    history.push(`/categories/handicrafts/${productId}`);
                    setPending(false);
                })
                .catch((res, e) => {
                    console.log("error in client", e)
                })
        }

        catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div className="editHandicraft">
            <div className="row mt-3">
                <h1 className="text-center">Edit Handicraft</h1>
                {isPending && <div>Seeding handicraft ...</div>}
                {!isPending &&
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <div className="registerForm mb-3">
                                <label className="form-label"><b>Title:</b></label>
                                <input className="form-control" type="text" id="title" name="title" required
                                    defaultValue={handicraft.title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Price:</b></label>
                                <div className="input-group">
                                    <span className="input-group-text" id="price-label">₹</span>
                                    <input className="form-control" type="number" id="price" name="price" placeholder="0.00" aria-label="price" aria-describedby="price-label" required
                                        defaultValue={handicraft.price}
                                        onChange={(event) => setPrice(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Color:</b></label>
                                <input className="form-control" type="text" id="color" name="color" required
                                    defaultValue={handicraft.color}
                                    onChange={(event) => setColor(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Image Url:</b></label>
                                <input className="form-control" type="text" id="image" name="image" required
                                    defaultValue={handicraft.images[0].url}
                                    onChange={(event) => setImage(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" ><b>Description:</b></label>
                                <textarea className="form-control" type="text" id="description" name="description" required
                                    defaultValue={handicraft.description}
                                    onChange={(event) => setDescription(event.target.value)}
                                ></textarea>
                            </div>
                            {!isPending &&
                                <div className="d-grid gap-2 col-6 mx-auto mb-5">
                                    <button className="btn btn-success">Submit</button>
                                </div>
                            }
                            {isPending &&
                                <div className="d-grid gap-2 col-6 mx-auto mb-5">
                                    <button className="btn btn-success mb-3">Submitting ..</button>
                                </div>
                            }
                        </form>
                    </div>
                }
            </div>
        </div>
    );
}

export default EditHandicraft;