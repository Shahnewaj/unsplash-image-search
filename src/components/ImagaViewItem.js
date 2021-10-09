import React, { useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';

const ImagaViewItem = ({ item, user }) => {
    const [isLiked, setIsLiked] = useState(item.liked_by_user);
    const handleLikeUnlike = (id) => {

        setIsLiked(!isLiked)
        axios({
            method: isLiked ? 'DELETE' : 'POST',
            url: `https://api.unsplash.com/photos/${id}/like`,
            headers: {
                Authorization: `Bearer ${user.access_token}`,
            },
        })
            .then(function (response) {
                // console.log('response', response.data.photo.liked_by_user)
            }).catch(err => {
                console.log(err)
            })

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', }}>
            <img
                src={`${item.links.download}?w=220&h=160&fit=crop&auto=format`}
                srcSet={`${item.links.download}?w=220&h=160&fit=crop&auto=format&dpr=2 2x`}
                alt="elk"
                loading="lazy"
                style={{ width: 220, height: 160 }}
            />
            <Button
                variant={isLiked ? 'contained' : 'outlined'}
                onClick={() => {
                    handleLikeUnlike(item.id)
                }}
            > {isLiked ? 'Unlike' : 'like'}</Button>
        </div>
    )
}

export default ImagaViewItem
