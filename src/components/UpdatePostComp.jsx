import React, {useEffect, useRef, useState} from 'react';
import mainStore from "../store/mainStore";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import fetchUrl from "../plugins/fetchUrl";
import SinglePostComp from "./SinglePostComp";

const UpdatePostComp = () => {

    const {singlePost, setSinglePost, userPosts, setUserPosts} = mainStore()
    const params = useParams()
    const location = useLocation();
    const [error, setError] = useState()

    const titleRef = useRef()
    const imageRef = useRef()
    const descriptionRef = useRef()
    const [updateOn, setUpdateOn] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        if (location.state && location.state.post) {
            const post = location.state.post;
            setSinglePost(post);
            setUpdateOn(true);
        } else {
            fetchPostData();
        }
    }, [location.state]);

    useEffect(() => {
        if (singlePost && titleRef.current && imageRef.current && descriptionRef.current) {
            titleRef.current.value = singlePost.title;
            imageRef.current.value = singlePost.image;
            descriptionRef.current.value = singlePost.description;
        }
    }, [singlePost]);

    async function fetchPostData() {
        const res = await fetchUrl.get(`/getsinglepost/${params.username}/${params.id}`);
        if (res.success) {
            setSinglePost(res.data);
            setUpdateOn(true);
        } else {
            setError(res.message);
        }
    }

    async function updatePost() {
        const updatedPost = {
            image: imageRef.current.value,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            secretKey: localStorage.getItem('secretKey'),
            id: params.id,
        };

        const res = await fetchUrl.post(`/updatepost`, updatedPost);
        if (res.success) {
            setUpdateOn(false);
            nav(`/UpdatePost/${params.username}/${params.id}`);
        } else {
            setError(res.message);
        }
    }

    return (
        <>
            <div className='d-flex flex-column gap-2'>
                {singlePost && <SinglePostComp post={singlePost} />}
            </div>
            {updateOn && (
                <div className="d-flex flex-column p-5">
                    <input type="text" ref={imageRef} placeholder="image" />
                    <input type="text" ref={titleRef} placeholder="title" />
                    <input type="text" ref={descriptionRef} placeholder="description" />
                    <p className='text-white'>{error}</p>
                    <button onClick={updatePost}>Update Post</button>
                </div>
            )}
        </>
    );
};

export default UpdatePostComp;