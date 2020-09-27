import React from 'react';
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, IconButton, Button } from '@material-ui/core';
import {   FaPhone, FaEnvelope } from 'react-icons/fa';
import {MdEdit,MdDelete} from "react-icons/all";

import {dealerCars,deleteProduct} from "../../assets/serverUrls";
import axios from "axios";
import serverHostName  from "../../assets/serverHost";

import {connect} from "react-redux";
import {selectUserPermissions} from "../../redux/registration/registration.reselect";
import {createStructuredSelector} from "reselect";
import {Link} from "react-router-dom";


class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            cars:[],
            pageno:0,
        }
    }
    componentDidMount() {
           this.carsFetch();
    }

    deleteProduct = (id)=>{
       axios.get(deleteProduct+id);

        const newCarsData = this.state.cars.filter(car=>car._id !== id);

        this.setState({
            cars:newCarsData
        });

    }

    carsFetch = ()=>{
        axios.get(dealerCars+this.props.id+"/"+this.state.pageno).then(resData=>{
            this.setState(prevState=>({
                cars:[...resData.data],
                pageno:prevState.pageno+1,
            }))
        }).catch(err=>{
            console.log(err.response);
        })
    }

    render(){

        return (
             <div>
                    <Grid container className="search-filter" alignItems="center">
                        <Grid item sm={6}>
                            <Typography variant={"h6"} className="search-filter-text">
                               All Cars
                            </Typography>
                        </Grid>
                        <Grid item sm={6} className="search-filter-select-container">
                            <FormControl variant="outlined" className="search-filter-form">
                                <InputLabel>
                                    Sort By
                                </InputLabel>
                                <Select value={""} labelWidth={55}>
                                    <MenuItem value={10}>Newly Add</MenuItem>
                                    <MenuItem value={20}>Best Selling</MenuItem>
                                    <MenuItem value={30}>Low Rent</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                 {
                     this.state.cars.map(car=> {
                         return (<section key={car._id} className="product-container">
                                 <Grid container spacing={2}>
                                     <Grid item md={5} lg={4}>
                                         <img
                                             className="product-img"
                                             src={serverHostName+car.imagePath}
                                             alt="Car "
                                         />
                                     </Grid>
                                     <Grid item md={7} lg={8}>
                                         <div className="product-title-container">
                                    <span>
                                        {car.name}
                                    </span>
                                         </div>
                                         <div className="product-desc-container">
                                             <Typography variant={"h6"}>
                                                 Description
                                             </Typography>
                                             <span>
                                                 {car.descriptions}
                                             </span>
                                         </div>
                                         <div className="product-price-container">
                                    <span>
                                        {car.rental_period} per / {car.rental_cost}
                                    </span>


                                         </div>
                                         <div className="product-action-btns-container">

                                             <IconButton
                                                 className="car-btns product-action-btn-margin"
                                             component={Link}
                                             to={"/edit-products/"+car._id}
                                             >
                                                 <MdEdit/>
                                             </IconButton>

                                             {
                                                 (this.props.permissions.delete || this.props.permissions.dealershipId) ? ( <IconButton
                                                     onClick={()=>this.deleteProduct(car._id)}

                                                     className="car-btns product-action-btn-margin">
                                                     <MdDelete/>
                                                 </IconButton>):""
                                             }







                                         </div>
                                         <div className="product-contact-btns-container">
                                             <Button
                                                 variant="outlined"
                                                 className="primary-btn-dark"
                                                 style={{marginRight: 15}}
                                                 startIcon={<FaPhone/>}>
                                                 Call Now
                                             </Button>
                                             <Button
                                                 variant="contained"
                                                 className="primary-btn-red"
                                                 startIcon={<FaEnvelope/>}>
                                                 Send Email
                                             </Button>
                                         </div>
                                     </Grid>
                                 </Grid>
                             </section>
                         )


                     })


                 }

                 {
                     this.state.cars.length  === 0 ? "No car is found":(
                         <Grid container direction={"column"}>
                             <Grid item sm>
                                 <Button onClick={this.carsFetch} className={"MuiButton-text primary-btn-red"}  variant={"contained"} color={"primary"}>
                                     Fetch More Cars if found
                                 </Button>
                             </Grid>
                         </Grid>
                     )
                 }













             </div>
        )
    }
}
const mapStateToProps = createStructuredSelector({
    permissions:selectUserPermissions
})
export default connect(mapStateToProps)(Products);