import React from "react";
import {Table, Typography,TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import {Link} from "react-router-dom";


const DealerShipHeader  =(props)=>{
    const {url} = props;
    return(
        <TableContainer>
            <Table>
                <TableHead style={{ backgroundColor: '#09080e', color: '#fff' }}>
                    <TableRow>
                        <TableCell   style={{color: '#fff',cursor:"pointer" }}><Typography component={Link} className={"link"} to={`${url}`}>Info</Typography></TableCell>
                        <TableCell   style={{color: '#fff',cursor:"pointer" }}><Typography component={Link} className={"link"} to={`${url}/stats`}>Stats</Typography></TableCell>
                        <TableCell   style={{color: '#fff',cursor:"pointer" }}><Typography component={Link} className={"link"} to={`${url}/showrooms`}>Showrooms</Typography></TableCell>

                        <TableCell   style={{color: '#fff',cursor:"pointer" }}><Typography component={Link} className={"link"} to={`${url}/cars`}>Cars</Typography></TableCell>
                        <TableCell   style={{color: '#fff',cursor:"pointer" }}><Typography component={Link} className={"link"} to={`${url}/users`}>Users</Typography></TableCell>
                        <TableCell   style={{color: '#fff',cursor:"pointer" }}><Typography component={Link} className={"link"} to={`${url}/billing`}>Billing</Typography></TableCell>


                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    )
}

export default DealerShipHeader;