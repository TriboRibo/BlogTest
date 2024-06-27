import React, {useEffect, useRef, useState} from 'react';
import mainStore from "../store/mainStore";
import fetchUrl from "../plugins/fetchUrl";
import {useNavigate} from "react-router-dom";

const LogInPage = () => {

    const {setLoggedIn} = mainStore()
    const [error, setError] = useState();

    const nameRef = useRef()
    const passRef = useRef()

    const nav = useNavigate()

    async function logIn() {
        setError(null)

        const user = {
            name: nameRef.current.value,
            password: passRef.current.value,
        }
        const res = await fetchUrl.post(`/login`, user)

        if (res.success) {
            localStorage.setItem('secretKey', res.secretKey)
            localStorage.setItem('user', res.name)
            nav('/')
            setLoggedIn(user.name)
        } else {
            setError(res.message)
        }
    }

    return (
        <>
            <div className='d-flex flex-column gap-2'>
                <div>
                    <input ref={nameRef} type="text" placeholder='username'/>
                </div>
                <div>
                    <input ref={passRef} type="password" placeholder='password'/>
                </div>
                <p>{error}</p>
                <div>
                    <button onClick={logIn}>Log In</button>
                </div>
            </div>
        </>
    );
};

export default LogInPage;