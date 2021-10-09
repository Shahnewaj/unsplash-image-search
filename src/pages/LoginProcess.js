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
            client_id: 'm7c8rYAENQzdugShBSZSTpf0K4wBeiA0u7_hEGwRrXg',
            client_secret: 'BCLGvRnGaD24Lwi5n2Twqw8poGR3SkD0eiQ0Um-Ww_s',
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
