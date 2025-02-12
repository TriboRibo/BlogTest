import {create} from 'zustand'
import fetchUrl from "../plugins/fetchUrl";

const useStore = create((set) => ({
    posts: [],
    setPosts: (newPost) => set({posts: newPost}),

    userPosts: [],
    setUserPosts: (newUserPost) => set({userPosts: newUserPost}),

    singlePost: null,
    setSinglePost: (newSinglePost) => set({singlePost: newSinglePost}),

    currentPage: 1,
    setCurrentPage: (page) => set({currentPage: page}),

    totalPages: 0,
    setTotalPages: (pages) => set({totalPages: pages}),

    postsForFilter: [],
    setPostsForFilter: (date) => set({postsForFilter: date}),

    loggedIn: null,
    setLoggedIn: (log) => {
        set({loggedIn: log})
        if (log) {
            localStorage.setItem('user', JSON.stringify(log))
            const savedFavorites = JSON.parse(localStorage.getItem(`favorites`)) || []
            set({favorites: savedFavorites})
        } else {
            set({favorites: []})
            localStorage.removeItem('user')
        }
    },

    secretKey: null,
    setSecretKey: (key) => {
        set({secretKey: key})
        localStorage.setItem('secretKey', key)
    },

    favorites: [],
    setFavorites: (fav) => {
        set({favorites: fav})
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (fav.length > 0 && loggedInUser) {
            localStorage.setItem(`favorites`, JSON.stringify(fav));
        }
    },
    addFavorite: (post) =>
        set((state) => {
            const updatedFavorites = [...state.favorites, post];
            if (state.loggedIn) {
                localStorage.setItem(`favorites`, JSON.stringify(updatedFavorites))
            }
            return {favorites: updatedFavorites}
        }),

    removeFavorite: (postId) =>
        set((state) => {
            const updatedFavorites = state.favorites.filter((fav) => fav.id !== postId);
            if (state.loggedIn) {
                localStorage.setItem(`favorites`, JSON.stringify(updatedFavorites))
            }
            return {favorites: updatedFavorites};
        }),

    deletePost: async (postId) => {
        const secretKey = localStorage.getItem('secretKey')
        if (!secretKey)  {
            console.error('Secret key not found')
            return
        }
        const res = await fetchUrl.post(`/deletepost`, {id: postId, secretKey})
        if (res.success) {
            set((state) => ({
                posts: state.posts.filter(p => p.id !== postId),
                favorites: state.favorites.filter(fav => fav.id !== postId),
                userPosts: state.userPosts.filter(p => p.id !== postId)
            }))
            const updatedFavorites = JSON.parse(localStorage.getItem('favorites')).filter(fav => fav.id !== postId)
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
        }
    }

}))

export default useStore