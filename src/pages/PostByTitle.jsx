import React, {useEffect} from 'react';
import fetchUrl from "../plugins/fetchUrl";
import {useNavigate, useParams} from "react-router-dom";
import mainStore from "../store/mainStore";
import SinglePostComp from "../components/SinglePostComp";
import timestamp from "../plugins/timestamp";

const PostByTitle = () => {

    const {singlePost, setSinglePost, loggedIn, deletePost} = mainStore()
    const params = useParams()
    const nav = useNavigate()

    useEffect(() => {
        fetchUrl.get(`/getsinglepost/${params.username}/${params.id}`)
            .then(res => {
                setSinglePost(res.data)
            })
    }, [])

    function navigateToPost() {
        nav(`/${params.username}`)
    }

    async function handleDelete(){
        await deletePost(singlePost.id)
        nav('/')
    }

    if (!singlePost) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className='d-flex flex-column gap-3 m-2 p-2'>
                <div className='d-flex justify-content-center'>
                    <div className='postContainerByTitle d-flex justify-content-between flex-column'>
                        <div className='d-flex'>
                            <div className='col-5'>
                                <div className='d-flex gap-2 p-2'>
                                    <div className='time'>Name:</div>
                                    <div onClick={navigateToPost}>{singlePost.username}</div>
                                </div>
                                <div className='p-2'>
                                    <img className='imgByTitle' src={singlePost.image} alt={singlePost.title}/>
                                </div>
                            </div>
                            <div className='col-7'>
                                <div className='d-flex gap-2 flex-wrap p-2'>
                                    <div className='time'>Title:</div>
                                    <div className='title'>{singlePost.title}</div>
                                </div>
                                <div className='d-flex gap-2 flex-wrap p-2'>
                                    <div className='time'>Description:</div>
                                    <div className='title'>{singlePost.description}</div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='time p-2 align-content-center'>{timestamp.convert_date(singlePost.timestamp)}</div>
                            <div className='d-flex gap-2 m-2'>
                                {loggedIn === params.username && (
                                    <>
                                        <button>Update</button>
                                        <button onClick={handleDelete}>Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={() => nav(-1)}>Back</button>
                </div>
            </div>
        </>
    );
};

export default PostByTitle;