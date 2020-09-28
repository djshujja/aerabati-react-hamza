import React from "react";
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import {
  FaTrash,
  FaPause,
  FaPencilAlt,
  FaMinus,
  FaThumbsUp,
} from "react-icons/fa";
import { PrimaryTemplate } from "../../template";
import { AdminTemplate } from "../../template";

import axios from "axios";
import { allbookings, deleteProduct } from "../../assets/serverUrls";

import { Link } from "react-router-dom";

class Leads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  deleteProduct(id) {
    const data = this.state.data.filter(
      (singleValue) => singleValue._id !== id
    );
    this.setState({
      data: data,
    });
    if (window.confirm("Are you sure?")) {
      fetch("https://aerbeti-bck-test.herokuapp.com/api/bookings/" + id, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }
  // deleteBooking(bookingId) {
  //   const data = this.state.data.filter(
  //     (singleValue) => singleValue._id !== bookingId
  //   );
  //   this.setState({
  //     data: data,
  //   });
  //   // if (window.confirm("Are you sure?")) {
  //   //   fetch(
  //   //     "https://aerbeti-bck-test.herokuapp.com/api/bookings/" + bookingId,
  //   //     {
  //   //       method: "DELETE",
  //   //       header: {
  //   //         Accept: "application/json",
  //   //         "Content-Type": "application/json",
  //   //       },
  //   //     }
  //   //   );
  //   // }
  // }

  componentDidMount() {
    axios
      .get(allbookings)
      .then((res) => {
        let allBookings = [];
        console.log(res);
        this.setState({
          data: res.data,
          allBookings: [...res.data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <PrimaryTemplate>
        <AdminTemplate>
          <Grid container className="search-filter" alignItems="center">
            <Grid item sm={6}>
              <Typography style={{ color: "#cc0000", fontWeight: 700 }}>
                {this.state.data.length} Bookings
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
            <Table style={{ width: "80%" }}>
              <TableHead style={{ backgroundColor: "#09080e", color: "#fff" }}>
                <TableRow>
                  <TableCell style={{ color: "#fff" ,width:"80px"}}>First Name</TableCell>
                  <TableCell style={{ color: "#fff" }}>Last Name</TableCell>
                  <TableCell style={{ color: "#fff" }}>Phone No</TableCell>
                  <TableCell style={{ color: "#fff" }}>Taken Time</TableCell>
                  <TableCell style={{ color: "#fff" }}>Return Time</TableCell>
                  <TableCell style={{ color: "#fff" }}>Booking Id</TableCell>
                  <TableCell style={{ color: "#fff" }}>Status</TableCell>
                  <TableCell style={{ color: "#fff" }}>
                    Special Instructions
                  </TableCell>
                  <TableCell style={{ color: "#fff" }}>Car</TableCell>
                  <TableCell style={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.data.map((singleValue) => (
                  <TableRow key={singleValue._id}>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      {/* <Grid container spacing={2}> */}
                      {/* <Grid item md={5} lg={4}> */}
                      <div className="product-desc-container">
                        <span> {singleValue.firstName}</span>
                      </div>
                      {/* </Grid> */}
                      {/* </Grid> */}
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <span> {singleValue.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>{singleValue.phoneNo}</Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>{singleValue.takenTime}</Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>{singleValue.returnTime}</Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>{singleValue.booking_id}</Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>{singleValue.staus}</Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>
                          {singleValue.specialInstructions}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <div className="product-desc-container">
                        <Typography>{singleValue.car.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ border: "1px solid #ddd" }}>
                      <Grid item md={7} lg={8}>
                        <div className="product-action-btns-container">
                          <Link to={`/edit-products/` + singleValue._id}>
                            {" "}
                            <IconButton className="car-btns product-action-btn-margin">
                              <FaPencilAlt />
                            </IconButton>
                          </Link>
                        </div>
                      </Grid>
                      <IconButton
                        onClick={() => {
                          this.deleteProduct(singleValue.booking_id);
                        }}
                      >
                        <FaTrash />
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

export default Leads;
