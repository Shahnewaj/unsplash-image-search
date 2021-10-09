import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import {
    useLocation,
    useHistory
} from "react-router-dom";
import { setUserData } from '../store/slice/appSlice';

const LoginProcess = () => {
    let history = useHistory();
    const dispatch = useDispatch()

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    let auth_code = query.get('code')


    if (!!auth_code) {
        axios.post('https://unsplash.com/oauth/token', {
            client_id: `${process.env.React_App_CLIENT_ID}`,
            client_secret: `${process.env.React_App_CLIENT_SECRET}`,
            redirect_uri: 'http://localhost:3000/loginprocess',
            code: `${auth_code}`,
            grant_type: 'authorization_code'

        }).then((response) => {
            if (response.status === 200) {
                dispatch(setUserData(response.data))
                history.push("/search")
            } else {
                console.log('authentication failed')
            }
        }).catch((error) => {

        })
    }




    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
}

export default LoginProcess
