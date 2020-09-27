import React from 'react';
import {  Card, CardMedia, CardContent, CardActionArea, CardActions, Typography, IconButton } from '@material-ui/core';
import { FaUser, FaCar, FaPaperPlane, FaSearchLocation, FaPhoneVolume } from 'react-icons/fa';
import PropTypes from 'prop-types';

const CarCard = ( props ) => {
    return (
        <Card>

            <CardActionArea onClick = { props.onClickCarImage }>
                <CardMedia 
                    component    =   "img"
                    src          =   { props.imgSrc } 
                    height       =   { 240 }
                    alt          =   { props.imgAtl }
                    title        =   { props.imgAtl }
                />
            </CardActionArea>

            <CardContent>
                <Typography 
                    variant     =   "h5" 
                    component   =   "h2" 
                    className   =   "car-title">
                    { props.carTitle }
                </Typography>
                <Typography 
                    variant     =   "h6" 
                    component   =   "p" 
                    className   =   "car-type">
                    { props.carType }
                </Typography>
            </CardContent>
            
            <CardActions style={{ justifyContent: 'center', flexWrap: 'wrap'}}>

                <IconButton 
                    className   =   "car-btns" 
                    onClick     =   { props.onClickUserBtn }>
                    <FaUser />
                </IconButton>

                <IconButton 
                    className   =   "car-btns"
                    onClick     =   { props.onClickCarBtn }>
                    <FaCar />
                </IconButton>

                <IconButton 
                    className   =   "car-btns"
                    onClick     =   { props.onClickPlaneBtn }>
                    <FaPaperPlane />
                </IconButton>

                <IconButton 
                    className   =   "car-btns"
                    onClick     =   { props.onClickLocationBtn }>
                    <FaSearchLocation />
                </IconButton>

                <IconButton 
                    className   =   "car-btns"
                    onClick     =   { props.onClickCallBtn }>
                    <FaPhoneVolume />
                </IconButton>

            </CardActions>

            <CardContent>
                <Typography 
                    variant     =   "h5" 
                    className   =   "car-type">
                    Listed By
                </Typography>
                <Typography 
                    variant     =   "h5"  
                    className   =   "car-type car-listed-by">
                    { props.carListedBy }
                </Typography>
            </CardContent>
        </Card>
    )
}

CarCard.defaultProps = {
    imgAtl:         "Car available for rent",
    carTitle:       "No Car Title",
    carType:        "No Car Type",
    imgSrc :        "https://x.kinja-static.com/assets/images/logos/placeholders/default.png",
    carListedBy:    "Not Given",
    // onClickCarImage:    () => alert('Not Setup, Please pass property onClickCarImage'),
    // onClickCarBtn:      () => alert('Not Setup, Please pass property onClickCarBtn'),
    // onClickUserBtn:     () => alert('Not Setup, Please pass property onClickUserBtn'),
    // onClickCallBtn:     () => alert('Not Setup, Please pass property onClickCallBtn'),
    // onClickLocationBtn: () => alert('Not Setup, Please pass property onClickLocationBtn'),
    // onClickPlaneBtn:    () => alert('Not Setup, Please pass property onClickPlaneBtn'),
}

CarCard.propTypes = {
    imgAtl:             PropTypes.string,
    carTitle:           PropTypes.string,
    carType:            PropTypes.string,
    imgSrc :            PropTypes.string,
    carListedBy:        PropTypes.string,
    onClickCarBtn:      PropTypes.func,
    onClickCallBtn:     PropTypes.func,
    onClickPlaneBtn:    PropTypes.func,
    onClickUserBtn:     PropTypes.func,
    onClickCarImage:    PropTypes.func,
    onClickLocationBtn: PropTypes.func,
    
}

export default CarCard;