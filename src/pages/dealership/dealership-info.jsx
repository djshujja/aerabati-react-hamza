import React from "react";

import AdminTemplate from "../../template/admin-template";
import { Route,Switch,withRouter} from "react-router-dom";

import {PrimaryTemplate} from "../../template";
import {DealerShipCars, DealerShipStats} from "./index";
import {DealerShipHeader} from "../../components/dealership-header";
import DealershipInfoComponent from "./info";



class DealershipInfo extends React.Component{
    render(){
        const {match:{url,params:{id}}} = this.props;



        return(
            <PrimaryTemplate>
                <AdminTemplate>



                    <DealerShipHeader url={url} />


                    {/* ========================= NESTED ROUTES ================== */}
                    <Switch>
                        <Route exact path={`${url}/`} render={()=>(<DealershipInfoComponent id={id}/>)} />
                        <Route exact path={`${url}/stats`} render={()=>(<DealerShipStats id={id}/>)} />
                        <Route exact path={`${url}/cars`} render={()=>(<DealerShipCars id={id}/>)} />
                    </Switch>

                    {/* ==========================================================*/}











                </AdminTemplate>
            </PrimaryTemplate>
        )
    }
}

export default withRouter(DealershipInfo);