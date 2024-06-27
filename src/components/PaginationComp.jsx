import React from 'react';
import Pagination from "react-bootstrap/Pagination";

const PaginationComp = ({currentPage, totalPages, onPageChange}) => {

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
                {i}
            </Pagination.Item>
        );
    }

    return (
        <>
            <div className='d-flex justify-content-center align-content-end'>
                <Pagination>
                    <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}/>
                    {pageNumbers}
                    <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}/>
                </Pagination>
            </div>
        </>
    );
};

export default PaginationComp;