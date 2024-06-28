import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import mainStore from "../store/mainStore";

const Toolbar = () => {

    const {loggedIn, setLoggedIn, favorites} = mainStore()

    const nav = useNavigate();

    function logOut() {
        localStorage.removeItem('secretKey')
        setLoggedIn(null)
        nav('/')
    }

    return (
        <>
            <div className='d-flex gap-2 justify-content-center border m-2 p-2'>
                <Link className='link' to='/'>Home</Link>
                {!loggedIn && (
                    <>
                        <Link className='link' to='/createAccount'>Create account</Link>
                        <Link className='link' to='/logIn'>LogIn</Link>
                    </>
                )}
                {loggedIn && (
                    <>
                        <Link className='link' to='/CreatePost'>Create post</Link>
                        <Link className='link' to={`/UpdatePost/${loggedIn}`}>Update post</Link>
                        <Link className='link' to='/Favorites'>Favorites({favorites.length})</Link>
                    </>
                )}
                {loggedIn && (
                    <>
                        <div>{`Logged in as ${loggedIn}`}</div>
                        <button onClick={logOut}>LogOut</button>
                    </>
                )}
            </div>
        </>
    );
};

export default Toolbar;