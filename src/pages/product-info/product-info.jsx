import React from 'react';
import { Typography, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';
import { FaCheckCircle } from 'react-icons/fa';
import { PrimaryTemplate } from '../../template';
import axios from "axios";
import {loadSpecificProduct} from "../../assets/serverUrls";
import {withRouter} from "react-router-dom";
import serverHostName from "../../assets/serverHost";
import {Link} from "react-router-dom";


class ProductInfo extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            carsInfo: ""
        }


    }

    componentDidMount() {

        axios.get(loadSpecificProduct+this.props.match.params.id)
            .then(resData=>{
               this.setState({
                   carsInfo:resData.data
               })
            }).catch(err=>{
                console.log(err);
        })
    }

    render(){
        const {carsInfo} = this.state;
        return (
            <PrimaryTemplate>
                <section className="container product-info-wrapper">

                    <div className="product-info-title-container">
                        <span variant="h1" className="product-title">
                            {
                                carsInfo? carsInfo.name : ""
                            }
                        </span> 
                        <span className="product-rent-seperator" >|</span>
                        <span variant="h3" className="product-rent">
                            {carsInfo.rental_period} / {carsInfo.rental_cost}
                        </span>
                    </div>

                    <div className="product-feature-img-container">
                        <img 
                            className="product-feature-img"
                            src={carsInfo ? serverHostName+carsInfo.imagePath : ""}
                            alt="Feature car"
                        />
                    </div>

                    <div className="product-all-imgs-container">


                        {
                            carsInfo ? carsInfo.multiple_image_path ? carsInfo.multiple_image_path.split(",").map(img=>{

                                return img ? (
                                    <div className="product-thumbnail-wrapper">
                                        <img
                                            className="product-img"
                                            src={serverHostName+img}
                                            alt="Feature car"
                                        />
                                    </div>
                                ): ""
                            }):"": ""
                        }






                    </div>

                    <section className="car-detail">
                        <Grid container spacing={2}>
                            <Grid item sm={3}>
                            <div>
                                <img 
                                    style= {{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    src={carsInfo ? serverHostName+carsInfo.imagePath : ""}
                                    alt="Car banner"
                                />
                            </div>
                            <br />
                            <br />
                            {/*<div>*/}
                            {/*    <img */}
                            {/*        style= {{ width: '100%', height: '100%', objectFit: 'cover' }}*/}
                            {/*        src="https://3c5239fcccdc41677a03-1135555c8dfc8b32dc5b4bc9765d8ae5.ssl.cf1.rackcdn.com/Magnetic-Signs_450x450px-comp.jpg" */}
                            {/*        alt="Car banner"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <br />
                            <br />
                            {/*<div>*/}
                            {/*    <img */}
                            {/*        style= {{ width: '100%', height: '100%', objectFit: 'cover' }}*/}
                            {/*        src="https://images.netdirector.co.uk/gforces-auto/image/upload/w_412,h_309,dpr_2.0,q_auto:best,c_fill,f_auto,fl_lossy/auto-client/82b259d4bb0a4bbf2f5ff14ac430088e/668974_wessex_garages_renault_zoe_269_web_banner_768_x_576px_cta.jpg" */}
                            {/*        alt="Car banner"*/}
                            {/*    />*/}
                            {/*</div>*/}
                           
                            </Grid>
                            <Grid item sm={9}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead style={{ backgroundColor: '#cc0000' }}>
                                                    <TableRow>
                                                        <TableCell style={{ color: '#fff', border: '1px solid #ddd' }} >
                                                            Rental Period
                                                        </TableCell>
                                                        <TableCell style={{ color: '#fff', border: '1px solid #ddd' }}>
                                                            Rental Cost
                                                        </TableCell>
                                                        <TableCell style={{ color: '#fff', border: '1px solid #ddd' }}>
                                                            Mileage Limit
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>


                                                    <TableRow>
                                                        <TableCell style={{border: '1px solid #ddd' }}>
                                                            {carsInfo ? carsInfo.rental_period : ""}
                                                        </TableCell>
                                                        <TableCell style={{border: '1px solid #ddd' }}>
                                                            {carsInfo ? carsInfo.rental_cost : ""}
                                                        </TableCell>
                                                        <TableCell style={{border: '1px solid #ddd' }}>
                                                            {carsInfo ? carsInfo.mileage_limit : ""}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                    <TableContainer>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>
                                                            {carsInfo ? carsInfo.mileage_limit : ""}
                                                        </TableCell>
                                                        <TableCell>
                                                            <FaCheckCircle />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Additional Mileage
                                                        </TableCell>
                                                        <TableCell>
                                                            {carsInfo ? carsInfo.additional_mileage : ""}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Salik / Toll Charge
                                                        </TableCell>
                                                        <TableCell>
                                                            {carsInfo ? carsInfo.toll_charge : ""}
                                                        </TableCell>
                                                    </TableRow>
                                                    {/*<TableRow>*/}
                                                    {/*    <TableCell>*/}
                                                    {/*        Insurange included*/}
                                                    {/*    </TableCell>*/}
                                                    {/*    <TableCell>*/}
                                                    {/*        Comprehensive*/}
                                                    {/*    </TableCell>*/}
                                                    {/*</TableRow>*/}
                                                    <TableRow>
                                                        <TableCell>
                                                            Excess Claim
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                               carsInfo? carsInfo.excess_claim: ""
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Security Deposit 
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                carsInfo ? carsInfo.security_deposit : ""
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Accepted in
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                carsInfo ? carsInfo.accepted_in : ""
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Pick up charge
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                carsInfo ? carsInfo.pickup_charge : ""
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>

                                <br />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>

                                    <TableContainer>
                                            <Table>
                                                <TableHead style={{ backgroundColor: '#cc0000' }}>
                                                    <TableRow>
                                                        <TableCell style={{ color: '#fff', border: '1px solid #ddd', textAlign: 'center' }} colSpan = {2} >
                                                            Car Specification
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        carsInfo ? carsInfo.specs_description.split(",").map(specs=>{
                                                            return ( <TableRow>
                                                                <TableCell>
                                                                    <FaCheckCircle size={22} color={"#cc0000"} />
                                                                </TableCell>
                                                                <TableCell>
                                                                    {specs}
                                                                </TableCell>
                                                            </TableRow>)
                                                        }): ""
                                                    }









                                                    
                                                </TableBody>
                                            </Table>
                                        </TableContainer>


                                    </Grid>
                                    <Grid item xs={12} md={6}>

                                        <TableContainer>
                                            <Table>
                                                <TableHead style={{ backgroundColor: '#cc0000' }}>
                                                    <TableRow>
                                                        <TableCell style={{ color: '#fff', border: '1px solid #ddd', textAlign: 'center' }} colSpan = {2} >
                                                            Car Features
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>




                                                    {
                                                        carsInfo ? carsInfo.features_description.split(",").map(features=>(
                                                            <TableRow>
                                                                <TableCell>
                                                                    <FaCheckCircle size={22} color={"#cc0000"} />
                                                                </TableCell>
                                                                <TableCell>
                                                                    {features}
                                                                </TableCell>
                                                            </TableRow>
                                                        )):""
                                                    }





                                                    
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>

                                <div className="product-book-btn-wrapper">
                                    <Link to="/form">
                                    <Button fullWidth size="large" className   = "primary-btn-red">
                                        Book A Test Drive
                                    </Button>
                                    </Link>
                                </div>

                                <div className="product-info-desc-container">
                                    <div className="product-desc-head">
                                        <span> Description </span>
                                    </div>
                                    <div className="product-desc-body">
                                        <Typography>
                                            {
                                                carsInfo ? carsInfo.description : ""
                                            }
                                        </Typography>
                                    </div>
                                </div>

                            </Grid>
                        </Grid>

                        
                    </section>
                    
                </section>
            </PrimaryTemplate>
        )
    }
}

export default withRouter(ProductInfo);