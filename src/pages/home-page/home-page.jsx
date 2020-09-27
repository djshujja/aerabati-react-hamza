import React from 'react';
import { Button, Grid,TextField, Typography,Input, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { FaTachometerAlt, FaAnchor, FaCarAlt } from 'react-icons/fa';
import { PrimaryTemplate } from '../../template';
import { CarCard } from '../../components/card';
import {Link, withRouter} from "react-router-dom";
import {allCars,searchCars} from "../../assets/serverUrls";
import axios from "axios";
import serverHostName from "../../assets/serverHost";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageno:0,
            carsData:[],
            searchCarsData:[],
            search_location:"",
            search_model:"",
            search_company:"",
            message:"",
            search_result:false,// no search or search result is found
        };

        this.productInfo = this.productInfo.bind(this);

    }

    componentDidMount() {
       this.fetchCars();

    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    fetchCars = ()=>{
        axios.get(allCars+this.state.pageno).then(resData=>{


          return  resData.data.length > 0  ? (
            this.setState(prevState=>({
                pageno: prevState.pageno+1,
                carsData: [...resData.data]
            })
            )): "";
        }).catch(err=>{
            console.log(err.response);
        })
    }

    productInfo(id){
          this.props.history.push("/product-info/"+id);

    }
    searched = ()=>{


        let {search_company,search_location,search_model} = this.state;
      //  if(search_company && search_location && search_result){
            axios.get(
                searchCars+"?name="+search_company
                +"&location="+this.state.search_location
                +"&model="+this.state.search_model
            ).then(resData=>{

                this.setState({
                    searchCarsData:resData.data,

                });
            }).catch(err=>{
                console.log(err);
            })
        // }else{
        //     this.setState({
        //         message:"All Search fields are required"
        //     })
        // }


    }

    restoreSearch = ()=>{
        this.setState({
            searchCarsData:[]
        })
    }

    render(){





        return (
            <PrimaryTemplate>
                <section className="feature-area">
                    <section className="feature-text">
                        <h1>
                            Rent Your Dream Car
                        </h1>
                        <p>
                            Are you looking for cheap car rental deals? We beleive in providing the highest level of service <br/> at the lowest possible price. Search right here!
                        </p>
                    </section>
                    <br/>
                    <section className="feature-search">
                        <div className="row1">
                            <Grid container>
                                <Grid item xs={12} sm={4} >
                                    <Button className="primary-btn-transition"
                                            component   = {Link}
                                            to = {"/"}
                                            style={{ color: '#fff', margin: "4px 12px" }} startIcon = { <FaCarAlt /> }>
                                        Rent A Car
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button className="primary-btn-transition" style={{ color: '#fff', margin: "4px 12px" }} startIcon = { <FaTachometerAlt /> }>
                                        Exotic car rent
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button className="primary-btn-transition" style={{ color: '#fff', margin: "4px 12px" }} startIcon = { <FaAnchor /> }>
                                        Leasing
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="row2">
                            <Grid container>
                                <Grid item xs={12} sm={3}>

                                    <input type="text" className="home_search_input" name={"search_location"} placeholder={"Search location"} value={this.state.search_location} onChange={this.handleChange}/>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <input type="text" className="home_search_input" name={"search_company"} placeholder={"search Company"} value={this.state.search_company} onChange={this.handleChange}/>

                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl style={{ width: '95%' }}>

                                        <input type="text" className="home_search_input" name={"search_model"} placeholder={"search model"} value={this.state.search_model} onChange={this.handleChange}/>

                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    
                                        <Button
                                            variant     = "outlined" 
                                            className   = "primary-btn-white"
                                            style       = {{ marginRight: 15 }}
                                            onClick     =   {this.searched}

                                        >
                                            Search
                                        </Button>
                                    
                                </Grid>
                            </Grid>
                            <br/>

                            <Typography style={{color:"white",cursor:"pointer"}} onClick={this.restoreSearch}>Retrieve All Cars</Typography>

                        </div>
                    </section>
                </section>


                { /** End of feature area  */ }

                <section className="homepage-content-container container">
                    <div className="content-title">
                        <Typography variant="h5" className="homepage-conent-heading"> Latest Rental Car Offers </Typography>
                        <div className="hp-content-header-border" />
                    </div>
                    
                    <Grid container alignItems={"center"} justify={"center"} spacing={2} className="car-card-container">


                        {
                            ( this.state.searchCarsData.length === 0)?  this.state.carsData.map(cars=>(
                                <Grid key={cars._id} item sm={6} md={3} onClick={()=> this.productInfo(cars._id)}>
                                    <CarCard
                                        carTitle    = {cars.name}
                                        carType     = {cars.car_type ? cars.car_type : "Luxury"}
                                        carListedBy = {""}


                                        imgSrc      = {serverHostName+cars.imagePath}
                                    />
                                </Grid>

                            )):<React.Fragment>
                                { this.state.searchCarsData.map(cars=>(
                                        <Grid key={cars._id} item sm={6} md={3} onClick={()=> this.productInfo(cars._id)}>
                                            <CarCard
                                                carTitle    = {cars.name}
                                                carType     = {cars.car_type ? cars.car_type : "Luxury"}
                                                carListedBy = {""}


                                                imgSrc      = {serverHostName+cars.imagePath}
                                            />
                                        </Grid>
                                    ))
                                }
                            </React.Fragment>
                        }








                    </Grid>

                    {

                        this.state.carsData.length === 0 ? "Please wait.." : (
                            <div className="content-title">
                                <Button
                                    variant     =   "contained"
                                    className   =   "primary-btn-red"
                                    onClick     = {this.fetchCars}>
                                    Fetch More
                                </Button>
                            </div>

                        )
                    }


                </section>
            </PrimaryTemplate>
        )
    }
}




export default withRouter(HomePage);