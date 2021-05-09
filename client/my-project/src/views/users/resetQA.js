import { useState } from 'react';
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import { useHistory } from 'react-router-dom';

const ResetQA = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [isError, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('http://localhost:5000/resetQA', {
            question: question,
            answer: answer,
            newAnswer: newAnswer,
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                history.push('/user');
            })
            .catch((e) => {
                console.log("error in client", e)
                setError(true);
                setAnswer('');
                setNewAnswer('');
            })
    }

    const history = useHistory();

    return (
        <div className="resetQA">
            <div className="container d-flex justify-content-center align-items-center mb-5 mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        {isError && (
                            <div className="flash">
                                <FlashMessage duration={5000}>
                                    <p>Answers not matching. Please try again!</p>
                                </FlashMessage>
                            </div>
                        )}
                        <div className="card shadow">
                            <img src="https://images.unsplash.com/photo-1514369118554-e20d93546b30?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                                alt="" class="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Reset Security Q/A
                                </h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label" for="username">Enter new question</label>
                                        <input className="form-control" type="text" id="question" name="question" placeholder="enter new security question" required autoFocus
                                            value={question}
                                            onChange={(event) => setQuestion(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" for="password">Enter new answer</label>
                                        <input className="form-control" type="password" id="answer" name="answer" placeholder="enter new answer" required
                                            value={answer}
                                            onChange={(event) => setAnswer(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" for="password">Confirm Answer</label>
                                        <input className="form-control" type="password" id="newAns" name="newAns" placeholder="confirm answer" required
                                            value={newAnswer}
                                            onChange={(event) => setNewAnswer(event.target.value)}
                                        />
                                    </div>
                                    <div className="d-grid ">
                                        <button className="btn btn-success btn-block">Reset</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetQA;