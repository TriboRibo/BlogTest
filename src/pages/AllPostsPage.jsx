import React, {useEffect, useState} from 'react';
import fetchUrl from "../plugins/fetchUrl";
import mainStore from "../store/mainStore";
import SinglePostComp from "../components/SinglePostComp";
import PaginationComp from "../components/PaginationComp";


const AllPostsPage = () => {

    const {posts, setPosts, currentPage, setCurrentPage, totalPages, setTotalPages, setPostsForFilter} = mainStore()

    const pageSize = 20

    useEffect(() => {
        fetchUrl.get('/getallposts')
            .then(response => {
                console.log(response)
                setPosts(response.data)
                setTotalPages(Math.ceil(response.data.length / pageSize))

                setPostsForFilter(response.data)
            })
    }, [setPosts, setTotalPages, setPostsForFilter]);

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber)
    }

    const paginatedPosts = posts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    return (
        <>
            <div className='box d-flex flex-column justify-content-between'>
                <div className='d-flex flex-wrap gap-2'>
                    {paginatedPosts.map((x, i) => (
                        <SinglePostComp key={i} post={x}/>
                    ))}
                </div>
                <div className='d-flex justify-content-center mt-5 pt-3 border-top ms-2 me-2'>
                    <PaginationComp currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                </div>
            </div>
        </>
    );
};

export default AllPostsPage;