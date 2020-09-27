import React from 'react';
import { Button, Grid, Typography, Hidden } from '@material-ui/core';
import { FaCaretRight, FaSearch } from 'react-icons/fa';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectUserPermissions} from "../redux/registration/registration.reselect";
import {Link} from "react-router-dom";



class AdminTemplate extends React.Component {
    render(){
        const {userPermissions:{login,edit,dealershipId}} = this.props;
        return (
            <section className="container gutter">
                <Grid container>
                    <Hidden xsDown>
                    <Grid item sm={4} md={3}>
                        <section className="admin-sidebar-container">
                        <Link to={"/activecars"} className={"link"}>
                            <div className="admin-sidebar-item">
                                
                                <Typography className="admin-sidebar-text">Cars</Typography>
                                <FaCaretRight  />
                            </div>
                            </Link>

                            {
                                login ?


                                    (

                                        <div>
                                            {



                                                !dealershipId && edit ? (
                                                    <div>


                                                        <Link to={"/dealership"} className={"link"}>

                                                            <div className="admin-sidebar-item">
                                                                <Typography
                                                                    className="admin-sidebar-text">Dealership </Typography>
                                                                <FaCaretRight/>
                                                            </div>
                                                        </Link>

                                                        <Link to={"/add-products"} className={"link"}>
                                                            <div  className="admin-sidebar-item">
                                                                <Typography
                                                                    className="admin-sidebar-text">Add Products </Typography>
                                                                <FaCaretRight/>
                                                            </div>
                                                        </Link>
                                                        <Link to={"/showroom"} className={"link"}>
                                                        <div className="admin-sidebar-item">
                                                            <Typography
                                                                className="admin-sidebar-text">Showrooms</Typography>
                                                            <FaCaretRight/>
                                                        </div>
                                                        </Link>
                                                        <Link to={"/users"} className={"link"}>
                                                            <div className="admin-sidebar-item">
                                                                <Typography
                                                                    className="admin-sidebar-text">Users</Typography>
                                                                <FaCaretRight/>
                                                            </div>
                                                        </Link>
                                                        <Link to={"/dealership-cars-info"} className={"link"}>
                                                            <div className="admin-sidebar-item">
                                                                <Typography
                                                                    className="admin-sidebar-text">Stats</Typography>
                                                                <FaCaretRight/>
                                                            </div>
                                                        </Link>

                                                        <Link to={"/Leads"} className={"link"}>
                                                            <div className="admin-sidebar-item">
                                                                <Typography
                                                                    className="admin-sidebar-text">Leads</Typography>
                                                                <FaCaretRight/>
                                                            </div>
                                                        </Link>



                                                    </div>)




                                                          :(
                                                        <div>

                                                            {
                                                                dealershipId ? (<Link to={"/add-products"} className={"link"}>
                                                                    <div  className="admin-sidebar-item">
                                                                        <Typography
                                                                            className="admin-sidebar-text">Add Products </Typography>
                                                                        <FaCaretRight/>
                                                                    </div>
                                                                </Link>):""
                                                            }


                                                        <div className="admin-sidebar-item">
                                                            <Typography
                                                                className="admin-sidebar-text">Logout</Typography>
                                                            <FaCaretRight/>
                                                        </div>
                                                    </div>
                                                    )


                                            }
                             </div>
                                                ):(

                               <div>

                                   <div className="admin-sidebar-item">
                                       <Typography className="admin-sidebar-text">Login</Typography>
                                       <FaCaretRight  />
                                   </div>

                                   <div className="admin-sidebar-item">
                                       <Typography className="admin-sidebar-text">Register</Typography>
                                       <FaCaretRight  />
                                   </div>

                               </div>


                                )


                            }
                            <div className="admin-sidebar-item">
                                <Button 
                                variant     = "contained" 
                                className   = "primary-btn-red" 
                                startIcon   = {<FaSearch />}>
                                    Search New Car
                                </Button>
                            </div>
                        </section>
                    </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={8} md={9}>
                        <div style={{ marginLeft: 15 }}>
                            { this.props.children }
                        </div>
                    </Grid>
                </Grid>
            </section>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    userPermissions:selectUserPermissions
});

export default connect(mapStateToProps)(AdminTemplate);