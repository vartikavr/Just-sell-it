import { makeStyles } from '@material-ui/core/styles';
import { Collapse, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import { useEffect, useState } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: ' center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Nunito'
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

export default function AllHandicraftsHeader() {
    const classes = useStyles();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setChecked(true)
    }, []);

    return (
        <div className={classes.root} id="header">
            <Collapse
                in={checked}
                {...(checked ? { timeout: 1000 } : {})}
                collapsedHeight={0}
            >
                <div className={classes.container}>
                    <h1 className={classes.title}>Explore Handicrafts
                </h1>
                    <Scroll to="allHandicrafts" smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.goDown} />
                        </IconButton>
                    </Scroll>
                </div>
            </Collapse>

        </div >
    );
}