import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditCycle = () => {

    const { id: productId } = useParams();
    const [cycle, setCycle] = useState('');
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [age, setAge] = useState('');
    const [modelNo, setModelNo] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [isPending, setPending] = useState(true);
    const [isMount, setMount] = useState(false);

    useEffect(() => {
        getCycle();
    }, []);

    useEffect(() => {
        checkChanges();
    }, [isMount]);

    const getCycle = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/categories/cycles/${productId}`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("cycle data: ", res.data.cycle);
                setCycle(res.data.cycle);
                console.log(cycle, 'successful seed of our cycle!');
                setMount(true);
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

    const history = useHistory();

    const checkChanges = () => {
        if (isMount) {
            if (title === '') {
                setTitle(cycle.title);
            }
            if (description === '') {
                setDescription(cycle.description);
            }
            if (age === '') {
                setAge(cycle.age);
            }
            if (price === '') {
                setPrice(cycle.price);
            }
            if (color === '') {
                setColor(cycle.color);
            }
            if (modelNo === '') {
                setModelNo(cycle.modelNo);
            }
            if (image === '') {
                setImage(cycle.images[0].url);
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

            await axios.post(`http://localhost:5000/categories/cycles/${productId}/edit`, {
                title, modelNo, color, description, age, price, image
            },
                axiosConfig
            )
                .then((res) => {
                    console.log(res.data);
                    history.push(`/categories/cycles/${productId}`);
                    setPending(false);
                })
                .catch((e) => {
                    if (e.response.data.isLoggedIn == false) {
                        history.push('/login')
                    }
                    if (e.response.data.isOwner == false) {
                        history.push('/categories/cycles')
                    }
                    if (e.response.data.isVerified == false) {
                        history.push('/categories')
                    }
                    console.log("error in client", e)
                })
        }

        catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleUpload = async e => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file)
                return alert("File does not exist!");
            console.log(file);
            const formData = new FormData();
            formData.append('files', file)
            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            document.getElementById('formSubmitBtn').disabled = true;
            document.getElementById('formSubmitBtn').innerHTML = 'Uploading ..';
            const axiosConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('http://localhost:5000/upload', formData, axiosConfig)
                .then((res) => {
                    console.log(res, res.data.url);
                    setImage(res.data.url);
                    document.getElementById('formSubmitBtn').disabled = false;
                    document.getElementById('formSubmitBtn').innerHTML = 'Submit';
                })
                .catch((e) => {
                    console.log("error in client", e.response.data)
                })
        }
        catch (err) {
            alert(err, "error occured")
        }
    }

    return (
        <div className="editCycle">
            <div className="row mt-3">
                <h1 className="text-center" style={{ fontSize: 40, color: "#94618E" }}>Edit Cycle</h1>
                {isPending && <div><h4>Seeding cycle ...</h4></div>}
                {!isPending &&
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <div className="registerForm mb-3">
                                <label className="form-label"><b>Title:</b></label>
                                <input className="form-control" type="text" id="title" name="title" required
                                    defaultValue={cycle.title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Model No:</b></label>
                                <input className="form-control" type="text" id="modelNo" name="modelNo" required
                                    defaultValue={cycle.modelNo}
                                    onChange={(event) => setModelNo(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Price:</b></label>
                                <div className="input-group">
                                    <span className="input-group-text" id="price-label">₹</span>
                                    <input className="form-control" type="number" id="price" name="price" placeholder="0.00" aria-label="price" aria-describedby="price-label" required
                                        defaultValue={cycle.price}
                                        onChange={(event) => setPrice(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Age:</b></label>
                                <input className="form-control" type="number" id="age" name="age" required
                                    defaultValue={cycle.age}
                                    onChange={(event) => setAge(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Color:</b></label>
                                <input className="form-control" type="text" id="color" name="color" required
                                    defaultValue={cycle.color}
                                    onChange={(event) => setColor(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label"><b>Change Image:</b></label>
                                <input className="form-control" type="file" id="image" name="image"
                                    onChange={handleUpload}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" ><b>Description:</b></label>
                                <textarea className="form-control" type="text" id="description" name="description" required
                                    defaultValue={cycle.description}
                                    onChange={(event) => setDescription(event.target.value)}
                                ></textarea>
                            </div>
                            {!isPending &&
                                <div className="d-grid gap-2 col-6 mx-auto mb-5">
                                    <button className="btn btn-success" id="formSubmitBtn">Submit</button>
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

export default EditCycle;