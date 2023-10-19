import React, { useEffect, useState, useRef } from 'react'
import './Style.css'
import ShowAllData from './ShowAllData';
import { useDispatch, useSelector } from 'react-redux'
import { getList, postPDF } from '../Redux/action/Action';

function GenratePdf() {
    const inputRef = useRef();
    const dispatch = useDispatch()
    const [file, setFile] = useState(null);
    const getPDFList = useSelector((state) => state.reducer.Listdata);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        dispatch(getList())
    }, [])

    useEffect(() => {
        if (getPDFList!==null) {
            setFile(null)
            inputRef.current.value = '';
        }
    }, [getPDFList]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('pdf_file', file);
        dispatch(postPDF(formData))
    };
    return (
        <>
            <div className='genratePDF'>
                <input className='pdfinput' id='pdfinput' type="file" accept=".pdf" onChange={handleFileChange} ref={inputRef} />
                <button className="genrateBTN" type="submit" disabled={file == null ? true : false} onClick={handleSubmit}>Genrate</button>
            </div>
            <div>
                {
                    getPDFList === null ? <p>No Data</p>
                        : getPDFList.length === 0 ? <p>Loading....</p>
                            : <ShowAllData genrateData={getPDFList} />
                }
            </div>
        </>
    )
}

export default GenratePdf
