import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Style.css'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ShowParticularData(props) {
    const idData = useSelector((state) => state.reducer.idData);
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
    const [isSystemExpanded, setIsSystemExpanded] = useState(false);

    const toggleSummary = () => {
        setIsSummaryExpanded(!isSummaryExpanded);
    };
    const toggleSystem = () => {
        setIsSystemExpanded(!isSystemExpanded);
    };
    return (
        <>
            {
                idData && idData.length !== 0
                    ? <div className='cardstyle'>
                        <div className='card'>
                            <div style={{ display: "flex", justifyContent: "left", paddingTop: "5px" }}>
                                <Link to='/'><button style={{ border: "none", cursor: "pointer" }}><FontAwesomeIcon icon={faCircleArrowLeft} style={{ fontSize: "25px" }} /></button></Link>
                            </div>

                            <h2>{idData.title}</h2>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <img src={idData.image_url} width="30%"></img>
                            </div>
                            <div className='content'>
                                <h3 >Summary : <span className='spanText'>{isSummaryExpanded ? idData.summarized_text : `${idData.summarized_text.slice(0, 600)}.......`}</span>
                                    {idData.summarized_text.length > 600 && (
                                        <button onClick={toggleSummary} style={{ border: 'none', cursor: 'pointer', background: 'none' }}>
                                            <h4 >  {isSummaryExpanded ? '<< Read less' : 'Read more >>'}</h4>
                                        </button>
                                    )}
                                </h3>
                                <h3 style={{ padding: "0px", margin: "0px" }}>System Design : <span className='spanText'>{isSystemExpanded ? idData.system_design : `${idData.system_design.slice(0, 600)}.......`}</span>
                                    {idData.system_design.length > 600 && (
                                        <button onClick={toggleSystem} style={{ border: 'none', cursor: 'pointer', background: 'none' }}>
                                            <h4 >  {isSystemExpanded ? '<< Read less' : 'Read more >>'}</h4>
                                        </button>
                                    )}
                                </h3>
                                <h3>Questions :<br />
                                    {
                                        idData.questions.map((quetion, index) => {
                                            return (
                                                <>
                                                    <h5 className='headerText'>Q{index + 1}) {quetion.ques}</h5>
                                                    <span className='spanText'>{quetion.options}</span><br />
                                                </>
                                            )
                                        })
                                    }
                                </h3>

                            </div>


                        </div>
                    </div >
                    : <div className='loadingStyle'>
                        <div class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>
                    </div>
            }

        </>
    )
}

export default ShowParticularData
