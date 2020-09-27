import React from 'react';
import { IconButton,Grid ,Table,Button, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { FaPen } from 'react-icons/fa';
import {MdDelete} from "react-icons/all";
import { PrimaryTemplate } from '../../template';
import { AdminTemplate } from '../../template';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {users,pageno} from "../../redux/users/users.select";
import {fetchAndAddUsers,fetchAndAddUsersNextPage,removeUsers,deleteUserAction} from "../../redux/users/users.action";
import {Link} from "react-router-dom";
import {deleteUser} from "../../assets/serverUrls";
import {selectUserPermissions} from "../../redux/registration/registration.reselect";
import axios from "axios";



class Allcars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message:""
        }
    }

    componentDidMount() {
        const {fetchAndAddUsers}  =this.props;
        fetchAndAddUsers();
    }
    componentWillUnmount() {
        this.props.removeUsers()
    }

    deleteUser = (id)=>{

      axios.get(deleteUser+id).then(()=>{
          this.props.deleteUserAction(id);


      }).catch(err=>{

          // this.setState({
          //     message:err.response.data.error,
          // })
      })
    }

    render(){
        let {pageno,fetchAndAddUsersNextPage,users} = this.props;
         let {selectUserPermissions}  =this.props;
        console.log(selectUserPermissions);


        return (
            <PrimaryTemplate>
                <AdminTemplate>
                    {
                        this.state.message?this.state.message:""
                    }
                    <TableContainer>
                        <Table>
                            <TableHead style={{ backgroundColor: '#09080e', color: '#fff' }}>
                                <TableRow>
                                    <TableCell style={{color: '#fff' }}>image</TableCell>
                                    <TableCell style={{color: '#fff' }}>Model</TableCell>
                                    <TableCell style={{color: '#fff' }}>year</TableCell>
                                    <TableCell style={{color: '#fff' }}>KM</TableCell>
                                    <TableCell style={{color: '#fff' }}>Showroom</TableCell>
                                    <TableCell style={{color: '#fff' }}>Price</TableCell>
                                    <TableCell style={{color: '#fff' }}>Reference</TableCell>
                                    {selectUserPermissions.read && selectUserPermissions.write && selectUserPermissions.edit && selectUserPermissions.delete ? (
                                      <React.Fragment>

                                        <TableCell style={{color: '#fff' }}>Delete</TableCell>
                                      </React.Fragment>
                                    ):""}

                                </TableRow>
                            </TableHead>

                            <TableBody>


                                {
                                    users.map(user=>(


                                            <TableRow key={user._id}>
                                                <TableCell>{user.full_name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.rights}</TableCell>
                                                <TableCell>{user.car_rental_company_name}</TableCell>
                                                <TableCell>{user.car_rental_company_name}</TableCell>
                                                <TableCell>{user.car_rental_company_name}</TableCell>
                                                <TableCell><IconButton component={Link}
                                                                       to={'/user-edit/' + user._id}><FaPen
                                                    size="18"/></IconButton></TableCell>
                                                {selectUserPermissions.read && selectUserPermissions.write && selectUserPermissions.edit && selectUserPermissions.delete  ? (
                                                    <React.Fragment>

                                                        <TableCell><IconButton onClick={()=>this.deleteUser(user._id)}><MdDelete
                                                            size="18"/></IconButton></TableCell>

                                                    </React.Fragment>) : ""
                                                }
                                            </TableRow>



                                    ))
                                }

                            </TableBody>

                        </Table>
                    </TableContainer>
                    <br/>
                    <Grid container direction={"column"}>
                        <Grid item sm>
                            <Button onClick={()=>fetchAndAddUsersNextPage(pageno)} className={"MuiButton-text primary-btn-red"}  variant={"contained"} color={"primary"}>
                                Fetch More Users
                            </Button>
                        </Grid>
                    </Grid>
                </AdminTemplate>
            </PrimaryTemplate>
        )
    }
}
const mapStateToProps = createStructuredSelector({
    users,
    pageno,
    selectUserPermissions
});

export default connect(mapStateToProps,
    {fetchAndAddUsers,fetchAndAddUsersNextPage,removeUsers,deleteUserAction})
(Allcars);