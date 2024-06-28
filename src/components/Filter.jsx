import React, {useEffect, useRef, useState} from 'react';
import mainStore from "../store/mainStore";
import SinglePostComp from "./SinglePostComp";
import fetchUrl from "../plugins/fetchUrl";
import {useNavigate} from "react-router-dom";

const Filter = () => {

    const {posts, setPosts, setCurrentPage, setTotalPages} = mainStore()

    const dateFromRef = useRef()
    const dateToRef = useRef()
    const userRef = useRef()
    const titleRef = useRef()

    const nav = useNavigate()

    function handleFilter() {

        let filteredPosts = [...posts]

        const filterFrom = dateFromRef.current.value
        const filterTo = dateToRef.current.value
        const filterName = userRef.current.value.toLowerCase()
        const filterTitle = titleRef.current.value.toLowerCase()

        if (filterFrom){
            filteredPosts = filteredPosts.filter(post => {
                const postDate = new Date(post.timestamp).toISOString().slice(0, 10)
                return postDate >= filterFrom
            })
        }
        if (filterTo){
            filteredPosts = filteredPosts.filter(post => {
                const postDate = new Date(post.timestamp).toISOString().slice(0, 10)
                return postDate <= filterTo
            })
        }
        if (filterName){
            filteredPosts = filteredPosts.filter(post => post.username.toLowerCase().includes(filterName))
        }
        if (filterTitle){
            filteredPosts = filteredPosts.filter(post => post.title.toLowerCase().includes(filterTitle))
        }
        setPosts(filteredPosts)
        setCurrentPage(1)
        setTotalPages(Math.ceil(filteredPosts.length / 20))
    }

    function clearFilter() {
        dateFromRef.current.value = ''
        dateToRef.current.value = ''
        userRef.current.value = ''
        titleRef.current.value = ''
        fetchUrl.get('/getallposts')
            .then(res => {
                setPosts(res.data)
                setCurrentPage(res.data)
                setTotalPages(Math.ceil(res.data.length / 20))
            })
    }

    return (
        <>
            <div className='d-flex justify-content-center gap-5 border m-2 p-2'>
                <div className='d-flex gap-2 align-items-center'>
                    <div className='d-flex gap-2'>
                        <div className='d-flex gap-2'>
                            <div className='text-white'>From:</div>
                            <input type="date" ref={dateFromRef} placeholder='by date'/>
                        </div>
                        <div className='d-flex gap-2'>
                            <div className='text-white'>To:</div>
                            <input type="date" ref={dateToRef} placeholder='by date'/>
                        </div>
                    </div>
                    <div>
                        <input type="text" ref={userRef} placeholder='by username'/>
                    </div>
                    <div>
                        <input type="text" ref={titleRef} placeholder='by title'/>
                    </div>
                </div>
                <div className='d-flex gap-2 align-items-center'>
                    <div>
                        <button onClick={handleFilter}>Search</button>
                    </div>
                    <div>
                        <button onClick={clearFilter}>Clear filter</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Filter;