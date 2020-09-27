import React from 'react';
import { Typography, Grid,form, FormControl, InputLabel,
    TextField, Select, MenuItem, Button } from '@material-ui/core';
import isAnyEmptyField from "../../assets/utils/checkAllObjectFields";
import { PrimaryTemplate } from '../../template';
import { AdminTemplate } from '../../template';

import { makeDealers,makeManager,makeAdmin } from './../../assets/serverUrls';
import axios from "axios";
import {withRouter} from "react-router-dom";


import "react-datepicker/dist/react-datepicker.css";
import {withStyles} from "@material-ui/styles";

import {connect} from "react-redux";
import {selectUserPermissions} from "../../redux/registration/registration.reselect";
import {createStructuredSelector} from "reselect";


const useStyles  = theme=>({
    itemSpace:{
        marginTop:"20px",
        paddingTop:"20px",
        backgroundColor:"red"


    },

});

class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showDealer:false,
            select_type:"",
            license_no:"",
            trade_no:0,
            license_expiration_date:"",
           // license_expiration_date:"",
            contract_start_date:"",
            contract_end_date:"",
            message:"",

            // name:"",
            // model:"",
            // location:"",
            // descriptions:"",
            // image:"",



        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    handleSelectChange(e){
       let showDealer = false;
      if(e.target.value === "dealer"){
          showDealer = true;
      }

        this.setState({
            [e.target.name]:e.target.value,
            showDealer
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value,

        })
    }



    handleSubmit(e){
        e.preventDefault();

        console.log(this.props);

        const {match:{params:{id}}} = this.props;




            if (this.state.showDealer) {

                console.log(this.state);


                if (!isAnyEmptyField(this.state, "message")) {
                    axios.post(makeDealers, {

                        ...this.state,
                        user_id: id,

                    }).then(data => {
                     //   console.log(data);
                        this.props.history.push("/users");



                        // this.setState({
                        //     message: "Done!"
                        // })
                    }).catch(err => {


                        this.setState({
                            message: err.response.data.error
                        })
                    })
                } else {
                    alert("All Fields are required")
                }
            } else if (this.state.select_type === "admin") {

                axios.get(makeAdmin + id).then(res => {
                    this.props.history.push("/users");
                  //  this.showMessage(res.data)
                }).catch(err => {
                  //  console.log(err.response.data);
                    this.showMessage(err.response.data.error);
                })
            } else {


                axios.get(makeManager + id).then(res => {
                    this.props.history.push("/users");
                    // this.showMessage(res.data)
                }).catch(err => {
                  //  console.log(err.response.data.error);
                   this.showMessage(err.response.data.error);
                })

            }


    }

    showMessage = (msg)=>{
        this.setState({
            message:msg
        });
    };
    render(){
          const {classes} = this.props;





        return (
            <PrimaryTemplate>
                <AdminTemplate >


                    <Typography variant={"h5"} style={{marginLeft:20}}>
                        {/* <h2>Add Car Items</h2> */}
                       User Permissions
                    </Typography>


                   <Typography variant={"h6"} color={"secondary"}>
                       {
                           this.state.message ? this.state.message : ""
                       }
                   </Typography>
                    <form onSubmit={this.handleSubmit} method={"POST"}>

                    <Grid container className="container" direction={"column"} style={{margin:20}}>
                        <Grid item container>
                        <Grid item xs={10} sm={10} md={5}  style={{padding:"1em 1em 0 0"}}>


                            <FormControl   fullWidth>
                                <InputLabel id="demo-simple-select-label">Make A</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth
                                    name={"select_type"}
                                    onChange={this.handleSelectChange}
                                    value={this.state.select_type}
                                 >
                                    {
                                        this.props.selectUserPermissions.read && this.props.selectUserPermissions.write && this.props.selectUserPermissions.edit && this.props.selectUserPermissions.delete
                                        ? (     <MenuItem value={"admin"}>Admin</MenuItem>):""
                                    }



                                    <MenuItem value={"manager"}>Manager</MenuItem>
                                    <MenuItem value={"dealer"}>Dealer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                            {
                                this.state.showDealer ? (


                            <Grid item container>



                        <Grid item xs={10} sm={6} md={5} style={{padding:"1em 1em 0 0"}}>
                            <TextField  name={"license_no"} onChange={this.handleChange}   fullWidth label={"License no"} name={"license_no"}/>
                        </Grid>

                        <Grid item xs={10} sm={10} md={5} style={{padding:"1em 1em 0 0"}}>
                            <TextField  name={"trade_no"} onChange={this.handleChange}     fullWidth label={"Trade no"} name={"trade_no"}/>
                        </Grid>

                            {/*<Grid item xs={10} sm={10} md={5} style={{padding:"1em 1em 0 0"}} >*/}
                            {/*    <TextField*/}
                            {/*        fullWidth*/}
                            {/*        id="date"*/}
                            {/*        label="License Expiration Date"*/}
                            {/*        type="date"*/}
                            {/*        name={"license_expiration_date"}*/}
                            {/*        onChange={this.handleChange}*/}

                            {/*        value={this.state.license_expiration_date}*/}
                            {/*        className={classes.textField}*/}
                            {/*        InputLabelProps={{*/}
                            {/*            shrink: true,*/}
                            {/*        }}*/}
                            {/*    />*/}

                            {/*</Grid>*/}

                                <Grid item xs={10} sm={10} md={5} style={{padding:"1em 1em 0 0"}} >
                                    <TextField
                                        fullWidth
                                        id="date"
                                        label="License Expiration Date"
                                        type="date"
                                        name={"license_expiration_date"}
                                        value={this.state.license_expiration_date}
                                        onChange={this.handleChange}

                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                </Grid>



                        <Grid item xs={10} sm={10} md={5} style={{padding:"1em 1em 0 0"}} >
                            <TextField
                                fullWidth
                                id="date"
                                label="Contract start date"
                                type="date"
                                name={"contract_start_date"}
                                value={this.state.contract_start_date}
                                onChange={this.handleChange}

                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </Grid>


                        <Grid item xs={10} sm={10} md={5} style={{padding:"1em 1em 0 0"}} >
                            <TextField
                                fullWidth
                                id="date"
                                label="Contract End date"
                                type="date"
                                name={"contract_end_date"}
                                onChange={this.handleChange}
                                value={this.state.contract_end_date}

                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </Grid>
                            </Grid>
                                ):""
                                }





                            {/*<TextField label={"Start Date"} name={"license_no"}/>*/}

                        </Grid>
                        <br/>
                       <Grid item>
                           <Button type={"submit"} onClick={this.handleSubmit}  contained={"variant"} className={"MuiButton-text primary-btn-red"}>
                               Submit
                           </Button>
                       </Grid>




                    </Grid>
                    </form>
                    <br/><br/><br/>



                </AdminTemplate>
            </PrimaryTemplate>
        )
    }
}

// UserEdit.defaultProps = {
//     theme: useTheme,   // ERROR! Failed prop
// };

const mapStateToProps = createStructuredSelector({
    selectUserPermissions
})

export default connect(mapStateToProps)(withRouter(withStyles(useStyles,{withTheme:true})(UserEdit)));