import React, {useRef, useState} from 'react';
import mainStore from "../store/mainStore";
import {useNavigate} from "react-router-dom";
import fetchUrl from "../plugins/fetchUrl";

const CreateAccountPage = () => {

    const [error, setError] = useState()

    const nameRef = useRef()
    const passOneRef = useRef()
    const passTwoRef = useRef()

    const nav = useNavigate()

    async function createAccount(){
        setError(null)

        const user = {
            name: nameRef.current.value,
            passwordOne: passOneRef.current.value,
            passwordTwo: passTwoRef.current.value,
        }
        const res = await fetchUrl.post(`/createaccount`, user)
        if (res.success) {
            nav('/logIn')
            console.log(res)
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
                    <input ref={passOneRef} type="password" placeholder='password'/>
                </div>
                <div>
                    <input ref={passTwoRef} type="password" placeholder='repeat password'/>
                </div>
                <p>{error}</p>
                <div>
                    <button onClick={createAccount}>Create account</button>
                </div>
            </div>
        </>
    );
};

export default CreateAccountPage;