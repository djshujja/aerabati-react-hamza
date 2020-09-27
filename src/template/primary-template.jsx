import React from 'react';
import { Drawer, Hidden, List, ListItem, ListItemText, Divider,   } from '@material-ui/core';
import { PrimaryHeader } from '../components/header';
import { PrimaryFooter } from '../components/footer';
import { FaCaretRight } from 'react-icons/fa';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectUserPermissions} from "../redux/registration/registration.reselect";
import {logoutAction} from "../redux/registration/registration.action";
import {Link} from "react-router-dom";


class PrimryTemplate extends React.Component {



    state = {
        openDrawer: false,
    }

    openUrl = (url)=>{



    }


    renderDrawer = () => {
        const {userPermissions:{login,edit,rights,dealershipId}} = this.props;
        return (
        <Hidden smUp>
            <Drawer
                open    = { this.state.openDrawer }
                onClose = { () => this.setState({ openDrawer: false }) }
                variant = { "temporary" }
                anchor  = {  'left'  }
                classes = {{root: 'pr-drawer', paper: 'pr-drawer-paper' }} >
                   
                    
                    <List style={{ color: '#fff' }}>

                      <Link to="" className={"link"}>  <ListItem className="pr-drawer-item">

                            <ListItemText  primary="Car" />
                            <FaCaretRight color="#fff" />
                        </ListItem>
                      </Link>

                        {
                            login ? (
                                <div>






                           <Link to={"/rent-a-car"}  className={"link"}>

                        <ListItem className="pr-drawer-item">
                            <ListItemText  primary="Rent A Car" />
                            <FaCaretRight color="#fff" />
                        </ListItem>

                           </Link>

                                    {
                                        dealershipId ? (
                                        <div>
                                            <ListItem  component={Link} to={"/add-products"} className="pr-drawer-item link">
                                                <ListItemText  primary="Add Products" />
                                                <FaCaretRight color="#fff" />
                                            </ListItem>
                                            <ListItem  component={Link} to={"add-product"} className="pr-drawer-item link">
                                                <ListItemText  primary="My Panel" />
                                                <FaCaretRight color="#fff" />
                                            </ListItem>
                                        </div>
                                        ): ""

                                    }


                                    {
                                        rights !== "visitor" && edit === true ?
                                            (<div>
                                            {/*    not a visitor*/}




                        <ListItem  component={Link} to={"/dealership"} className="pr-drawer-item link">
                            <ListItemText  primary="Admin Panel"  />
                            <FaCaretRight color="#fff" />

                        </ListItem>

                       <Link to={"/exotic-car-rent"}  className={"link"}>
                        <ListItem className="pr-drawer-item">
                            <ListItemText  primary="Exotic Car Rent"  />
                            <FaCaretRight color="#fff" />
                        </ListItem>
                       </Link>

                        <Link to={"/leasing"}  className={"link"}>
                        <ListItem className="pr-drawer-item">
                            <ListItemText  primary="Leasing" />
                            <FaCaretRight color="#fff" />
                        </ListItem>
                        </Link>
                        <Link to={"/dealership"}  className={"link"}>
                        <ListItem className="pr-drawer-item">
                            <ListItemText  primary="Dealership"  />
                            <FaCaretRight color="#fff" />

                        </ListItem>
                        </Link>

                        <Link to={"/showrooms"}  className={"link"}>
                        <ListItem className="pr-drawer-item">
                            <ListItemText  primary="Showrooms" />
                            <FaCaretRight color="#fff" />
                        </ListItem>
                        </Link>
                       <Link to={"/users"} className={"link"}>
                        <ListItem className="pr-drawer-item"  >
                            <ListItemText  primary="Users"  />
                            <FaCaretRight color="#fff" />
                        </ListItem>
                       </Link>
                    <Link to={"/dealership-cars-info"}  className={"link"}>
                        <ListItem className="pr-drawer-item">
                            <ListItemText  primary="Stats"  />
                            <FaCaretRight color="#fff" />
                        </ListItem>
                    </Link>
                    <Link to={"/products"}  className={"link"}>
                        <ListItem className="pr-drawer-item">
                            <ListItemText  primary="Products"  />
                            <FaCaretRight color="#fff" />
                        </ListItem>
                    </Link>
                    <Link to={"/leads"}  className={"link"}>
                        <ListItem className="pr-drawer-item">
                            <ListItemText  primary="Leads" />
                            <FaCaretRight color="#fff" />
                        </ListItem>
                    </Link>
                    <ListItem  component={Link} to={"/add-products"} className="pr-drawer-item link">
                        <ListItemText  primary="Add Products" />
                        <FaCaretRight color="#fff" />
                    </ListItem>
                        </div>):(<div></div>)

                                    }



                        <ListItem className="pr-drawer-item"  className={"link"} onClick={this.props.logoutAction}>
                            <ListItemText  primary="Logout" />

                        </ListItem>

                                </div>

                            ):(
                                <div>
                                    <Link to={"/login"}  className={"link"}>

                                    <ListItem className="pr-drawer-item">
                                        <ListItemText  primary="Login"  />
                                        <FaCaretRight color="#fff" />
                                    </ListItem>
                                    </Link>
                                    <Link to={"/registration"}  className={"link"}>

                                    <ListItem className="pr-drawer-item" className={"link"}>
                                        <ListItemText  primary="Register" />
                                        <FaCaretRight color="#fff" />
                                    </ListItem>
                                    </Link>

                            </div>

                            )
                        }



                        <Divider />
                    </List>
            </Drawer>
        </Hidden>
        )
    }

    render(){
        return (
            <>
                <PrimaryHeader onClickMenuBtn = {() => this.setState({ openDrawer: true })} />
                    { this.renderDrawer() }
                    { this.props.children }
                <PrimaryFooter />
            </>
        )
    }
}
const mapStateToProps = createStructuredSelector({
    userPermissions:selectUserPermissions
})
export default  connect(mapStateToProps,{logoutAction})(PrimryTemplate);