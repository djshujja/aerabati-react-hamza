import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from '../pages/home-page';
import { ShowRoom } from '../pages/showroom';
import { Leads } from '../pages/leads';
import { Users } from '../pages/users';
import { ActiveCars } from '../pages/active-cars';
import { ProductInfo } from '../pages/product-info';
import {AddProducts} from './../pages/add-products';
import {EditProducts} from './../pages/edit-products';
import {SignUp} from "./../pages/sign-up";
import {Login} from "./../pages/log-in";
import axios from "axios";
import {verifyTokenUrl} from "../assets/serverUrls";
import {createStructuredSelector} from "reselect";
import {selectToken, selectUserPermissions} from "../redux/registration/registration.reselect";
import {connect} from "react-redux";
import {loginAction, logoutAction} from "../redux/registration/registration.action";
import {forgotPassword} from "../pages/forgot-password";
import AuthenticatedComponent from "./privateRoute"
import Form from "../pages/form/form"
import {UserEdit} from "../pages/user-edit";
import {DealerShip,DealerShipInfo,DealerShipStats} from "../pages/dealership/";


class Routes extends React.Component{
    componentDidMount() {
        const {token,logoutAction,userPermissions,loginAction} = this.props;
        if(token !== "" && !userPermissions.login) {

            axios.get(verifyTokenUrl,{headers:{"token":token}})
                .then(res => {
                    const data = JSON.parse(JSON.stringify(res.data));
                    loginAction(data);

                }).catch(err => {
                // console.log(err.response);
                logoutAction();
            })
        }
    }


    render() {



        return (
            <BrowserRouter>
                <Switch>





                    <Route path="/active-cars" extact component={AuthenticatedComponent(ActiveCars)}/>

                    <Route path="/add-products" extact component={AuthenticatedComponent(AddProducts)}/>
                    <Route path="/edit-products/:id" extact component={AuthenticatedComponent(EditProducts)}/>
                    <Route path="/showroom" extact component={AuthenticatedComponent(ShowRoom)}/> {/* like users */}
                    <Route path="/leads" extact component={AuthenticatedComponent(Leads)}/> {/* like users */}

                    <Route path="/users" extact component={AuthenticatedComponent(Users)}/>
                    <Route path="/user-edit/:id"  component={AuthenticatedComponent(UserEdit)}/>
                    {/*<Route path="/user-settings/:id"  component={AuthenticatedComponent(UserEdit)}/>*/}

                    <Route  path="/dealership-info/:id"  component={AuthenticatedComponent(DealerShipInfo)}/>
                    <Route exact path="/dealership"  component={AuthenticatedComponent(DealerShip)}/>
                    <Route exact path="/activecars"  component={AuthenticatedComponent(ActiveCars)}/>
                    <Route exact path="/form"  component={AuthenticatedComponent(Form)}/>
                    <Route exact path="/stats"  component={AuthenticatedComponent(DealerShipStats)}/>
                   





                    <Route path="/product-info/:id" extact component={ProductInfo}/>
                    <Route path="/registration" exact component={SignUp}/>
                    <Route path="/login" exact render={() => <Login/>}/>
                    <Route path="/forgot-password" exact component={forgotPassword}/>
                    <Route path="/" extact component={HomePage}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps  = createStructuredSelector({
    userPermissions:selectUserPermissions,
    token:selectToken
});

export default connect(mapStateToProps,{logoutAction,loginAction})(Routes);