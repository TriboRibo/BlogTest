import React, {useEffect} from 'react';
import './components/Style.css'
import AllPostsPage from "./pages/AllPostsPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserPostByName from "./pages/UserPostByName";
import PostByTitle from "./pages/PostByTitle";
import Toolbar from "./components/Toolbar";
import LogInPage from "./pages/LogInPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import CreatePostPage from "./pages/CreatePostPage";
import FavoritesPage from "./pages/FavoritesPage";
import mainStore from "./store/mainStore";
import Filter from "./components/Filter";
import UpdatePostPage from "./pages/UpdatePostPage";

const BlogApp = () => {

    const {setLoggedIn, setSecretKey, setFavorites} = mainStore()

    useEffect(() => {
        const savedSecretKey = localStorage.getItem('secretKey')
        const savedUser = JSON.parse(localStorage.getItem('user'))
        const savedFavorites = JSON.parse(localStorage.getItem(`favorites`)) || []

        if (savedSecretKey && savedUser) {
            setSecretKey(savedSecretKey)
            setLoggedIn(savedUser)
            setFavorites(savedFavorites)
        }
    }, [setSecretKey, setLoggedIn, setFavorites]);

    return (
        <>
            <BrowserRouter>
                <Toolbar/>
                <Filter/>
                <Routes>
                    <Route element={<AllPostsPage/>} path='/'/>
                    <Route element={<UserPostByName/>} path='/:username'/>
                    <Route element={<PostByTitle/>} path='/:username/:id' />
                    <Route element={<LogInPage/>} path='/logIn'/>
                    <Route element={<CreateAccountPage/>} path='/createAccount'/>
                    <Route element={<CreatePostPage/>} path='/createPost'/>
                    <Route element={<FavoritesPage/>} path='/favorites'/>
                    <Route element={<UpdatePostPage/>} path='/updatePost/:username/'/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default BlogApp;