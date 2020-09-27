import React from 'react';
import { Button,Input,Grid, Typography, Select,CircularProgress, MenuItem, FormControl, InputLabel } from '@material-ui/core';

import { PrimaryTemplate } from '../../template';

import submitSignUpData from './../../assets/utils/signUpUtils';
import formData from "../../assets/formData";
import {signUpUserUrl} from "../../assets/serverUrls";
import axios from "axios";
import {resizeWindow} from "../../assets/utils/windowResizeDetection";
import {firebaseAuth} from "../../config/firebase.config";
import {commonState} from "../../assets/utils/registration_cmn_initial_state";


const initialState = {
    rights:"",
    full_name:"",
    password:"",
    contact_no:"",
    country:"",
    city:"",
    car_rental_company_name:"",

}

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ...initialState,
           ...commonState,
            showCommonState : false,

           

        }

       this.handleChange = this.handleChange.bind(this);
       this.handleSelectChange = this.handleSelectChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);

    }

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

    handleSelectChange(e){
        let showCommonState = false;
        if(e.target.value === 'Car Rental Company'){
            showCommonState = true;
        }

        this.setState({
            [e.target.name]:e.target.value,
            showCommonState
        })
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

       const data = submitSignUpData(this.state);
      
      if(!data.includes("mendatory")){
        
        e.target.reset();

         this.createFirebaseUser();

       }else{
        this.setState({
            message:data,
            showProgressBar:false
        })
       }
    }

    createFirebaseUser(){
        firebaseAuth.createUserWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
           this.axiosReq();
        }).catch(err=>{
            this.failResponseError(err.message);
        })

    }
    axiosReq(){
        const formDataLocal = formData(this.state,"showProgressBar");

        axios.post(signUpUserUrl,formDataLocal).then(res=>{
            
            this.setState({
                ...initialState,
                message:res.data,
                showProgressBar:false
            })
        }).catch(err=>{
            this.failResponseError(err.response.data.error);
       

 
        })
        
        
    
    }

    failResponseError(msg){
        this.setState({
            showProgressBar:false,
            message:msg
        })
    }

    componentDidMount() {
        resizeWindow( {totalWidth: "90%"},600,(updateValue)=>{

            this.setState({
                ...updateValue
            })
        })
    }


    render(){
      
        
        return (
            <PrimaryTemplate>






               <div className="container" style={{margin:"5rem auto",width:this.state.totalWidth}}>







           

           
            <Typography style={{marginBottom:20}} variant="h3">
                      
                      Register Here!
                   </Typography>

             {
                 this.showError("","data submission message")
             }


              <form id="form1" onSubmit={this.handleSubmit}>

              <FormControl fullWidth={true} >
              
              <Grid item xs={12} style={{margin:"1rem 0"}}>
                 <Grid container justify="flex-start" >

                 <Typography style={{marginRight:"1rem"}}  variant="h6"> Sign up as a </Typography>

              <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    style={{width:"10rem"}}
                    name="rights"
                    onChange={this.handleSelectChange}
                    value={this.state.rights}
                >
                    
                    <MenuItem value={"Visitor"}>Visitor</MenuItem>
                    <MenuItem value={"Car Rental Company"}>Car rental company</MenuItem>
                    
                </Select>
                </Grid>
                </Grid>
                </FormControl>

                <FormControl fullWidth={true} >
                    <InputLabel htmlFor="full-name" >Full Name</InputLabel>

                    <Input type="text" value={this.state.full_name} name="full_name" id="full-name" aria-describedby="my-helper-text" onChange={this.handleChange} />
               </FormControl>
               {
                     this.showError("full_name")
                 }




                        <br/> <br/>
               <FormControl fullWidth={true}>
                     <InputLabel htmlFor="email" >Email</InputLabel>
                      <Input type="Email" value={this.state.email} name="email" id="email" aria-describedby="my-helper-text" onChange={ this.handleChange} />
                </FormControl> 

                {
                     this.showError("email")
                 }



                       <br/> <br/>

                <FormControl fullWidth={true} >
                       <InputLabel htmlFor="password" >Password</InputLabel>
                        <Input type="password" value={this.state.password} name="password" id="password" aria-describedby="my-helper-text"  onChange={ this.handleChange}
                        />
                   

                </FormControl>

                {
                     this.showError("password")
                 }
                        <br/><br/>

                <FormControl fullWidth={true} >
                       <InputLabel htmlFor="contact-no">Contact no <small>(phone no)</small></InputLabel>
                        <Input type="text" value={this.state.contact_no} name="contact_no" id="contact-no" aria-describedby="my-helper-text"  onChange={ this.handleChange}
                        />
                </FormControl>

                {
                     this.showError("contact_no")
                 }
                        <br/><br/>

                <FormControl fullWidth={true} >
                       <InputLabel htmlFor="country" >Country</InputLabel>
                        <Input type="text" value={this.state.country} name="country" id="country" aria-describedby="my-helper-text"  onChange={ this.handleChange}
                        />
                </FormControl>
                {
                     this.showError("country")
                 }
                        <br/><br/>

                 <FormControl fullWidth={true} >
                       <InputLabel htmlFor="city">City</InputLabel>
                        <Input type="text" value={this.state.city} name="city" id="city" aria-describedby="my-helper-text"  onChange={ this.handleChange}
                        />
                </FormControl>

                {
                     this.showError("city")
                 }
                        <br/><br/>

                  {
                      this.state.showCommonState ? (


                        <FormControl fullWidth={true} >
                       <InputLabel htmlFor="car_rental_company_name">Car rental company name</InputLabel>
                        <Input type="text" value={this.state.car_rental_company_name} name="car_rental_company_name" id="car_rental_company_name" aria-describedby="my-helper-text"  onChange={ this.handleChange}
                        />
                </FormControl>  ): ''}

                {
                     this.showError("car_rental_company_name")
                 }
                        <br/><br/>


                         
                    
                    <br/><br/>
                    <Grid>
                    <Button type="submit" variant="contained" className="primary-btn-red">
                           Register Me
                       </Button>
                    {
                      this.state.showProgressBar ?   <CircularProgress color="primary" style={{marginLeft:"1.5rem",marginTop:"1.5rem"}}/>: <div></div>
                     }
                     {
                         this.showError('show')
                     }

                     </Grid>

                

                    
                    </form>

                    
                  
                      
                
                 </div>


              


                </PrimaryTemplate>
              
        )
    }
}

 

export default SignUp;