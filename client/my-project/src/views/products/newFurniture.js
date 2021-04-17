import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const NewFurniture = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [productId, setProductId] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        setIsPending(true);

        try {

            const axiosConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            await axios.post('http://localhost:5000/categories/furniture/new', {
                title, price, description, age, image
            },
                axiosConfig
            )
                .then((res) => {
                    console.log(res.data);
                    setProductId(res.data._id);
                    history.push(`/categories/furniture/${productId}`);
                    setIsPending(false);
                })
                .catch((res, e) => {
                    console.log("error in client", e)
                })
        }

        catch (err) {
            alert(err.response.data.msg)
        }
    }

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();


    return (
        <div className="newFurniture">
            <div className="row mt-3">
                <h1 className="text-center">New Furniture</h1>
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="registerForm mb-3">
                            <label className="form-label"><b>Title:</b></label>
                            <input className="form-control" type="text" id="title" name="title" required
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Price:</b></label>
                            <div className="input-group">
                                <span className="input-group-text" id="price-label">₹</span>
                                <input className="form-control" type="number" id="price" name="price" placeholder="0.00" aria-label="price" aria-describedby="price-label" required
                                    value={price}
                                    onChange={(event) => setPrice(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Age:</b></label>
                            <input className="form-control" type="text" id="age" name="age"
                                value={age}
                                onChange={(event) => setAge(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Image Url:</b></label>
                            <input className="form-control" type="text" id="image" name="image" required
                                value={image}
                                onChange={(event) => setImage(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" ><b>Description:</b></label>
                            <textarea className="form-control" type="text" id="description" name="description" required
                                value={description}
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
            </div>
        </div>
    );
}

export default NewFurniture;