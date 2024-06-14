import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { parseISO, isWithinInterval } from 'date-fns';

const GooglePhotos = ({ startDate, endDate, onPhotosLoaded }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if (accessToken) {
            fetchPhotos();
        }
    }, [accessToken]);

    const fetchPhotos = async () => {
        try {
            const response = await axios.post(
                'https://photoslibrary.googleapis.com/v1/mediaItems:search',
                {
                    pageSize: 100,
                    filters: {
                        dateFilter: {
                            ranges: [{ startDate: { year: startDate.getFullYear(), month: startDate.getMonth() + 1, day: startDate.getDate() },
                                       endDate: { year: endDate.getFullYear(), month: endDate.getMonth() + 1, day: endDate.getDate() } }]
                        }
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-type': 'application/json'
                    }
                }
            );

            const filteredPhotos = response.data.mediaItems.filter(item => 
                isWithinInterval(parseISO(item.mediaMetadata.creationTime), { start: startDate, end: endDate })
            );

            setPhotos(filteredPhotos);
            onPhotosLoaded(filteredPhotos);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const onSuccess = (response) => {
        setAccessToken(response.access_token);
    };

    const onFailure = (error) => {
        console.error('Login Failed:', error);
    };

    return (
        <div>
            {!accessToken && (
                <GoogleLogin
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    scope="https://www.googleapis.com/auth/photoslibrary.readonly"
                />
            )}
        </div>
    );
};

export default GooglePhotos;