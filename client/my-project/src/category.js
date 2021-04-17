import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Category = () => {

    const history = useHistory();
    const handleSelect = (event) => {
        const id = event.target.id;

        console.log(id);

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('http://localhost:5000/categories', {
            id: id
        },
            axiosConfig)
            .then((res) => {
                console.log(res, 'successfully sent id!');
                console.log("ok", id)
                history.push(`/categories/${id}`);
                //console.log(name, username, email);

            })
            .catch((e) => {
                console.log("error in client", e)
            })

    }
    return (
        <div className="category d-flex flex-column">
            <div className="heading">
                <h1 style={{ textAlign: "center" }}>Select a Category :</h1>
            </div>
            <button type="button" id="books" className="btn btn-info selectCat p-3" onClick={handleSelect}>
                Books
            </button>
            <button type="button" id="cycles" className="btn btn-info selectCat p-3" onClick={handleSelect}>
                Cycles
            </button>
            <button type="button" id="furniture" className="btn btn-info selectCat p-3" onClick={handleSelect}>
                Furniture
            </button>
            <button type="button" id="handicrafts" className="btn btn-info selectCat p-3" onClick={handleSelect}>
                Handicrafts
            </button>
            <button type="button" id="others" className="btn btn-info selectCat p-3" onClick={handleSelect}>
                Others
            </button>

        </div>
    );
}

export default Category;