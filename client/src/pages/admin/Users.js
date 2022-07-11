import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../../components/admin/DashboardSidebar'
import axios from 'axios'
import UserTable from '../../components/admin/user/UserTable'

const useStyles = makeStyles( theme => ({
    gridContainer: {
        position: 'relative'
    }
}))

function Users() {
    const classes = useStyles()
    const [users,setUsers] = useState()
    const session = JSON.parse(sessionStorage.getItem('user-e-commerce'))
    const userToken = session && session.token
    const fetchUser = async () => {
        const user = await axios.get('/user',{ headers: {
            "x-auth": userToken,
            "Content-Type": "application/json"
         }}).then( data => {
            return data.data.result.user
        }).catch(err => {
            console.log(err);
            alert('something went wrong')
        })
        setUsers(user)
    }
    useEffect(() => {
        fetchUser();
    },[])
    return (
        <Grid container>
            <Grid item xs={3}>
                <DashboardSidebar />
            </Grid>
            <Grid item xs={9} padding={2} className={classes.gridContainer}>
                <Typography variant='h4' gutterBottom={true} style={{textAlign: 'center',color: "rgb(70, 245, 245)"}}>Users</Typography>
                <UserTable user={users} />
            </Grid>
        </Grid>
    )
}

export default Users
