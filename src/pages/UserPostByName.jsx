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
                console.log(response)
                setUserPosts(response.data)
            })
    }, [])



    return (
        <>
            {userPosts.map((x, i) => <SinglePostComp key={i} post={x}/>)}
            <button onClick={() => nav(-1)}>Back</button>
        </>
    );
};

export default UserPostByName;