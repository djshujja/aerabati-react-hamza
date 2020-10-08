import React from "react";
import {
  Typography,
  form,
  FormControl,
  InputLabel,
  Input,
  TextareaAutosize,
  Button,
  Select,
  TextField,
  Grid,
} from "@material-ui/core";

import { PrimaryTemplate } from "../../template";
import { AdminTemplate } from "../../template";

import {
  editSpecificProduct,
  updateProducts,
  getUsername,
  editUsername,
} from "../../assets/serverUrls";
import axios from "axios";
import { withRouter } from "react-router-dom";
import serverHostName from "../../assets/serverHost";

const initialState = {
  full_name: "",
  email: "",
  car_rental_company_name: "",
  country: "",
  city: "",
  contact_no: "",
};

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      message: "",
    };
    const { id } = this.props.match.params;
    this.id = id;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(getUsername + this.id)
      .then((res) => {
        const data = res.data;
        console.log(data);

        this.setState({
          full_name: data.full_name,
          email: data.email,
          car_rental_company_name: data.car_rental_company_name,
          country: data.country,
          city: data.city,
          contact_no: data.contact_no,
        });
      })
      .catch((err) => {
        console.log("err received " + err);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onClickImageBtn = (e) => {
    e.target.value = "";
  };

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    this.setState({
      message: "please wait...",
    });

    formData.append("full_name", this.state.full_name);
    formData.append("email", this.state.email);

    formData.append(
      "car_rental_company_name",
      this.state.car_rental_company_name
    );
    formData.append("country", this.state.country);
    formData.append("city", this.state.city);
    formData.append("contact_no", this.state.contact_no);

    axios
      .post(editUsername + this.id, formData, {})
      .then((res) => {
        alert("User Information Updated Successfully");
        this.setState({
          message: "User Information  updated successfully",
        });
      })
      .catch((err) => {
        console.log("error received " + err);
      });
  }
  render() {
    return (
      <PrimaryTemplate>
        <AdminTemplate>
          <Typography variant={"h3"} style={{ marginLeft: 20 }}>
            Edit User
          </Typography>

          <div className="container" style={{ margin: 20 }}>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="full_name">Name</InputLabel>

                <Input
                  value={this.state.full_name}
                  name="full_name"
                  id="car-name"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br /> <br />
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  value={this.state.email}
                  name="email"
                  id="model"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br /> <br />
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="type">Company Name</InputLabel>
                <Input
                  value={this.state.car_rental_company_name}
                  name="car_rental_company_name"
                  id="car_rental_company_name"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />

                <br />
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="country">Country</InputLabel>
                <Input
                  value={this.state.country}
                  name="country"
                  id="country"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="country">City</InputLabel>
                <Input
                  value={this.state.city}
                  name="city"
                  id="city"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br></br>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="contact">Contact</InputLabel>
                <Input
                  value={this.state.contact_no}
                  name="contact_no"
                  id="contact_no"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />
              </FormControl>
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
                    Update Product
                  </Button>
                  {this.state.message ? (
                    <Typography>{this.state.message}</Typography>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </form>
          </div>
        </AdminTemplate>
      </PrimaryTemplate>
    );
  }
}

export default withRouter(UserEdit);
