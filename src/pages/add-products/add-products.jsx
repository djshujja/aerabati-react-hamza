import React from 'react';
import { Typography, Grid,form,TextField, FormControl, InputLabel,Input,TextareaAutosize, Select, Button } from '@material-ui/core';

import { PrimaryTemplate } from '../../template';
import { AdminTemplate } from '../../template';

import { addProductUrl,allDealersCompanyName } from './../../assets/serverUrls';
import axios from "axios";
import {connect} from "react-redux";
import {selectUserPermissions,userInfo} from "../../redux/registration/registration.reselect";
import {createStructuredSelector} from "reselect";
import isAnyEmptyField from "../../assets/utils/checkAllObjectFields";

const initialState = {
    name:"",
    model:"",
    location:"",
    descriptions:"",

    rental_period:"",
    rental_cost:"",
    mileage_limit:"",
    color_available:"",
    additional_mileage:"",
    toll_charge:"",
    excess_claim:"",
    security_deposit:"",
    accepted_in:"",
    pickup_charge:"",
//    car specification
    specs_description:"",
    //car features
    features_description:"",



    car_type:"",




}

class AddProducts extends React.Component {
   constructor(props){
       super(props);
       this.state = {
          ...initialState,



           rental_period:"Daily Rent",
           rental_cost:"AED 100",
           mileage_limit:"100km",
           color_available:"red",
           additional_mileage:"no",
           toll_charge:"no",
           excess_claim:"no",
           security_deposit:"no",
           accepted_in:"atm",
           pickup_charge:"no",

          specs_description:"no at this time",

           features_description:"no",
           car_type:"luxury",




           message:"",
           company_names:[],
           image:[],
           car_rental_company_id:"1",






       }

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this.handleFileChange = this.handleFileChange.bind(this);

   }


   handleCarRentalCompanyName = (e)=>{

     this.setState({
         [e.target.name] : e.target.value,


     })
    }


   componentDidMount() {



     (this.props.permissions.rights === "manager" || this.props.permissions.rights === "admin") ?  this.fetchCarCompanies() : this.setState({
         company_names:[{
             _id:this.props.permissions.dealershipId,
             car_rental_company_name:this.props.userInfo.car_rental_company_name
         }]
     });

   }
   fetchCarCompanies =  ()=>{
       axios.get(allDealersCompanyName).then(resData=>{


           this.setState({
               company_names:[...resData.data]
           })
       }).catch(err=>{
           console.log(err.response ? err.response.data:err);
       });
   }

    handleChange(e){
       this.setState({
        [e.target.name]:e.target.value
       })
      }
    handleFileChange(e){

      this.setState({
          image: [...this.state.image, ...e.target.files]
      })
    }
    onClickImageBtn = (e)=>{
       e.target.value="";
       this.setState({
           image:[],
       })
    }

    handleSubmit(e){
        e.preventDefault();




      //


        if(!isAnyEmptyField(this.state,"message")){
            if(this.state.image.length  > 0)
           this.submitData(e);
            else{
                this.setState({
                    message:"Image required"
                })
            }

        }else{
            this.setState({
                message:"All fields are required"
            })
        }




      

    }


    submitData = (e)=>{
        this.setState({
            message:"Please wait product is adding"
        })
        let formData = new FormData();
        for(let i = 0; i < this.state.image.length;i++){
            formData.append('image'+i,this.state.image[i]);

        }
        formData.append('name',this.state.name);
        formData.append('model',this.state.model);
        formData.append('location',this.state.location);
        formData.append('descriptions',this.state.descriptions);
        formData.append('rental_period',this.state.rental_period);
        formData.append('rental_cost',this.state.rental_cost);
        formData.append('mileage_limit',this.state.mileage_limit);
        formData.append('color_available',this.state.color_available);
        formData.append('additional_mileage',this.state.additional_mileage);
        formData.append('toll_charge',this.state.toll_charge);
        formData.append('excess_claim',this.state.excess_claim);
        formData.append('car_type',this.state.car_type);

        formData.append('security_deposit',this.state.security_deposit);

        formData.append('accepted_in',this.state.accepted_in);

        formData.append('pickup_charge',this.state.pickup_charge);

        formData.append('specs_description',this.state.specs_description);

        formData.append('features_description',this.state.features_description);

        formData.append('car_rental_company_id',this.state.car_rental_company_id);
        formData.append('car_rental_company_name',this.state.car_rental_company_name);

        e.target.reset();

        //
        //   console.log(this.state);
        //
        //
        //
        axios.post(addProductUrl, formData, {
        }).then(res => {



            this.setState({
                ...initialState,
                image:[],
                message:"Product added successfully"
            })
        }).catch(err=>{
            // this.setState({
            //     message:err.response ? err.response.data.error : err
            // })
            console.log("error received "+err);
        })
    }
    render(){


       
        return (
            <PrimaryTemplate>
                <AdminTemplate>
                    
                   <Typography variant={"h3"} style={{marginLeft:20}}>
                       {/* <h2>Add Car Items</h2> */}
                       Add Car Items
                   </Typography>

            <div className="container" style={{margin:20}}>
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                   <FormControl fullWidth={true}>
                        <InputLabel htmlFor="car-name" >Car Name</InputLabel>

                        <Input name="name" id="car-name" aria-describedby="my-helper-text" 
                        onChange={
                            this.handleChange
                            }
                        />

                        </FormControl>
                        <br/> <br/>

                        <FormControl fullWidth={true}>

                        <InputLabel htmlFor="car-model" >Car Model</InputLabel>
                        <Input name="model" id="car-model" aria-describedby="my-helper-text" 
                        
                        onChange={
                            this.handleChange
                            }
                        />

                        </FormControl> 

                        <br/> <br/>

                        <FormControl fullWidth={true} >
                        <InputLabel htmlFor="car-location" >Location</InputLabel>
                        <Input name="location" id="car-location" aria-describedby="my-helper-text" 
                        
                        onChange={
                            this.handleChange
                            }
                        />

                     <br/>


                        </FormControl>



                  <FormControl   fullWidth>
                      <InputLabel htmlFor="age-native-simple">Car Rental Company Name</InputLabel>


                      <Select
                          native
                          name={"car_rental_company_id"}
                          value={this.state.car_rental_company_id}
                          onChange={this.handleCarRentalCompanyName}


                      >

                          {
                              this.props.permissions.rights === 'manager' ||  this.props.permissions.rights === 'admin' ?
                                  <option aria-label="None" value="" /> : ""
                          }



                          {
                              this.state.company_names ? this.state.company_names.map((singleCompany,i) => {

                                  return(<option key={singleCompany.car_rental_company_name + i}
                                          value={singleCompany._id}>{singleCompany.car_rental_company_name}</option>)
                              }) :""
                          }









                      </Select>
                  </FormControl>

                  <br/><br/>

                  <TextField label={"What type of car"} fullWidth placeholder={"e.g luxury"} onChange={this.handleChange} name={"car_type"} value={this.state.car_type}/>


                        <br/><br/>

                        <Typography variant={"h5"}>Rent information </Typography>

                        <TextField  name={"rental_period"} fullWidth onChange={this.handleChange}  value={this.state.rental_period} label={"Rental period"} placeholder={"e.g Daily Rent"} />
                        <br/><br/>


                      <TextField name={"rental_cost"} fullWidth onChange={this.handleChange}  value={this.state.rental_cost} label={"Rental Cost"} placeholder={"e.g Daily Rent Cost"} />
                      <br/><br/>


                      <TextField name={"mileage_limit"} fullWidth onChange={this.handleChange}  value={this.state.mileage_limit} label={"Mileage limit"} placeholder={"e.g 100km"} />
                      <br/><br/>

                      <Typography variant={"h5"}>Additional info</Typography>

                      <TextField name={"color_available"} fullWidth onChange={this.handleChange}  value={this.state.color_available} label={"Available Color"} placeholder={"Write color name separated with comma"} />
                      <br/><br/>

                      <TextField name={"additional_mileage"} fullWidth onChange={this.handleChange}  value={this.state.additional_mileage} label={"Additional mileage info"} placeholder={"e.g AED 100/hr"} />
                      <br/><br/>

                      <TextField name={"toll_charge"} fullWidth onChange={this.handleChange}  value={this.state.toll_charge} label={"Toll charge"} placeholder={"Toll charge"} />
                      <br/><br/>

                     <TextField name={"excess_claim"} fullWidth onChange={this.handleChange}  value={this.state.excess_claim} label={"Excess claim"} placeholder={""} />
                  <br/><br/>
                      <TextField name={"security_deposit"} fullWidth onChange={this.handleChange}  value={this.state.security_deposit} label={"Rental period"} placeholder={"Daily Rent"} />
                      <br/><br/>



                      <TextField name={"accepted_in"} fullWidth onChange={this.handleChange}  value={this.state.accepted_in} label={"Accepted In"} placeholder={"Payment accepted by atm or other way"} />
                      <br/><br/>

                      <TextField name={"pickup_charge"} fullWidth onChange={this.handleChange}  value={this.state.pickup_charge} label={"Pickup charges"} placeholder={"Pickup charges"} />
                      <br/><br/>

                      <Typography  variant={"h5"}>Car Specification<small style={{fontSize:".7rem"}}>(Enter Car specifications separated with comma like 4 door, fit for 5 passengers)</small></Typography>
                      <br/>
                      <TextareaAutosize style={{width:"70%"}} fullWidth name="specs_description" value={this.state.specs_description} onChange={this.handleChange} id="car-descriptions"  aria-label="minimum height" rowsMin={3} placeholder="Car specification" />
                      <br/><br/>
                      <Typography  variant={"h5"}>Car Features<small style={{fontSize:".7rem"}}>(Car features separated with comma like cruise control, FM radio)</small></Typography>
                     <br/>
                      <TextareaAutosize style={{width:"70%"}} fullWidth name="features_description" value={this.state.features_description} onChange={this.handleChange} id="car-descriptions"  aria-label="minimum height" rowsMin={3} placeholder="Car features" />
                      <br/><br/>
                      <Typography variant={"h5"}>Overall Car Description</Typography>
                      <br/>
                      <TextareaAutosize style={{width:"70%"}} fullWidth name="descriptions" onChange={this.handleChange} id="car-descriptions"  aria-label="minimum height" rowsMin={3} placeholder="Enter your car descriptions here" />


                      <br/><br/>


                  <Typography variant={"h5"}>Upload multiple car images</Typography>
                  <br/>

                  <input
                            accept="image/*"
                           
                            id="contained-button-file"
                            name="image"
                            type="file"

                            className={"image"}
                            onClick={this.onClickImageBtn}
                            onChange={this.handleFileChange}
                            multiple
                        />
                       <br/><br/>

                  <Grid container direction={"column"}>
                      <Grid item sm>
                          <Button  type={"submit"} className={"MuiButton-text primary-btn-red"}  variant={"contained"} color={"primary"}>
                             Add Product
                          </Button>
                          <Typography>{
                              this.state.message ? this.state.message : ""
                          }</Typography>
                      </Grid>
                  </Grid>

                       
                        </form>
                      
                
                 </div>
                </AdminTemplate>
            </PrimaryTemplate>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    permissions:selectUserPermissions,
    userInfo
})
export default connect(mapStateToProps)(AddProducts);