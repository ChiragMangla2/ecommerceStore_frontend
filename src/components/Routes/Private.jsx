import React, { useContext, useEffect, useState } from 'react'
import context from '../../Context/context';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios';
import { BASE_URL } from '../../Url';

const Private = () => {

    const [ok, setOk] = useState(false);
    const getdata = useContext(context);
    const { auth } = getdata;

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${BASE_URL}/api/v1/auth/user-auth`, {
                headers: {
                    "authorization": auth?.token
                }
            })

            if (res.data.ok) {
                setOk(true);
            }
            else {
                setOk(false);
            }
        }

        if (auth.token) {
            authCheck()
        }
    },
        [auth?.token])

    return ok ? <Outlet /> : <Spinner />;
}

export default Private
