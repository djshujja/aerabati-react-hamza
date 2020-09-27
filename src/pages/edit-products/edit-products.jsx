import React from 'react';
import {
    Typography,
    form,
    FormControl,
    InputLabel,
    Input,
    TextareaAutosize,
    Button,
    Select,
    TextField, Grid
} from '@material-ui/core';

import { PrimaryTemplate } from '../../template';
import { AdminTemplate } from '../../template';

import { editSpecificProduct,updateProducts } from '../../assets/serverUrls';
import axios from "axios";
import {withRouter} from "react-router-dom";
import serverHostName from "../../assets/serverHost";

const initialState = {
    name:"",
    model:"",
    location:"",
    descriptions:"",
    image:[],
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

    car_image:"",
    multiple_image_path:"",


}

class EditProducts extends React.Component {
   constructor(props){
       super(props);
       this.state = {
         ...initialState,
           message:"",

       

        
       }
       const {id} = this.props.match.params;
       this.id  =id;

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this.handleFileChange = this.handleFileChange.bind(this);
      
   }



    handleFileChange(e){

        this.setState({
            image: [...this.state.image, ...e.target.files]
        })
    }

    componentDidMount(){


   
       axios.get(editSpecificProduct+this.id)
       .then(res=>{
           const data = JSON.parse(res.data);
          console.log(data);
         
           this.setState({
               name:data.name,
               model:data.model,
               location:data.location,
               descriptions:data.descriptions,



               rental_period:data.rental_period,
               rental_cost:data.rental_cost,
               mileage_limit:data.mileage_limit,
               color_available:data.color_available,
               additional_mileage:data.additional_mileage,
               toll_charge:data.toll_charge,
               excess_claim:data.excess_claim,
               security_deposit:data.security_deposit,
               accepted_in:data.accepted_in,
               pickup_charge:data.pickup_charge,
//    car specification
               specs_description:data.specs_description,
               //car features
               features_description:data.features_description,
               car_rental_company_id:data.car_rental_company_name,
              // company_names:[],

               car_type:data.car_type,
               car_rental_company_name:data.car_rental_company_name,
               car_image:data.imagePath,
               multiple_image_path:data.multiple_image_path

           })
       }).catch(err=>{
           console.log("err received "+err);
       })
        
   }

   handleChange(e){
       this.setState({
        [e.target.name]:e.target.value
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
        let formData = new FormData();
        this.setState({
            message:"please wait..."
        })


        if(this.state.image.length > 0) {
            for(let i = 0; i < this.state.image.length;i++){
                formData.append('image'+i,this.state.image[i]);

            }


        }

        formData.append("multiple_image_path",this.state.multiple_image_path);
        formData.append("old_image_path",this.state.car_image);

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



        

       
    
   
       
        axios.post(updateProducts+this.id, formData, {
      }).then(res => {
         this.setState({
             message:"Product updated successfully. Please refresh a page"
         })
      }).catch(err=>{
          console.log("error received "+err);
      })
 

      

    }  
    render(){
       
        return (
            <PrimaryTemplate>
                <AdminTemplate>

                    <Typography variant={"h3"} style={{marginLeft:20}}>
                      Edit Car
                    </Typography>

                    <div className="container" style={{margin:20}}>
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="car-name" >Car Name</InputLabel>

                                <Input value={this.state.name} name="name" id="car-name" aria-describedby="my-helper-text"
                                       onChange={
                                           this.handleChange
                                       }
                                />

                            </FormControl>
                            <br/> <br/>

                            <FormControl fullWidth={true}>

                                <InputLabel htmlFor="car-model" >Car Model</InputLabel>
                                <Input value={this.state.model} name="model" id="car-model" aria-describedby="my-helper-text"

                                       onChange={
                                           this.handleChange
                                       }
                                />

                            </FormControl>

                            <br/> <br/>

                            <FormControl fullWidth={true} >
                                <InputLabel htmlFor="car-location" >Location</InputLabel>
                                <Input value={this.state.location} name="location" id="car-location" aria-describedby="my-helper-text"

                                       onChange={
                                           this.handleChange
                                       }
                                />

                                <br/>


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

                            <Typography  variant={"h5"}>Car Specification<small style={{fontSize:".7rem"}}>(Enter Car specifications separated with comma like 4 door, fit for 5 passengers and more)</small></Typography>
                            <br/>
                            <TextareaAutosize style={{width:"70%"}} fullWidth name="specs_description" value={this.state.specs_description} onChange={this.handleChange} id="car-descriptions"  aria-label="minimum height" rowsMin={3} placeholder="Car specification" />
                            <br/><br/>
                            <Typography  variant={"h5"}>Car Features<small style={{fontSize:".7rem"}}>(Car features separated with comma like cruise control, FM radio and more)</small></Typography>
                            <br/>
                            <TextareaAutosize style={{width:"70%"}} fullWidth name="features_description" value={this.state.features_description} onChange={this.handleChange} id="car-descriptions"  aria-label="minimum height" rowsMin={3} placeholder="Car features" />
                            <br/><br/>
                            <Typography variant={"h5"}>Overall Car Description</Typography>
                            <br/>
                            <TextareaAutosize value={this.state.descriptions} style={{width:"70%"}} fullWidth name="descriptions" onChange={this.handleChange} id="car-descriptions"  aria-label="minimum height" rowsMin={3} placeholder="Enter your car descriptions here" />


                            <br/><br/>


                            <Typography variant={"h5"}>Upload multiple car images</Typography>
                            <br/>

                            <input
                                accept="image/*"

                                id="contained-button-file"
                                name="image"
                                type="file"
                                onChange={this.handleFileChange}
                                multiple
                                onClick={this.onClickImageBtn}
                            />
                            <br/><br/>
                            <Grid container>
                                {
                                    this.state.multiple_image_path.split(",").map(img=>{

                                       return img?(
                                           <Grid item>
                                               <img width={"150px"} height={"150px"} src={serverHostName+img} alt="Cars"/>
                                           </Grid>

                                       ):<div></div>
                                    })
                                }
                            </Grid>

                            <br/><br/>

                            <Grid container direction={"column"}>
                                <Grid item sm>
                                    <Button  type={"submit"} className={"MuiButton-text primary-btn-red"}  variant={"contained"} color={"primary"}>
                                        Update Product
                                    </Button>
                                    {
                                        this.state.message ? <Typography>{this.state.message}</Typography>:""
                                    }
                                </Grid>
                            </Grid>


                        </form>




                    </div>
                </AdminTemplate>
            </PrimaryTemplate>
        )
    }
}

export default withRouter(EditProducts);