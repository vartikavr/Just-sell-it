import { makeStyles } from '@material-ui/core/styles';
import { Collapse, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect, useState } from 'react';
import { Link as Scroll } from 'react-scroll';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FlashMessage from 'react-flash-message';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: ' center',
        alignItems: 'center',
        height: '100vh',
        //fontFamily: 'Nunito'
    },
    appbar: {
        background: 'none',
        fontFamily: 'Nunito',
    },
    icon: {
        color: '#fff',
        fontSize: '4rem'

    },
    appbarTitle: {
        flexGrow: '2',
        fontSize: '4rem',
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto'
    },
    colorText: {
        color: '#5AFF3D'

    },
    container: {
        textAlign: 'center',
    },
    goDown: {
        color: '#94618E',
        fontSize: '4rem'
    },
    title: {
        color: '#94618E',
        fontSize: '6rem',
        fontFamily: 'Nunito'
    }
}));

export default function Header() {
    const classes = useStyles();

    const [checked, setChecked] = useState(false);
    const history = useHistory();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        setChecked(true)
    }, []);

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        checkVerification();
    }, [isVerified]);

    const checkVerification = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/user', {
        },
            axiosConfig)
            .then((res) => {
                console.log(res.data)
                setIsVerified(res.data.user.isVerified);
                if (res.data.user.isVerified == false) {
                    setIsError(true);
                }
                else {
                    setIsError(false);
                }
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                console.log("error in client", e)
            })
    }

    return (
        <div className={classes.root} id="header">
            {/* <AppBar className={classes.appbar} elevation={0}> {/*navbar 
            <Toolbar className={classes.appbarWrapper}>
                <h1 className={classes.appbarTitle}>Just <span className={classes.colorText}>Sell It</span></h1>
                <IconButton>
                    <SortIcon className={classes.icon} />
                </IconButton>
            </Toolbar>

            </AppBar> */}
            <Collapse
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                collapsedHeight={0}
            >
                <div className={classes.container}>
                    {isError && (
                        <FlashMessage duration={5000}>
                            <div className="flash col-md-6 offset-md-3">
                                <p>Email not confirmed yet. Check inbox!</p>
                            </div>
                        </FlashMessage>
                    )}
                    <h1 className={classes.title}>Select Category
                </h1>
                    <Scroll to="select-category" smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.goDown} />
                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>

        </div >
    );
}