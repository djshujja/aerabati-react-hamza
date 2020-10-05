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
  allshowrooms,
} from "../../assets/serverUrls";
import axios from "axios";
import { withRouter } from "react-router-dom";
import serverHostName from "../../assets/serverHost";

const initialState = {
  name: "",
  email: "",
  address: "",
};

class Editshowroom extends React.Component {
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
      .get(allshowrooms + `/${this.id}`)
      .then((res) => {
        const data = res.data;
        console.log(res.data);

        this.setState({
          name: data.name,
          email: data.email,
          address: data.address,
          //    descriptions:data.descriptions,
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

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    this.setState({
      message: "please wait...",
    });

    formData.append("name", this.state.name);
    formData.append("email", this.state.email);

    formData.append("address", this.state.address);
    // formData.append('model',this.state.model);

    console.log(formData);
    axios
      .post(allshowrooms + `/updateshowroom/` + this.id, formData, {})
      .then((res) => {
        alert("Showroom Information Updated Successfully");
        this.setState({
          message: "Showroom Information updated successfully",
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
            Edit ShowRoom
          </Typography>

          <div className="container" style={{ margin: 20 }}>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="name"> Name</InputLabel>

                <Input
                  value={this.state.name}
                  name="name"
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
                  id="email"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br /> <br />
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="address">Address</InputLabel>

                <Input
                  value={this.state.address}
                  name="address"
                  id="address"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br /> <br />
              {/* <FormControl fullWidth={true}>
                                <InputLabel htmlFor="car-name" ></InputLabel>

                                <Input value={this.state.name} name="name" id="car-name" aria-describedby="my-helper-text"
                                       onChange={
                                           this.handleChange
                                       }
                                />

                            </FormControl> */}
              <br /> <br />
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
                    Update Showroom Information
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

export default withRouter(Editshowroom);
