import React from 'react';
import { Button,Input,Grid, Typography, Select,CircularProgress, MenuItem, FormControl, InputLabel, Paper } from '@material-ui/core';

import { PrimaryTemplate } from '../../template';


import {connect} from "react-redux";

import {withRouter} from "react-router-dom";
import {resize, resizeWindow} from "../../assets/utils/windowResizeDetection";
import formData from "../../assets/formData";

import axios from "axios";
import {firebaseAuth} from "../../config/firebase.config";
import {commonState} from "../../assets/utils/registration_cmn_initial_state";




class Settings extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ...commonState
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    componentDidMount() {
        resizeWindow( {totalWidth: "90%"},600,(updateValue)=>{

            this.setState({
                ...updateValue
            })
        })
    }
    // resizeWindow(){
    //
    // }




    showError(check){
        return(
            <div>
                {
                    this.state.message ?
                        this.state.message.includes(check) || (check === 'show' && this.state.message !== '')?

                            <Typography color="error"><small>{this.state.message}</small></Typography>:

                            <div/>
                        : ""

                }

            </div>
        )
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();

        this.setState({
            showProgressBar:true
        })


        const {email} = this.state;
        if(email !== ""){

            this.firebaseEmailConfirmation();

        }else{
            this.failResponseError("Please enter your valid email address here");
        }

    }

    failResponseError(msg){
        this.setState({
            showProgressBar:false,
            message:msg
        })
    }

    firebaseEmailConfirmation(){
        firebaseAuth.sendPasswordResetEmail(this.state.email);
        this.failResponseError("Password reset link has been sent to your email address");


    }

    axiosReq(){


    }





    redirectPage = (jsonData)=>{

    }

    render(){
        const {email,showProgressBar} = this.state;


        return (
            <PrimaryTemplate>

                <div>
                    Settings
                </div>


            </PrimaryTemplate>

        )
    }
}



export default withRouter(connect(null)(Settings));