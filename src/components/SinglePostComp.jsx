import React, {lazy} from 'react';
import timestamp from "../plugins/timestamp";
import {useNavigate} from "react-router-dom";
import fetchUrl from "../plugins/fetchUrl";
import mainStore from "../store/mainStore";

const SinglePostComp = ({post}) => {

    const nav = useNavigate()
    const {loggedIn, favorites, addFavorite, removeFavorite, setPosts, posts, setFavorites, deletePost} = mainStore()

    const isFavorite = favorites.some((fav) => fav.id === post.id)

    function handleFavorite() {
        if (!loggedIn) {
            alert('please log in to manage favorites')
            return
        }
        if (!isFavorite) {
            addFavorite(post)
        } else {
            removeFavorite(post.id)
        }
    }

    function navigateToPost() {
        nav(`/${post.username}`)
    }

    function navigateToTitle() {
        nav(`/${post.username}/${post.id}`)
    }

    function navigateToUpdate() {
        nav(`/UpdatePost/${post.username}/${post.id}`)
    }

    async function handleDelete(){
        await deletePost(post.id)
    }

    return (
        <>

            <div className='postContainer m-2 d-flex flex-column justify-content-between'>
                <div>
                    <div>
                        <div className='d-flex justify-content-center gap-2 mt-1 mb-1'>
                            <div className='time'>Name:</div>
                            <div onClick={navigateToPost}>{post.username}</div>
                        </div>
                        <div className='imgBox'>
                            <img src={post.image} alt={post.title} loading='lazy'/>
                        </div>
                    </div>

                    <div className='d-flex gap-2 p-2 title'>
                        <div className='time ms-1'>Title:</div>
                        <div className='desc' onClick={navigateToTitle}>{post.title}</div>
                    </div>

                </div>
                <div className='d-flex justify-content-between p-2'>
                    <div className='align-content-center time ms-1'>{timestamp.convert_date(post.timestamp)}</div>
                    <div className='d-flex gap-2 justify-content-center p-2'>
                        {loggedIn === post.username && (
                            <>
                                <button onClick={navigateToUpdate}>Update</button>
                                <button onClick={handleDelete}>Delete</button>
                            </>
                        )}
                        <div className='favorites' onClick={handleFavorite}>
                            {isFavorite ? '👎' : '👍'}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SinglePostComp;