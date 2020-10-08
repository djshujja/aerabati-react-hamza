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
import "react-datepicker/dist/react-datepicker.css";

import {
  editSpecificProduct,
  updateProducts,
  editDealer,
  dealershipDetailedInfo,
} from "../../assets/serverUrls";
import axios from "axios";
import { withRouter } from "react-router-dom";
import serverHostName from "../../assets/serverHost";

const initialState = {
  // name:"",
  // email:"",
  // city:"",
  // contactNo:"",
  license_no: "",
  license_expiration_date: "",
  contract_start_date: "",
  contract_end_date: "",
};

class EditInfo extends React.Component {
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
      .get(dealershipDetailedInfo + this.id)
      .then((res) => {
        const data = res.data.dealingInformation;
        console.log(data);

        this.setState({
          license_no: data.license_no,
          license_expiration_date: data.license_expiration_date,
          contract_start_date: data.contract_start_date,
          contract_end_date: data.contract_end_date,
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

    // formData.append("name",this.state.name);
    // formData.append("email",this.state.email);

    // formData.append('contactNo',this.state.contactNo);
    formData.append("contract_start_date", this.state.contract_start_date);

    console.log(
      `${this.state.license_no} + ${this.state.license_expiration_date} `
    );
    formData.append("contract_end_date", this.state.contract_end_date);
    formData.append("license_no", this.state.license_no);
    formData.append(
      "license_expiration_date",
      this.state.license_expiration_date
    );

    axios
      .post(editDealer + this.id, formData, {})
      .then((res) => {
        console.log(res);
        this.setState({
          message: "Car Information updated successfully",
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
            Edit Information
          </Typography>

          <div className="container" style={{ margin: 20 }}>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="car-name">Liscence No</InputLabel>

                <Input
                  value={this.state.license_no}
                  name="license_no"
                  id="license_no"
                  aria-describedby="my-helper-text"
                  onChange={this.handleChange}
                />
              </FormControl>
              <br /> <br />
              <FormControl fullWidth={true}>
                <TextField
                  fullWidth
                  id="date"
                  label="License Expiration Date"
                  type="date"
                  name="license_expiration_date"
                  onChange={this.handleChange}
                  value={this.state.license_expiration_date.substring(0, 10)}
                  //    className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <br /> <br />
              <FormControl fullWidth={true}>
                <TextField
                  fullWidth
                  id="date"
                  label="Contract Start Date"
                  type="date"
                  name="contract_start_date"
                  onChange={this.handleChange}
                  value={this.state.contract_start_date.substring(0, 10)}
                  //    className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <br /> <br />
              <FormControl fullWidth={true}>
                <TextField
                  fullWidth
                  id="date"
                  label="Contract End Date"
                  type="date"
                  name="contract_end_date"
                  onChange={this.handleChange}
                  value={this.state.contract_end_date.substring(0, 10)}
                  //    className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <br /> <br />
              {/* <FormControl fullWidth={true}>
                                <InputLabel htmlFor="car-name" >Liscence No</InputLabel>

                                <Input value={this.state.name} name="name" id="car-name" aria-describedby="my-helper-text"
                                       onChange={
                                           this.handleChange
                                       }
                                />

                            </FormControl>
                            <br/> <br/>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="car-name" >License Expiration Date</InputLabel>

                                <Input value={this.state.name} name="name" id="car-name" aria-describedby="my-helper-text"
                                       onChange={
                                           this.handleChange
                                       }
                                />

                            </FormControl>
                            <br/> <br/>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="car-name" >Contract Start Date</InputLabel>

                                <Input value={this.state.name} name="name" id="car-name" aria-describedby="my-helper-text"
                                       onChange={
                                           this.handleChange
                                       }
                                />

                            </FormControl>
                            <br/> <br/>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="car-name" >Contract End Date</InputLabel>

                                <Input value={this.state.name} name="name" id="car-name" aria-describedby="my-helper-text"
                                       onChange={
                                           this.handleChange
                                       }
                                />

                            </FormControl> */}
              <br /> <br />
              <br />
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
                    Update Car Information
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

export default withRouter(EditInfo);
