import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { FaPodcast, FaCalculator } from 'react-icons/fa';
import { MdFindInPage, MdMouse } from 'react-icons/md';

import { AdminStatBadge } from '../../components/badges';

import {dealerStats} from "../../assets/serverUrls";
import axios from "axios";


class DealershipStats extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
          dealerStats:{}
        }
    }
    componentDidMount() {
      axios.get(dealerStats+this.props.id).then(resData=>{

          this.setState({
              dealerStats:resData.data
          })
      }).catch(err=>{
          console.log(err.response);
      })
    }

    render(){
        const {dealerStats} = this.state;
        return (

            // <PrimryTemplate>
            //     <AdminTemplate>
            //         <DealerShipHeader/>
                    <section className="stat-container" >
                        <Typography variant="h6" className="stat-heading">
                            Dealership statistics
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge 
                                    badgeStyle = {{ backgroundColor: '#ff9801' }} 
                                    badgeCounter = {dealerStats ? dealerStats.total_cars : 0 }
                                    badgeText = "Total Cars"
                                    iconComponent = { <MdFindInPage color="#fff" size={40} /> }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge 
                                    badgeStyle = {{ backgroundColor: '#f44236' }} 
                                    badgeCounter =  {dealerStats ? dealerStats.total_clicked : 0 }
                                    badgeText = "Total Clicked"
                                    iconComponent = { <MdMouse color="#fff" size={40} /> }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge 
                                    badgeStyle = {{ backgroundColor: '#4db151' }} 
                                    badgeCounter = {dealerStats ? dealerStats.total_leads : 0 }
                                    badgeText = "Leads"
                                    iconComponent = { <FaPodcast color="#fff" size={38} /> }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge 
                                    badgeStyle = {{ backgroundColor: '#2895f0' }} 
                                    badgeCounter = {dealerStats ? dealerStats.total_active : 0 }
                                    badgeText = "Active"
                                    iconComponent = { <FaCalculator color="#fff" size={36} /> }
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge 
                                    badgeStyle = {{ backgroundColor: '#0cbaae' }} 
                                    badgeCounter = {dealerStats ? dealerStats.total_deactivated : 0 }
                                    badgeText = "Total Deleted"
                                    iconComponent = { null }
                                />
                            </Grid>


                        </Grid>
                    </section>
            //     </AdminTemplate>
            // </PrimryTemplate>
        )
    }
}

export default DealershipStats;