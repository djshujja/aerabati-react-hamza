import React from 'react';
import { Button,Input,Grid, Typography,CircularProgress, FormControl, InputLabel } from '@material-ui/core';

import { PrimaryTemplate } from '../../template';


import {connect} from "react-redux";

import {withRouter} from "react-router-dom";
import { resizeWindow} from "../../assets/utils/windowResizeDetection";

import {firebaseAuth} from "../../config/firebase.config";
import {commonState} from "../../assets/utils/registration_cmn_initial_state";




class ForgotPassword extends React.Component {
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

          


            <div className="container" style={{margin:"5rem auto",width:this.state.totalWidth}}>

           

           
            <Typography style={{marginBottom:20}} variant="h3">Forgot Password</Typography>

             {
                 this.showError("","data submission message")
             }


              <form onSubmit={this.handleSubmit}>

               <br/> <br/>
               <FormControl fullWidth={true}>
                     <InputLabel htmlFor="email" >Email</InputLabel>
                      <Input type="Email" value={email} name="email" id="email" aria-describedby="my-helper-text" onChange={ this.handleChange} />
                </FormControl> 

                 <br/><br/>

               
                         
                    

                  <Grid item xs={12}>
                      <Grid container justify="flex-start" >
                    <Button type="submit" variant="contained" className="primary-btn-red">
                           Confirm Email
                    </Button>
                    {
                        showProgressBar ?   <CircularProgress color="primary" style={{marginLeft:"1.5rem",marginTop:"1.5rem"}}/>: <div></div>
                     }
                     {
                         this.showError('show')
                     }




                     </Grid>
                  </Grid>

                

                    
                    </form>





                    
                  
                      
                
                 </div>


              


                </PrimaryTemplate>
              
        )
    }
}

 

export default withRouter(connect(null)(ForgotPassword));