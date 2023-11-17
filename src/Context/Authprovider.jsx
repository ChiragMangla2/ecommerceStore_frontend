import React, { useEffect, useState } from "react";
import context from './context'

const Authprovider = (props) => {

    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    const [values, setValues] = useState({
        keyword: "",
        results: []
    });

    useEffect(()=>{
        const data = localStorage.getItem('auth');
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            });
        }
    },[])

    return (
        <context.Provider value={{ auth, setAuth, values, setValues }}>
            {props.children}
        </context.Provider>
    )
}

export default Authprovider;