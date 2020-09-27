import React from 'react';
import { Typography, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';
import { FaCheckCircle } from 'react-icons/fa';
import {AdminTemplate, PrimaryTemplate} from '../../template';
import {AdminStatBadge} from "../../components/badges";


import { FaPodcast, FaCalculator } from 'react-icons/fa';
import { MdFindInPage, MdMouse } from 'react-icons/md';

class StatisticHeader extends React.Component {
    render(){
        const {heading,data}  =this.props;
        return (
            <div>
                        <Typography variant="h6" className="stat-heading">
                            {heading}
                        </Typography>
                        <Grid container spacing={2}>


                                {/*{*/}
                                {/*    data.map((singleData,i)=>(*/}
                                <Grid item xs={12} sm={6} md={3}>
                                    <AdminStatBadge
                                        badgeStyle = {{ backgroundColor: '#ff9801' }}
                                        badgeCounter = "339,541"
                                        badgeText = "Total Views"
                                        iconComponent = { <MdFindInPage color="#fff" size={40} /> }
                                    />
                                </Grid>

                                {/*    ))*/}
                                {/*}*/}




                            </Grid>




                        <br />






            </div>
        )
    }
}

export default StatisticHeader;