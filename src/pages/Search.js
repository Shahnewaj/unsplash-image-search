import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveSearchTerm, userLogout } from '../store/slice/appSlice';
import { Redirect } from 'react-router-dom';
import ImagaViewItem from '../components/ImagaViewItem';
import './Search.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import _ from 'lodash';





const Search = () => {
    console.log()
    const [searchTerm, setSearchTerm] = useState('');
    const [imgData, setImageData] = useState([]);
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const user = useSelector(state => state.app.user)
    const savedSearchList = useSelector(state => state.app.searchTermList)


    const handleSearch = () => {
        setLoading(true)
        let trimedTerm = searchTerm.trim()
        if (!!trimedTerm) {
            axios({
                method: 'get',
                url: `https://api.unsplash.com/search/photos?page=1&query=${trimedTerm}&orientation=landscape`,
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                },
            }).then(function (response) {
                // console.log(response)
                setImageData(response?.data?.results)
                        setSearchTerm('')
        setLoading(false)

            })
                .catch((err) => { })
            
            dispatch(saveSearchTerm({ term: trimedTerm }))
        }


    }

    const handleLogout = () => {
        dispatch(userLogout())
        return (
            <Redirect to="/" />
        )
    }
    return (
        <Container sx={{ p: 2 }} maxWidth="md">
            <div className="searchMain">
                <div className="header">
                    <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item md={10} xs={12} >
                            <div className="search">
                                <Autocomplete
                                    sx={{ minWidth: 200 }}
                                    id="free-solo-demo"
                                    freeSolo
                                    options={savedSearchList.map((option) => option.term)}
                                    onInputChange={(e, value) => {
                                        setSearchTerm(value)
                                    }}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Search image"
                                                InputProps={{
                                                    ...params.InputProps,
                                                }}
                                            />
                                        )
                                    }}
                                />
                                <Button
                                    variant="outlined"
                                    onClick={() => handleSearch()}
                                >Search</Button>
                            </div>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    handleLogout()
                                }}>Log out</Button>
                        </Grid>
                    </Grid>
                </div>

                <Grid container sx={{ p: 2, alignItems: 'center', justifyContent: 'center', }}>
                    {imgData.map((item, index) => (
                        <Grid sx={{ p: 2 }} item key={item.id} >
                            <ImagaViewItem
                                user={user}
                                item={item} />
                        </Grid>
                    ))}
                    {loading && <CircularProgress />
                    }
                </Grid>

                {_.isEmpty(imgData) && !loading &&
                    <Grid container>
                        <h2>No Search result </h2>
                    </Grid>

                }

            </div >
        </Container >
    )
}

export default Search
