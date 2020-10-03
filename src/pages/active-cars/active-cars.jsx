import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { FaTrashAlt, FaPencilAlt, FaPause } from "react-icons/fa";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { PrimaryTemplate } from "../../template";
import { AdminTemplate } from "../../template";

import axios from "axios";
import {
  getAllProductsDetailsUrl,
  deleteProduct,
  updateStatus,
} from "../../assets/serverUrls";
import serverHostName from "./../../assets/serverHost";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { DialogContentText } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogText: {
    color: theme.palette.blue,
  },
});
const initialState = {
  status: "",
};
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class ActiveCars extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOK = this.handleDialogOK.bind(this);
    // this.updateStatusPause = this.updateStatusPause.bind(this);

    this.state = {
      dialogText: "",
      isDialogOpen: false,
      isChecked: false,
      data: [],
    };
  }
  handleDialogOK() {
    console.log("Clicked OK!");

    this.setState({
      isDialogOpen: false,
    });
  }

  handleDialogClose() {
    this.setState({
      isDialogOpen: false,
    });
  }

  handleChange(e) {
    const target = e.target;
    const value = target.checked;

    this.setState(
      {
        isChecked: value,
        isDialogOpen: true,
      },
      () => {
        console.log("Open Dialog");
      }
    );
  }

  deleteProduct(id) {
    if (window.confirm("Are you sure?")) {
      const data = this.state.data.filter(
        (singleValue) => singleValue._id !== id
      );
      axios
        .get(deleteProduct + id)
        .then((res) => {
          console.log(res);
          this.setState({
            data: data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  updateToPause(id) {
    document.getElementById(id).innerHTML = `Paused`;

    let newData = {
      status: "Paused",
    };

    fetch(updateStatus + id, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((newData) => {
        console.log("Success:", newData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  updateToResume(id) {
    console.log("Activated");
    document.getElementById(id).innerHTML = `Active`;

    let newData = {
      status: "Active",
    };

    fetch(updateStatus + id, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((newData) => {
        console.log("Success:", newData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  componentDidMount() {
    this.setState({
      status: !this.status,
    });
    axios
      .get(getAllProductsDetailsUrl)
      .then((res) => {
        const data = JSON.parse(res.data);
        console.log(data);
        let allCars = [];
        this.setState({
          data: data,
          allCars: [...data],
        });
      })
      .catch((err) => {});
  }

  render() {
    const { classes } = this.props;
    return (
      <PrimaryTemplate>
        <AdminTemplate>
          <Grid container className="search-filter" alignItems="center">
            <Grid item sm={6}>
              <Typography style={{ color: "#cc0000", fontWeight: 700 }}>
                {this.state.data.length} Cars
              </Typography>
            </Grid>
            <Grid item sm={6} className="search-filter-select-container">
              <FormControl
                variant="outlined"
                className="search-filter-form"
                style={{ marginRight: 8 }}
              >
                <InputLabel>Show Room</InputLabel>
                <Select value={""} labelWidth={90}>
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Near By</MenuItem>
                  <MenuItem value={30}>Best</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className="search-filter-form">
                <InputLabel>Sort By</InputLabel>
                <Select value={""} labelWidth={55}>
                  <MenuItem value={10}>Newly Add</MenuItem>
                  <MenuItem value={20}>Best Selling</MenuItem>
                  <MenuItem value={30}>Low Rent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TableContainer>
            <Table style={{ width: "100%" }}>
              <TableHead style={{ backgroundColor: "#09080e", color: "#fff" }}>
                <TableRow>
                  <TableCell style={{ color: "#fff" }}>Name</TableCell>
                  <TableCell style={{ color: "#fff" }}>Year</TableCell>
                  <TableCell style={{ color: "#fff" }}>Status</TableCell>
                  <TableCell style={{ color: "#fff" }}>Rent</TableCell>
                  <TableCell style={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.data.map((singleValue) => (
                  <TableRow key={singleValue._id}>
                    <TableCell
                      style={{ border: "1px solid #ddd", width: "500px" }}
                    >
                      <Grid container spacing={2}>
                        <Grid item md={5} lg={5}>
                          <img
                            className="product-img"
                            style={{
                              width: "100%",
                              height: "250px",
                              objectFit: "cover",
                            }}
                            // src="https://article.images.consumerreports.org/f_auto/prod/content/dam/CRO%20Images%202018/Cars/November/CR-Cars-InlineHero-2019-Honda-Insight-driving-trees-11-18"
                            src={serverHostName + singleValue.imagePath}
                            alt={singleValue.name}
                          />
                        </Grid>
                        <Grid item md={7} lg={7}>
                          <div className="product-title-container">
                            <span> {singleValue.name}</span>
                          </div>
                          <div className="product-desc-container">
                            <ul>
                              <li>
                                <Typography>
                                  <b>Doors: </b>
                                  {singleValue.doors}
                                </Typography>
                              </li>
                              <li>
                                <Typography>
                                  {" "}
                                  <b>Transmission: </b>{" "}
                                  {singleValue.transmission}
                                </Typography>
                              </li>
                              <li>
                                <Typography>
                                  <b>Engine: </b> {singleValue.engine}
                                </Typography>
                              </li>
                              <li>
                                <Typography>
                                  <b>Car Type: </b> {singleValue.car_type}
                                </Typography>
                              </li>
                            </ul>

                            {/* <Typography> {singleValue.transmission}</Typography>
                            <Typography> {singleValue.engine}</Typography>
                            <Typography> {singleValue.car_type}</Typography> */}
                          </div>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      {singleValue.model}
                    </TableCell>
                    <TableCell
                      style={{ border: "1px solid #ddd" }}
                      id={singleValue._id}
                    >
                      {singleValue.status}
                    </TableCell>
                    <TableCell
                      style={{ border: "1px solid #ddd", width: "260px" }}
                    >
                      <b>Daily Rent: </b> {singleValue.daily_cost}
                      <br />
                      <b>Weekly Rent: </b>
                      {singleValue.weekly_cost}
                      <br />
                      <b>Monthly Rent: </b>
                      {singleValue.monthly_cost}
                      <br />
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <IconButton
                        className="car-btns product-action-btn-margin"
                        onClick={() => {
                          this.deleteProduct(singleValue._id);
                        }}
                      >
                        <FaTrashAlt />
                      </IconButton>
                      {/* <div> */}
                      {/* <Checkbox id="chkOpenDialog" onChange={this.handleChange} checked={this.state.isChecked}></Checkbox> */}
                      {/* <IconButton
                          className="car-btns product-action-btn-margin"
                          onClick={this.handleChange}
                        >
                          <FaTrashAlt />
                        </IconButton>
                        <Dialog
                          open={this.state.isDialogOpen}
                          onClose={this.handleDialogClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle
                            id="customized-dialog-title"
                            onClose={this.handleDialogClose}
                          >
                            {"Delete?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText
                              id="alert-dialog-description"
                              className="sd"
                            >
                              Are you sure you want to delete this?
                            </DialogContentText>
                            <DialogActions>
                              <Button
                                color="primary"
                                onClick={() => {
                                  this.deleteProduct(singleValue._id);
                                }}
                              >
                                OK
                              </Button>
                              <Button
                                color="primary"
                                onClick={this.handleDialogClose}
                              >
                                Cancel
                              </Button>
                            </DialogActions>
                          </DialogContent>
                        </Dialog> */}
                      {/* </div> */}
                      <Link to={`/edit-products/` + singleValue._id}>
                        {" "}
                        <IconButton className="car-btns product-action-btn-margin">
                          <FaPencilAlt />
                        </IconButton>
                      </Link>
                      <br></br>
                      <IconButton
                        className="car-btns product-action-btn-margin"
                        onClick={() => {
                          this.updateToPause(singleValue._id);
                        }}
                      >
                        <FaPause />
                      </IconButton>

                      <IconButton
                        className="car-btns product-action-btn-margin"
                        onClick={() => {
                          this.updateToResume(singleValue._id);
                        }}
                      >
                        <PlayArrowIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AdminTemplate>
      </PrimaryTemplate>
    );
  }
}

export default ActiveCars;
