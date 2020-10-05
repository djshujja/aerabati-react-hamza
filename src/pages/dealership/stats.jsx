import React from 'react';
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

// import { Typography, Grid } from '@material-ui/core';
import { FaPodcast, FaCalculator } from 'react-icons/fa';
import { MdFindInPage, MdMouse } from 'react-icons/md';
import AdminTemplate from "../../template/admin-template";
import {PrimaryTemplate} from "../../template";
import {DealerShipHeader} from "../../components/dealership-header";

import { AdminStatBadge } from '../../components/badges';

import {dealerStats} from "../../assets/serverUrls";
import Chart from '../../components/Chart.js'
import axios from "axios";


class Stats extends React.Component {
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

            <PrimaryTemplate>
                 <AdminTemplate>
                     <DealerShipHeader/>
                    <section className="stat-container" >
                        <Typography variant="h6" className="stat-heading">
                            Dealership statisticss
                        </Typography>
                        <Chart/>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                              
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                               
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                               
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={2}>
                            

                        </Grid>
                        <TableContainer>
            <Table style={{ width: "100%" }}>
              <TableHead style={{ backgroundColor: "#09080e", color: "#fff" }}>
                <TableRow>
                  <TableCell style={{ color: "#fff", width: "80px" }}>
                   Date
                  </TableCell>
                  {/* <TableCell style={{ color: "#fff" }}>Last Name</TableCell> */}
                  <TableCell style={{ color: "#fff" }}>Car Shown</TableCell>
                  {/* <TableCell style={{ color: "#fff" }}>Taken Time</TableCell> */}
                  {/* <TableCell style={{ color: "#fff" }}>Return Time</TableCell> */}
                  {/* <TableCell style={{ color: "#fff" }}>Booking Id</TableCell> */}
                  {/* <TableCell style={{ color: "#fff" }}>Status</TableCell> */}
                  <TableCell style={{ color: "#fff" }}>Cars Clicked</TableCell>
                  <TableCell style={{ color: "#fff" }}>Leads</TableCell>
                  <TableCell style={{ color: "#fff" }}>CTR</TableCell>

                  {/* <TableCell style={{ color: "#fff" }}>Actions</TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {/* {this.state.data.map((singleValue) => ( */}
                  <TableRow >
                    <TableCell
                      style={{ border: "1px solid #ddd", width: "250px" }}
                    >
                      {/* <Grid container spacing={2}> */}
                      {/* <Grid item md={5} lg={4}> */}
                      <div className="product-desc-container">
                        {/* <span>
                          {" "}
                          {singleValue.firstName} {singleValue.lastName}
                        </span> */}
                        <span>
                            20 December 2020
                        </span>
                      </div>
                      {/* </Grid> */}
                      {/* </Grid> */}
                    </TableCell>
                    {/* <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <span> {singleValue.lastName}</span>
                      </div>
                    </TableCell> */}
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>200</Typography>
                      </div>
                    </TableCell>
                    {/* <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>{singleValue.takenTime}</Typography>
                      </div>
                    </TableCell> */}
                    {/* <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>{singleValue.returnTime}</Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>{singleValue.booking_id}</Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>{singleValue.status}</Typography>
                      </div>
                    </TableCell> */}
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>
                          {/* {singleValue.specialInstructions} */}
                          92
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>
                          {/* {singleValue.car ? (
                            singleValue.car.name
                          ) : (
                            <i>
                              <b>Car Deleted</b>
                            </i>
                          )} */}48
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>
                          {/* {singleValue.createdAt.substring(0, 10)} */}2.5%
                        </Typography>
                      </div>
                    </TableCell>
                    {/* <TableCell style={{ border: "1px solid #ddd" }}>
                      <Grid item md={7} lg={8}>
                        <div className="product-action-btns-container">
                          <Link to={`/edit-products/` + singleValue._id}>
                            {" "}
                            <IconButton className="car-btns product-action-btn-margin">
                              <FaPencilAlt />
                            </IconButton>
                          </Link>
                        </div>
                      </Grid>
                      <IconButton
                        onClick={() => {
                          this.deleteProduct(singleValue.booking_id);
                        }}
                      >
                        <FaTrash />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>
                    </section>
                </AdminTemplate>
             </PrimaryTemplate>
        )
    }
}

export default Stats;