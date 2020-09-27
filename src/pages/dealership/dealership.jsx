import React from 'react';
import {
    Typography,
    Grid,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Select, InputLabel,
    MenuItem,
    Button, TextField
} from '@material-ui/core';

import {dealersInfo,allDealers,dealerSearch} from "../../assets/serverUrls";
import {AdminTemplate, PrimaryTemplate} from '../../template';
import {AdminStatBadge} from "../../components/badges";
import {Link} from "react-router-dom";
import axios from "axios";



class Dealership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_by:"all",
            dealershipInfoData:{},
            pageno:0,
            dealershipData:[],
            search:"",
            searchData:[],
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchMore = this.fetchMore.bind(this);
        this.search = this.search.bind(this);

    }

    componentDidMount() {

        axios.get(dealersInfo).then(response=>{
            this.setState({
                dealershipInfoData:response.data
            })
        }).catch(err=>{
            console.log(err.response.data);
        })

        axios.get(allDealers+this.state.pageno).then(resData=>{
            this.setState(prevState => ({
                pageno:prevState.pageno+1,
               dealershipData: resData.data

            }));


        }).catch(err=>{
            console.log(err.response);
        })




    }

    fetchMore(){
        axios.get(allDealers+this.state.pageno).then(resData=>{
            this.setState(prevState => ({
                pageno:prevState.pageno+1,
                dealershipData: resData.data

            }));

        }).catch(err=>{
            console.log(err.response.data);
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    search(e){
        e.preventDefault();
        axios.get(dealerSearch+this.state.search).then(resData=>{
             this.setState({
                 searchData:resData.data
             })
        }).catch(errData=>{
            console.log(errData);
        })

    }

    dateUtility = (dateValue)=>{
        let date = new Date(dateValue);
        return date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay()
    }

    showDataComponent = (
        <React.Fragment>
            {

            }

        </React.Fragment>
    )

    showSearchDataComponent = (
        <React.Fragment>
            {
            }
        </React.Fragment>

    )

    render(){
        const {dealershipInfoData:{active_dealers,total_dealers,paying_dealers,trial_dealers,paused_dealers,suspended_dealers}} = this.state;

        return (
            <PrimaryTemplate>
                <AdminTemplate>
                    <section className="stat-container" >
                        <Typography variant="h6" className="stat-heading">
                            Dealers
                        </Typography>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge
                                    badgeStyle = {{ backgroundColor: '#f44236' }}


                                    badgeCounter ={active_dealers ? active_dealers : 0}
                                    badgeText = "Active Dealers"
                              />
                            </Grid>


                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge
                                    badgeStyle = {{ backgroundColor: '#f44236' }}
                                    badgeCounter = {paying_dealers ? paying_dealers : 0}
                                    badgeText = "Paying Dealers"

                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge
                                    badgeStyle = {{ backgroundColor: '#4db151' }}
                                    badgeCounter = {total_dealers ? total_dealers : 0}
                                    badgeText = "Total Dealers"

                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge
                                    badgeStyle = {{ backgroundColor: '#2895f0' }}
                                    badgeCounter = {trial_dealers ? trial_dealers : 0}
                                    badgeText = "Trial Dealers"

                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge
                                    badgeStyle = {{ backgroundColor: '#0cbaae' }}
                                    badgeCounter = {paused_dealers ? paused_dealers : 0}
                                    badgeText = "Paused Dealers"

                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <AdminStatBadge
                                    badgeStyle = {{ backgroundColor: '#202938' }}
                                    badgeCounter = {suspended_dealers ? suspended_dealers : 0}
                                    badgeText = "Suspended Dealers"

                                />
                            </Grid>


                        </Grid>

                    </section>
                    <br/><br/>

                    <form onSubmit={this.search} fullWidth>
                    <Grid container>

                        <Grid item xs={12} sm={3} md={3} style={{margin:"0 5px"}}>
                            <InputLabel id="demo-simple-select-helper-label">Search By</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={this.state.search_by}
                                name={"search_by"}
                                fullWidth
                                onChange={this.handleChange}
                            >

                                <MenuItem value={"all"}>Search All</MenuItem>
                                <MenuItem value={"all"}>Company Name</MenuItem>
                                <MenuItem value={"all"}>Trade no</MenuItem>
                                <MenuItem value={"all"}>License no</MenuItem>

                              </Select>
                        </Grid>

                        <Grid item xs={12} sm={3} md={3} style={{margin:"0 5px"}}>
                            <InputLabel id="demo-simple-select-label">Search</InputLabel>
                            <TextField onChange={this.handleChange} value={this.state.search} fullWidth placeholder={"Search Here"} name={"search"}></TextField>
                        </Grid>

                        <Grid item xs={12} sm={3} md={3}  >
                            <Button type={"submit"} variant={"contained"} className={'MuiButton-text primary-btn-red'}>
                                Search
                            </Button>
                        </Grid>



                    </Grid>
                    </form>

                    <br/><br/>
                    <TableContainer>
                        <Table>

                            <TableHead style={{ backgroundColor: '#09080e', color: '#fff' }}>
                                <TableRow>
                                    <TableCell style={{color: '#fff' }}>Company Name</TableCell>
                                    <TableCell style={{color: '#fff' }}>Contract start</TableCell>
                                    <TableCell style={{color: '#fff' }}>Contract End</TableCell>
                                    <TableCell style={{color: '#fff' }}>Owner Name</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>









                                {
                                   !this.state.search ? this.state.dealershipData ? this.state.dealershipData.map(dealership=>(
                                    <TableRow key={dealership._id}>
                                    <TableCell component={Link} to={"/dealership-info/"+dealership._id} >{dealership.car_rental_company_name}</TableCell>
                                    <TableCell>

                                    {this.dateUtility(dealership.contract_start_date)}

                                    </TableCell>
                                    <TableCell>{this.dateUtility(dealership.contract_end_date)}</TableCell>
                                    <TableCell>{dealership.name}</TableCell>
                                    </TableRow>
                                    )): ""  :

                                       this.state.searchData ? this.state.searchData.map(dealership => (
                                           <TableRow key={dealership._id}>
                                               <TableCell component={Link}
                                                          to={"/dealership-info/" + dealership._id}>{dealership.car_rental_company_name}</TableCell>
                                               <TableCell>

                                                   {this.dateUtility(dealership.contract_start_date)}

                                               </TableCell>
                                               <TableCell>{this.dateUtility(dealership.contract_end_date)}</TableCell>
                                               <TableCell>{dealership.name}</TableCell>
                                           </TableRow>
                                       )):""

                                }









                            </TableBody>

                        </Table>
                    </TableContainer>
                    <br/>
                    <Grid container direction={"column"}>
                        <Grid item sm>
                            <Button onClick={this.fetchMore} className={"MuiButton-text primary-btn-red"}  variant={"contained"} color={"primary"}>
                                Fetch More Users
                            </Button>
                        </Grid>
                    </Grid>
                </AdminTemplate>
            </PrimaryTemplate>
        )
    }
}

export default Dealership;