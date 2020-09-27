import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { FaPlus } from 'react-icons/fa';


const PrimaryFooter = ( props ) => {
    return (
        <section className="footer">
            <section className="footer-content container">
                <Grid container>
                    <Grid item xs = {12} sm = {4}>
                        <div style={{ display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', maxWidth: 275 }}>
                                <div className="logo-container">
                                    <a href="http://google.com">
                                        <img className="logo-img" src="/assets/images/logo.png" alt="Arabeti"/>
                                    </a>
                                </div>
                            </div>
                            <Typography className="footer-intro-text">
                                Your one-stop shop to finding the best deals for budged and luxury / sports car rental, car leasing and chauffeur service across the UAE. Arabeti aims to provide you a hassle-free car hiring experience.
                            </Typography>
                        </div>
                    </Grid>
                    
                    <Grid item xs = {12} sm = {4}>
                        
                            <div className="ft-widget-container">
                            <div style={{ display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                                <div className="ft-widget-title-container">
                                    <Typography variant="h5" component="h6" className="ft-widget-title">
                                        Car Brands Service
                                    </Typography>
                                    <div className="ft-widget-title-border" />
                                </div>
                                <div style={{ marginTop: 12 }}>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Cheap Cars Rental Debai </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Monthly Cars Rental Dubai </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Luxury Cars Rental Dubai </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Wedding Car Rental Dubai </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Rent an SUV in Dubai </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Hire a Van in Dubai </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Hire a Van in Dubai </Typography>
                                </div>
                                </div>
                                </div>
                            </div>
                    </Grid>

                    <Grid item xs = {12} sm = {4}>

                    <div className="ft-widget-container">
                            <div style={{ display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                                <div className="ft-widget-title-container">
                                    <Typography variant="h5" component="h6" className="ft-widget-title">
                                        Driver Car Services
                                    </Typography>
                                    <div className="ft-widget-title-border" />
                                </div>
                                <div style={{ marginTop: 12 }}>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Chauffeur Service Dubai </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Chauffeur Service Abu Dhabi </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Chauffeur Service Sharjah </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Airport Transfer Duba </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Airport Transfer Abu Dhabi </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Airport Transfer Sharjah </Typography>
                                </div>
                                <div className="ft-widget-list">
                                    <FaPlus color="#999" size="14" style={{ marginRight: 5 }}/>
                                    <Typography className="ft-widget-list-text"> Book Car with Driver in the UAE </Typography>
                                </div>
                                </div>
                                </div>
                            </div>
                    </Grid>

                </Grid>
            </section>
            <section className="footer-credit-container">
                <Typography>
                    Arabeti.com - a Part of Arabeti Drive Portal
                </Typography>
            </section>
        </section>
    )
}

export default PrimaryFooter;