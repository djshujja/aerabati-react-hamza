import React from "react";
import {
  Typography,
  Grid,
  form,
  TextField,
  FormControl,
  InputLabel,
  Input,
  TextareaAutosize,
  Select,
  Button,
} from "@material-ui/core";

import { PrimaryTemplate } from "../../template";
import { AdminTemplate } from "../../template";

import {
  addProductUrl,
  allshowrooms,
  allDealersCompanyName,
} from "./../../assets/serverUrls";
import axios from "axios";
import { connect } from "react-redux";
import {
  selectUserPermissions,
  userInfo,
} from "../../redux/registration/registration.reselect";
import { createStructuredSelector } from "reselect";
import isAnyEmptyField from "../../assets/utils/checkAllObjectFields";

const initialState = {
  name: "",
  email: "",
  address: "",
  // descriptions: "",
};

class Addshowroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      car_rental_company_id: "1",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCarRentalCompanyName = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    this.submitData(e)
    this.setState({message:"Showroom added successfully"})
    alert("Showroom added successfully");
    e.preventDefault();
   

    //

    // if (!isAnyEmptyField(this.state, "message")) {
    //   if (this.state.image.length > 0) this.submitData(e);
    //   else {
    //     this.setState({
    //       message: "Image required",
    //     });
    //   }
    // } else {
    //   this.setState({
    //     message: "All fields are required",
    //   });
    // }
  // }
  }

  submitData = (e) => {
    this.setState({
      message: "Please wait Showroom is adding",
    });
    let formData = new FormData();

    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("address", this.state.address);
    // formData.append("descriptions", this.state.descriptions);

    e.target.reset();

    //
    //   console.log(this.state);
    //
    //
    //
    axios
      .post(allshowrooms+`/new`, formData, {})
      .then((res) => {
        this.setState({
          ...initialState,
          // image: [],
          message: "Showroom added successfully",
        });
      })
      .catch((err) => {
        // this.setState({
        //     message:err.response ? err.response.data.error : err
        // })
        console.log("error received " + err);
      });
  };
  render() {
    return (
      <PrimaryTemplate>
        <AdminTemplate>
          <Typography variant={"h3"} style={{ marginLeft: 20 }}>
            {/* <h2>Add Car Items</h2> */}
            Add ShowRoom
          </Typography>

          <div className="container" style={{ margin: 20 }}>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="name"> Name</InputLabel>

                <Input
                  name="name"
                  id="name"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br /> <br />
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  name="email"
                  id="email"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br /> <br />
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="address">Address</InputLabel>
                <Input
                  name="address"
                  id="address"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />

                <br />
              </FormControl>
              {/* <FormControl fullWidth>
                <InputLabel htmlFor="age-native-simple">
                  Call Tracking
                </InputLabel>

                <Select
                  native
                  name={"callTracking"}
                  value={this.state.car_rental_company_id}
                  onChange={this.handleCarRentalCompanyName}
                >
                  <option>Enabled</option>
                  <option>Disabled</option>
                </Select>
              </FormControl>
              <br /> */}
              <br />
              <br />
              <br />
              <Grid container direction={"column"}>
                <Grid item sm>
                  <Button
                    type={"submit"}
                    className={"MuiButton-text primary-btn-red"}
                    variant={"contained"}
                    color={"primary"}
                  >
                    Add Showroom
                  </Button>
                  <Typography>
                    {this.state.message ? this.state.message : ""}
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
        </AdminTemplate>
      </PrimaryTemplate>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  permissions: selectUserPermissions,
  userInfo,
});
export default connect(mapStateToProps)(Addshowroom);
