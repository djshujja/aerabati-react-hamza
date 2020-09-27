import React from 'react';
import { Button,Input,Grid, Typography,CircularProgress, FormControl, InputLabel } from '@material-ui/core';

import { PrimaryTemplate } from '../../template';

import formData from "../../assets/formData";
import loginUtil from "../../assets/utils/logInUtils";
import axios from "axios";
import {loginUserUrl,signUpUserByFirebaseUrl} from "../../assets/serverUrls";
import {connect} from "react-redux";
import {loginAction} from "../../redux/registration/registration.action";
import {withRouter,Link} from "react-router-dom";
import {firebaseAuth,googleProvider} from "../../config/firebase.config";
import {resizeWindow} from "../../assets/utils/windowResizeDetection";
import {commonState} from "../../assets/utils/registration_cmn_initial_state";


const initialState = {
     password:""
}

class LogIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ...initialState,
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

       const check = loginUtil(this.state,"showProgressBar");
        
       if(!check.includes("mendatory")){
             this.firebaseSimpleLogin();
        //   this.axiosReq();

       }else{
           this.failResponseError(check);
       }

      
       
       
    }

    axiosReq(){
        const formDataLocal = formData(this.state,"showProgressBar");

        axios.post(loginUserUrl,formDataLocal).then(res=>{
          // console.log(res);

          this.redirectPage(res);


        }).catch(err=>{


            firebaseAuth.signOut();

         //   this.failResponseError(err.response.data.error);


        })
    }
    firebaseSimpleLogin() {
        firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res=>{
                this.axiosReq();

            }).catch(err=>{
               this.failResponseError(err.message);
        })
    }

    failResponseError(msg){
        this.setState({
            showProgressBar:false,
            message:msg
        })
    }


    firebaseLogin = ()=>{
        firebaseAuth.signInWithPopup(googleProvider).then(result=>{


            // The signed-in user info.
            var user = result.user;
            const formDataLocal = formData({
                full_name:user.displayName,
                email:user.email,
            });

           axios.post(signUpUserByFirebaseUrl,formDataLocal).then((result)=>{
               this.redirectPage(result);

           }).catch(err=>{

               firebaseAuth.signOut();
               this.failResponseError(err.message);

           })

        }).catch(error=>{

            // Handle Errors here.

            var errorMessage = error.message;
            // The email of the user's account used.
            this.failResponseError(errorMessage);

            // ...

        })
    }

    redirectPage = (jsonData)=>{
        const data = JSON.parse(JSON.stringify(jsonData.data));
        this.props.loginAction(data);
        this.props.history.push("");
    }
   
    render(){
        const {email,password} = this.state;
      
        
        return (
            <PrimaryTemplate>

          


            <div className="container" style={{margin:"5rem auto",width:this.state.totalWidth}}>

           

           
            <Typography style={{marginBottom:20}} variant="h3">
                      
                     Log In Here!
                   </Typography>




              <form onSubmit={this.handleSubmit}>

               <br/> <br/>
               <FormControl fullWidth={true}>
                     <InputLabel htmlFor="email" >Email</InputLabel>
                      <Input type="Email" value={email} name="email" id="email" aria-describedby="my-helper-text" onChange={ this.handleChange} />
                </FormControl> 




                       <br/> <br/>

                <FormControl fullWidth={true} >
                       <InputLabel htmlFor="password" >Password</InputLabel>
                        <Input type="password" value={password} name="password" id="password" aria-describedby="my-helper-text"  onChange={ this.handleChange}
                        />
                   

                </FormControl>


                        <br/><br/>

               
                         
                    
                    <br/><br/>
                  <Grid item xs={12}>
                      <Grid container justify="flex-start" >
                    <Button type="submit" variant="contained" className="primary-btn-red">
                           Log In
                    </Button>
                    {
                        this.state.showProgressBar ?   <CircularProgress color="primary" style={{marginLeft:"1.5rem",marginTop:"1.5rem"}}/>: <Button  variant="contained" color="primary" onClick={this.firebaseLogin} style={{"color":"#34495e","backgroundColor":"#ecf0f1","marginLeft":"1rem","boxShadow":"0 1rem 4rem rgba(#000,.8)"}}>
                            Sign In With Google
                        </Button>
                     }
                     {
                         this.showError('show')
                     }




                     </Grid>
                  </Grid>

                

                    
                    </form>

                <Link to="/forgot-password">
                <Typography >   <small style={{"margin":"2rem 0","cursor":"pointer","color":"#34495e"}}>Forgot Password?</small></Typography>
                </Link>





                    
                  
                      
                
                 </div>


              


                </PrimaryTemplate>
              
        )
    }
}

 

export default withRouter(connect(null,{loginAction})(LogIn));