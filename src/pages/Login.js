import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const Login = () => {
    return (
        <div className="LoginMain">
            <Container sx={{ p: 10 }} maxWidth="sm">
                <Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3" component="div" gutterBottom>
                            Login to search image
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            sx={{ paddingLeft: 4, paddingRight: 4, }}
                            variant="outlined"
                            href="https://unsplash.com/oauth/authorize?client_id=m7c8rYAENQzdugShBSZSTpf0K4wBeiA0u7_hEGwRrXg&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Floginprocess&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections"
                        >Login</Button>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default Login
