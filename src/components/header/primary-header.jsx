import React from 'react';
import {IconButton, Button, Hidden} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaBars } from 'react-icons/fa';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectUserPermissions} from "../../redux/registration/registration.reselect";
import {logoutAction} from "../../redux/registration/registration.action";

/**
 * Top row containg the social links and other things
 */
const HeaerTopRow = ( props ) => {

    return (
        <section className="top-row">
            <IconButton 
                href    =   "#" 
                title   =   "Facebook" 
                target  =   "_blank">
                <FaFacebookF size="18" className="white-icon" />
            </IconButton>
            <IconButton 
                href    =   "#" 
                title   =   "Twitter" 
                target  =   "_blank">
                <FaTwitter size="18" className="white-icon"/>
            </IconButton>
            <IconButton 
                href    =   "#" 
                title   =   "Intagram" 
                target  =   "_blank">
                <FaInstagram size="18" className="white-icon"/>
            </IconButton>
            <IconButton 
                href    =   "#" 
                title   =   "Linked In" 
                target  =   "_blank">
                <FaLinkedin size="18" className="white-icon"/>
            </IconButton>
            <IconButton 
                href    =   "#" 
                title   =   "Contact Us">
                <FaEnvelope size="18" className="white-icon"/>
            </IconButton>
        </section>
    )
}


/**
 * Logo row contains logo and auth buttons for large screen
 */
const HeaderLogoRow = ( props ) => {

    // here comes redux

    const {userPermissions,logoutAction} = props;



    return (
        <section className="logo-row">
            <Hidden smUp>
            <div className="logo-menu-btn-container">
                <IconButton onClick = { props.onClickMenuBtn } style={{ border: "1px solid white", padding: 10 }}>
                    <FaBars color="#fff" size="18" />
                </IconButton>
            </div>
            </Hidden>
            <div className="logo-container">
                <a href="/">
                    <img 
                        alt         =   "Arabeti"
                        className   =   "logo-img" 
                        src         =   "/assets/images/logo.png"
                    />
                </a>
            </div>


                    <div className="logo-row-left-section">

                        {
                            !userPermissions.login ?

                                <Hidden xsDown>
                                    <Link to="/login" className={"link"}>
                                        <Button
                                            variant="outlined"
                                            className="primary-btn-white"
                                            style={{marginRight: 15}}>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/registration" className={"link"}>
                                        <Button
                                            variant="contained"
                                            className="primary-btn-red">
                                            Register
                                        </Button>
                                    </Link>
                                </Hidden> :
                              <div>
                                  {
                                      userPermissions.rights !== "visitor" && userPermissions.edit === true ? (
                                          <Hidden xsDown>
                                              <Link to="/dealership" className={"link"}>
                                                  <Button
                                                      variant="contained"
                                                      className="primary-btn-red">
                                                      Admin Panel
                                                  </Button>
                                              </Link>

                                          </Hidden>
                                      ) : (

                                          <Hidden xsDown> {


                                                    userPermissions.dealershipId ? (


                                                                <Button
                                                                    variant="contained"
                                                                    component={Link}
                                                                    to={`/dealership-info/${userPermissions.dealershipId}`}
                                                                    className="primary-btn-red">
                                                                   My Panel
                                                                </Button>




                                                    ) : ""
                                                }
                                              </Hidden>


                                      )
                                  }
                                  <Hidden xsDown>

                                      <Button
                                          variant="contained"
                                          className="primary-btn-red"
                                          onClick={logoutAction}
                                          style={{"marginLeft":"2rem"}}
                                      >
                                          Logout
                                      </Button>


                                  </Hidden>



                              </div>

                                }
                                }
                    </div>:

            }
        </section>
    )
}

const HeaderMenu = ( props ) => {
    return (
        <Hidden xsDown>
        <section className="header-menu-container">
            <div className="header-menu">
                <Button 
                    className   = "primary-btn-red" 
                    style       = {{  marginRight: 10 }}
                    component   = {Link}
                    to = {"/"}
                >
                    Rent A Car
                </Button>
                <Button  
                    className   = "primary-btn-red"
                    style       = {{  marginRight: 10 }}>
                    Exotic Car Rent
                </Button>
                <Button  
                    className   = "primary-btn-red" 
                    style       = {{ marginRight: 10 }}>
                    Leasing
                </Button>


            </div>
        </section>
        </Hidden>
    )
}

const PrimaryHeader = ( props ) => {


    return (
        <header className="header">

            {/** Header content included header top row and logo area */}
            <section className="header-content-wrapper container">
                <HeaerTopRow />
                <HeaderLogoRow { ...props } />
            </section>

            { /** Header menu for large screen on mobile devices it will hiden 
             * and drawer menu will appear */ }
            <HeaderMenu />

        </header>
    )
}

PrimaryHeader.defaultProps = {
    onClickMenuBtn: () => alert('Not Setup'),
}

PrimaryHeader.propTypes = {
    onClickMenuBtn: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
        userPermissions:selectUserPermissions,

});

export default connect(mapStateToProps,{logoutAction})(PrimaryHeader);







/* 
Removed code on behalf of owner, But these were mentioned in psd

<div className="contact-section">
    <div className="call-section">
        <IconButton disabled title="Linked In" classes= {{root: "logo-section-btns" }} >
            <FaPhoneVolume size="20" color="#cc0000" className="header-section-btn-icons" />
        </IconButton>
        <div className="text-section">
            <span className="text1"> Call Us</span>
            <span className="text2"> +92 458 654 528</span>
        </div>
    </div>
    <div className="mail-section">
        <IconButton title="Linked In" classes= {{root: "logo-section-btns" }} >
            <FaRegEnvelope size="20" color="#cc0000"  />
        </IconButton>
        <div className="text-section">
            <span className="text1"> Send us mail</span>
            <span className="text2"> info@Arabeti.com </span>
        </div>
    </div>
</div> 
</div>
*/