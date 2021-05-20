import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import category from '../../static/category';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default function Categories() {
    const classes = useStyles();
    return (
        <div className={classes.root} id="select-category">
            <ImageCard category={category[0]} id={category[0].cat} />
            <ImageCard category={category[1]} id={category[1].cat} />
            <ImageCard category={category[2]} id={category[2].cat} />
            <ImageCard category={category[3]} id={category[3].cat} />
            <ImageCard category={category[4]} id={category[4].cat} />
        </div>
    );
}