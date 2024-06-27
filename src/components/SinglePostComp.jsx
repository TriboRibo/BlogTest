import React, {lazy} from 'react';
import timestamp from "../plugins/timestamp";
import {useNavigate} from "react-router-dom";
import fetchUrl from "../plugins/fetchUrl";
import mainStore from "../store/mainStore";

const SinglePostComp = ({post}) => {

    const nav = useNavigate()
    const {loggedIn, favorites, addFavorite, removeFavorite, setPosts, posts, setFavorites} = mainStore()

    const isFavorite = favorites.some(fav => fav.id === post.id)

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
    function navigateToUpdate(){
        nav(`/UpdatePost/${post.username}/${post.id}`, {state: {post}})
    }

    async function deletePost() {
        const user = {
            id: post.id,
            secretKey: localStorage.getItem('secretKey'),
        }
        const res = await fetchUrl.post('/deletepost', user)
        if (res.success) {
            setPosts(posts.filter(p => p.id !== post.id))
            setFavorites(favorites.filter(fav => fav.id !== post.id))
        } else {
            console.error('Failed to delete post:', res.message)
        }


    }

    return (
        <>

            <div className='border postContainer m-2'>
                <div onClick={navigateToPost}>{post.username}</div>
                <div onClick={navigateToTitle}>Title: {post.title}</div>
                <img src={post.image} alt={post.title} loading='lazy'/>
                <div>{timestamp.convert_date(post.timestamp)}</div>
                <div className='d-flex'>
                    <div className='favorites' onClick={handleFavorite}>
                        {isFavorite ? '👎' : '👍'}
                    </div>
                </div>
                {loggedIn === post.username && (
                    <>
                        <button onClick={navigateToUpdate}>Update</button>
                        <button onClick={deletePost}>Delete</button>
                    </>
                )}
            </div>

        </>
    );
};

export default SinglePostComp;