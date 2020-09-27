import React from "react";

import {connect} from "react-redux";
import {selectUserPermissions} from "../redux/registration/registration.reselect";
import {createStructuredSelector} from "reselect";
import {HomePage} from "../pages/home-page";


const privateRoute = (HOC)=>{
    class AuthenticatedComponent extends React.Component {


        render() {
            const {userPermissions: {login}} = this.props;


            return login ? (<HOC/>) : (<HomePage/>)



        }
    }
    const mapStateToProps = createStructuredSelector({
        userPermissions: selectUserPermissions
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}


export default  privateRoute;