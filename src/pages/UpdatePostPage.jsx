import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import SinglePostComp from "../components/SinglePostComp";
import fetchUrl from "../plugins/fetchUrl";
import mainStore from "../store/mainStore";

const UpdatePostPage = () => {

    const params = useParams()
    const {userPosts, setUserPosts} = mainStore()

    useEffect(() => {
        fetchUrl.get(`/getuserposts/${params.username}`)
            .then(response => {
                setUserPosts(response.data)
            });
    }, [params.username, setUserPosts])

    return (
        <>
            <h2 className='d-flex justify-content-center text-white user-select-none'>Posts by {params.username}</h2>
            <div className='d-flex justify-content-center flex-wrap gap-2'>
                {userPosts.map((post, index) => (
                    <SinglePostComp key={index} post={post}/>
                ))}
            </div>
        </>
    );
};

export default UpdatePostPage;