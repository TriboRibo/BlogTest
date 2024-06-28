import React, {useRef} from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import fetchUrl from "../plugins/fetchUrl";
import mainStore from "../store/mainStore";

const CreatePostPage = () => {

    const [error, setError] = useState()
    const {loggedIn} = mainStore()

    const titleRef = useRef()
    const imageRef = useRef()
    const descriptionRef = useRef()

    const nav = useNavigate()

    async function createPost(){
        setError(null)
        const imgRegex = /https?:\/\/.*\.(?:png|jpg|gif|jpeg|svg|webp|bmp)/i

        if (!imgRegex.test(imageRef.current.value)) {
            setError('Please enter valid url')
            return
        }

        const post = {
            secretKey: localStorage.getItem('secretKey'),
            title: titleRef.current.value,
            image: imageRef.current.value,
            description: descriptionRef.current.value,
        }

        const res = await fetchUrl.post(`/createpost`, post)
        if (res.success) {
            nav(`/updatePost/${loggedIn}`)
        } else {
            setError(res.message)
        }
    }

    return (
        <>
            <div className='d-flex flex-column gap-2'>
                <div>
                    <input ref={titleRef} type="text" placeholder='title'/>
                </div>
                <div>
                    <input ref={imageRef} type="text" placeholder='image url'/>
                </div>
                <div>
                    <input ref={descriptionRef} type="text" placeholder='description'/>
                </div>
                <p className='text-white'>{error}</p>
                <div>
                    <button onClick={createPost}>Create</button>
                </div>
            </div>
        </>
    );
};

export default CreatePostPage;