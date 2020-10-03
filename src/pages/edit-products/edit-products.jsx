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
    daily_cost:"",
    monthly_cost:"",
    weekly_cost:"",
    daily_mileage_limit:"",
    monthly_mileage_limit:"",
    weekly_mileage_limit:"",
    color_available:"",
    doors:"",
    transmission:"",
    engine:"",
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
    terms:"",



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



               daily_cost:"100 AED",
            monthly_cost:"2000 AED",
            weekly_cost:"450 AED",
            daily_mileage_limit:"100 KM",
            monthly_mileage_limit:"1000 KM",
            weekly_mileage_limit:"500 KM",
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
               doors:data.doors,
               transmission:data.transmission,
               engine:data.engine,
               terms:data.terms,
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

        formData.append('daily_cost',this.state.daily_cost);
        formData.append('monthly_cost',this.state.monthly_cost);
        formData.append('weekly_cost',this.state.weekly_cost);
        formData.append('daily_mileage_limit',this.state.daily_mileage_limit);
        formData.append('weekly_mileage_limit',this.state.weekly_mileage_limit);
        formData.append('monthly_mileage_limit',this.state.monthly_mileage_limit);
        formData.append('color_available',this.state.color_available);
        formData.append('doors',this.state.doors);
        formData.append('transmission',this.state.transmission);
        formData.append('engine',this.state.engine);
        formData.append('car_rental_company_name',this.state.terms);
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
        alert('Car Information Updated Successfully')
         this.setState({
             message:"Car Information updated successfully"
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

                            <TextField name={"daily_cost"} fullWidth onChange={this.handleChange}  value={this.state.daily_cost} label={"Daily Cost"} placeholder={"e.g Daily Rent Cost"} />
                      <br/><br/>
                      <TextField name={"daily_mileage_limit"} fullWidth onChange={this.handleChange}  value={this.state.daily_mileage_limit} label={"Daily Milage limit"} placeholder={"e.g Daily Milage limit"} />
                      <br/><br/>
                      <TextField name={"weekly_cost"} fullWidth onChange={this.handleChange}  value={this.state.weekly_cost} label={"Weekly Cost"} placeholder={"e.g Weekly Cost"} />
                      <br/><br/>
                      <TextField name={"weekly_mileage_limit"} fullWidth onChange={this.handleChange}  value={this.state.weekly_mileage_limit} label={"Weekly Milage limit"} placeholder={"e.g Weekly Milage limit"} />
                      <br/><br/>
                      <TextField name={"monthly_cost"} fullWidth onChange={this.handleChange}  value={this.state.monthly_cost} label={"Monthly Cost"} placeholder={"e.g Monthly Cost"} />
                      <br/><br/>
                      <TextField name={"monthly_mileage_limit"} fullWidth onChange={this.handleChange}  value={this.state.monthly_mileage_limit} label={" Monthly Mileage limit"} placeholder={"e.g 100km"} />
                      <br/><br/>
                            <Typography variant={"h5"}>Additional info</Typography>

                            <TextField name={"color_available"} fullWidth onChange={this.handleChange}  value={this.state.color_available} label={"Available Color"} placeholder={"Write color name separated with comma"} />
                      <br/><br/>

                      <TextField name={"doors"} fullWidth onChange={this.handleChange}  value={this.state.doors} label={"Doors"} placeholder={"e.g 2 doors "} />
                      <br/><br/>

                      <TextField name={"transmission"} fullWidth onChange={this.handleChange}  value={this.state.transmission} label={"Transmission"} placeholder={"Toll charge"} />
                      <br/><br/>
                      
                     <TextField name={"engine"} fullWidth onChange={this.handleChange}  value={this.state.engine} label={"Engine"} placeholder={""} />
                  <br/><br/>
                  <Typography variant={"h5"}>Terms and Condition</Typography>
                      <br/>
                      <TextareaAutosize style={{width:"70%"}} fullWidth name={"terms"}  value={this.state.terms}  onChange={this.handleChange} id="car-descriptions"  aria-label="minimum height" rowsMin={3} placeholder="Enter Terms And Conditions Here" />


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
                                        Update Car Information
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