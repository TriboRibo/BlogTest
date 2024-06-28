import React, {useEffect} from 'react';
import mainStore from "../store/mainStore";
import SinglePostComp from "../components/SinglePostComp";
import fetchUrl from "../plugins/fetchUrl";
import {useNavigate, useParams} from "react-router-dom";

const UserPostByName = () => {

    const {userPosts, setUserPosts} = mainStore()

    const params = useParams()
    const nav = useNavigate()

    useEffect(() => {
        fetchUrl.get(`/getuserposts/${params.username}`)
            .then(response => {
                setUserPosts(response.data)
            })
    }, [params.username, setUserPosts])


    return (
        <>
            <div className='d-flex flex-column gap-2 m-1 p-2'>
                <div className='d-flex gap-2 flex-wrap justify-content-center'>
                    {userPosts.map((x, i) => <SinglePostComp key={i} post={x}/>)}
                </div>
                <div>
                    <button onClick={() => nav(-1)}>Back</button>
                </div>
            </div>
        </>
    );
};

export default UserPostByName;