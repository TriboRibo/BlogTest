import React, {useEffect, useRef, useState} from 'react';
import mainStore from "../store/mainStore";
import SinglePostComp from "./SinglePostComp";

const Filter = () => {

    const {posts, setPosts, postsForFilter, setPostsForFilter} = mainStore()

    const dateFromRef = useRef()
    const dateToRef = useRef()
    const userRef = useRef()
    const titleRef = useRef()



    function handleFilter() {
        let filteredPosts = [...postsForFilter]

        const filterFrom = dateFromRef.current.value
        const filterTo = dateToRef.current.value
        const filterName = userRef.current.value
        const filterTitle = titleRef.current.value

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
            filteredPosts = filteredPosts.filter(post => post.username.includes(filterName))
        }
        if (filterTitle){
            filteredPosts = filteredPosts.filter(post => post.title.includes(filterTitle))
        }
        setPosts(filteredPosts)
        console.log(filteredPosts)
    }

    function clearFilter() {
        dateFromRef.current.value = ''
        dateToRef.current.value = ''
        userRef.current.value = ''
        titleRef.current.value = ''
        setPostsForFilter(posts)
        console.log(posts)
    }

    return (
        <>
            <div className='d-flex justify-content-center gap-5 border m-2 p-2'>
                <div className='d-flex gap-2 align-items-center'>
                    <div className='d-flex gap-2'>
                        <div className='d-flex gap-2'>
                            <div>From:</div>
                            <input type="date" ref={dateFromRef} placeholder='by date'/>
                        </div>
                        <div className='d-flex gap-2'>
                            <div>To:</div>
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

                {/*<div onClick={handleFilter}>*/}
                {/*    {postsForFilter.map((x, i) => (*/}
                {/*        <SinglePostComp key={i} post={x}/>*/}
                {/*    ))}*/}
                {/*</div>*/}

            </div>
        </>
    );
};

export default Filter;