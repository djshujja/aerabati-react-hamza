import React from "react";

import {dealershipDetailedInfo} from "../../assets/serverUrls";
import axios from "axios";
import {

    Grid,
    Typography,
} from "@material-ui/core";




class DealershipInfoComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dealingInformation:{},
            personalInfo:{}
        }
    }

    componentDidMount() {
         axios.get(dealershipDetailedInfo+this.props.id).then(resData=>{
             this.setState({
                 dealingInformation:resData.data.dealingInformation,
                 personalInfo:resData.data.personalInfo
             })
         }).catch(err=>{
             console.log(err.response);
         })
    }

    dateConversion = (value)=>{
        const date = new Date(value);
        return date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay();
    }

    render(){
        const {dealingInformation,personalInfo} = this.state;


        return(

                    <div>
                        {/*    info body*/}

                        <Grid container>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <Grid item alignItems={"center"} container sm={12} md={5}>
                                <Grid item style={{marginRight:"5px",color:"#2980b9"}}>
                                    <Typography variant={"h6"}>Owner Name</Typography>
                                </Grid>
                                <Grid item>

                                    {
                                        <Typography>dealingInformation.name</Typography> ? dealingInformation.name:""
                                    }
                                </Grid>

                            </Grid>

                            <br/>
                            <br/>
                            <br/>
                            <br/>

                            <Grid item alignItems={"center"}  container sm={12} md={5}>
                                <Grid item style={{marginRight:"5px",color:"#2980b9"}}>
                                    <Typography variant={"h6"}>Email:</Typography>
                                </Grid>
                                <Grid item>
                                    {
                                        <Typography>personalInfo.email</Typography>? personalInfo.email : ""
                                    }
                                </Grid>

                            </Grid>
                            <br/>
                            <br/>
                            <br/>
                            <br/>




                            <Grid item alignItems={"center"}  container sm={12} md={5}>
                                <Grid item style={{marginRight:"5px",color:"#2980b9"}}>
                                    <Typography variant={"h6"}>City:</Typography>
                                </Grid>
                                <Grid item>
                                    {
                                        <Typography>personalInfo.city</Typography> ? personalInfo.city : ""
                                    }
                                </Grid>

                            </Grid>

                            <br/>
                            <br/>
                            <br/>
                            <br/>

                            <Grid item alignItems={"center"}  container sm={12} md={5}>
                                <Grid item style={{marginRight:"5px",color:"#2980b9"}}>
                                    <Typography variant={"h6"}>Contact No:</Typography>
                                </Grid>
                                <Grid item>

                                    {
                                        <Typography>personalInfo.contact_no</Typography> ? personalInfo.contact_no : ""
                                    }
                                </Grid>

                            </Grid>

                            <br/>
                            <br/>
                            <br/>
                            <br/>

                            <Grid item alignItems={"center"}  container sm={12} md={5}>
                                <Grid item style={{marginRight:"5px",color:"#2980b9"}}>
                                    <Typography variant={"h6"}>License No:</Typography>
                                </Grid>
                                <Grid item>
                                    {
                                        <Typography>dealingInformation.license_no</Typography> ? dealingInformation.license_no : ""
                                    }
                                </Grid>

                            </Grid>

                            <br/>
                            <br/>
                            <br/>
                            <br/>


                            <Grid item alignItems={"center"}  container sm={12} md={5}>
                                <Grid item style={{marginRight:"5px",color:"#2980b9"}}>
                                    <Typography variant={"h6"}>License Expiration Date:</Typography>
                                </Grid>
                                <Grid item>
                                    {
                                        dealingInformation.license_expiration_date
                                            ?this.dateConversion(dealingInformation.license_expiration_date) : ""
                                    }
                                </Grid>

                            </Grid>
                            <br/>
                            <br/>
                            <br/>
                            <br/>

                            <Grid item alignItems={"center"}  container sm={12} md={5}>
                                <Grid item style={{marginRight:"5px",color:"#2980b9"}}>
                                    <Typography variant={"h6"}>Contract Start Date:</Typography>
                                </Grid>
                                <Grid item>
                                    {
                                        dealingInformation.contract_start_date ? this.dateConversion(dealingInformation.contract_start_date) : ""
                                    }
                                </Grid>

                            </Grid>
                            <br/>
                            <br/>
                            <br/>
                            <br/>

                            <Grid item alignItems={"center"}  container sm={12} md={5}>
                                <Grid item style={{marginRight:"5px",color:"#2980b9"}}>
                                    <Typography variant={"h6"}>Contract end Date:</Typography>
                                </Grid>
                                <Grid item>
                                    {
                                        dealingInformation.contract_end_date?this.dateConversion(dealingInformation.contract_end_date) : ""
                                    }
                                </Grid>

                            </Grid>


                        </Grid>
                    </div>

        )
    }
}

export default DealershipInfoComponent;
