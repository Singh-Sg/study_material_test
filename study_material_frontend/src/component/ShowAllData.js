import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import './Style.css'
import { getparticularData } from '../Redux/action/Action';
import { useDispatch } from 'react-redux';

function ShowAllData(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const showParticularData = (id) => {
        dispatch(getparticularData(id))
        navigate(`/show-particular-data/${id}`);
    }
    const totalItems = props.genrateData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="datatable">
                <table>
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>Title</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.genrateData.slice((currentPage - 1) * itemsPerPage,currentPage * itemsPerPage).map((item, i) => {
                                const itemIndex = (currentPage - 1) * itemsPerPage + i + 1;
                                return (
                                    <tr key={item.id}>
                                        <td style={{ textAlign: "center" }}>{itemIndex}</td>
                                        <td>{item.title}</td>
                                        <td style={{ display: "flex", justifyContent: "center" }}>
                                            <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faEye} onClick={() => showParticularData(item.id)}/>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                {totalPages > 1 && (
                    <div>
                        <button onClick={() => goToPage(currentPage - 1)} className='next-prev-btn' disabled={currentPage === 1}>
                            Previous
                        </button>
                        {getPageNumbers().map((pageNumber) => (
                            <button key={pageNumber} className={pageNumber === currentPage ? 'active' : ''} onClick={() => goToPage(pageNumber)} >
                                {pageNumber}
                            </button>
                        ))}
                        <button onClick={() => goToPage(currentPage + 1)} className='next-prev-btn' disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default ShowAllData
