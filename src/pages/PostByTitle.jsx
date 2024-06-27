import React, {useEffect} from 'react';
import fetchUrl from "../plugins/fetchUrl";
import {useNavigate, useParams} from "react-router-dom";
import mainStore from "../store/mainStore";
import SinglePostComp from "../components/SinglePostComp";

const PostByTitle = () => {

    const {singlePost, setSinglePost} = mainStore()
    const params = useParams()

    const nav = useNavigate()

    useEffect(() => {
        fetchUrl.get(`/getsinglepost/${params.username}/${params.id}`)
            .then(res => {
                console.log(res)
                setSinglePost(res.data)
            })
    }, [])

    return (
        <>
            {singlePost && <SinglePostComp post={singlePost}/>}
            <button onClick={() => nav(-1)}>Back</button>
        </>
    );
};

export default PostByTitle;