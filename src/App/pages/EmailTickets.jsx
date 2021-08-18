import React, { useEffect } from 'react'
import BodyHeader from '../component/BodyHeader'
import Sidebar from '../component/Sidebar'

import DocumentText from '../../Assets/img/document-text.png'
import LeftArrow from '../../Assets/img/left-contact.png'
import RightArrow from '../../Assets/img/right-contact.png'
import Person1 from '../../Assets/img/Frame 1.png'
import Person2 from '../../Assets/img/Frame 2.png'
import Person3 from '../../Assets/img/Frame 3.png'
import user from '../../Assets/img/user.png'
import BlueLow from '../../Assets/img/blue-low.png'

function EmailTickets() {
    useEffect(() => {
       let Checkbox=document.querySelector("#all-check-checkbox");
       let CheckboxTbody=document.querySelectorAll(".table-body-area .row .checkbox-wrapper input");



    //    click event on first checkbox i mean main checkbox 
       Checkbox.addEventListener("click",(e)=>{
        if(e.target.checked==true){

            CheckboxTbody.forEach(EachInput=>{
                EachInput.checked=true
            })
        
        }
        else{
            CheckboxTbody.forEach(EachInput=>{
                EachInput.checked=false
            })
        }

       })
    
    }, [])
    return (
        <div className="EmailTickets main-wrapper d-flex">
            {/* sidebar */}
              <Sidebar active="EmailTickets"/>
              <div className="body-area">
                {/* header */}
                <BodyHeader active="EmailTickets"/>

                <div className="body-main-area">
                <h2>Email Tickets</h2>

                <ul className="navigation-bar d-flex-align-center">
                    <li className="active d-flex-align-center">
                    <p>All Tickets</p>
                    <span>3</span>
                    </li>
                    <li className="d-flex-align-center">
                    <p>Open</p>
                    <span>1</span>
                    </li>
                    <li className="d-flex-align-center">
                    <p>Due Today</p>
                    <span>3</span>
                    </li>
                    <li className="d-flex-align-center">
                    <p>On Hold</p>
                    <span>0</span>
                    </li>
                    <li className="d-flex-align-center">
                    <p>Unassigned</p>
                    <span>0</span>
                    </li>
                </ul>
                    <div className="body-box">
                        <div className="top-area d-flex-align-center">
                           <div className="left-side d-flex-align-center">
                           <div className="checkbox-wrapper">
                                <input type="checkbox" name="" id="" id="all-check-checkbox"/>
                            </div>

                            <div className="drop-down-wrapper d-flex-align-center">
                                <p>Sort by:</p>
                                <div className="drop-down d-flex-align-center">
                                    <p>Date Created</p>
                                    <svg width="7" height="3" viewBox="0 0 7 3" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 3L6.53109 0H0.468911L3.5 3Z" fill="#282D4A"/>
</svg>

                                </div>
                            </div>

                            <div className="drop-down-wrapper d-flex-align-center">
                                <p>Filter by:</p>
                                <div className="drop-down d-flex-align-center">
                                    <p>Departement</p>
                                    <svg width="7" height="3" viewBox="0 0 7 3" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 3L6.53109 0H0.468911L3.5 3Z" fill="#282D4A"/>
</svg>

                                </div>
                            </div>
                           </div>

                            <div className="right-area d-flex-align-center">
                            <div className="export-area d-flex-align-center">
                                <img src={DocumentText} alt="" />
                                <p>Export</p>
                            </div>

                            <div className="slider-area  d-flex-align-center">
                                <p>
                                <span>1</span> - <span>3</span> of <span>3</span>
                                </p>
                                <div className="slider-images d-flex-align-center">
                                    <img src={LeftArrow} alt="" />
                                    <img src={RightArrow} alt="" />
                                </div>
                            </div>
                            </div>
                        </div>


                        {/*table body area */}

                        <div className="table-body-area">
                       <div className="row d-flex-align-center">
                       <div className="checkbox-wrapper">
                                <input type="checkbox" name="" id="" />
                            </div>
                            <div className="profile-area d-flex-align-center">
                                    <img src={Person1} alt="" />
                                   <div className="presentation">
                                        <h4>Hello I wanna collab with you</h4>
                                        <p><span>jhonsmith@gmail.com</span> - <span>12 June 2021 10:00 AM</span></p>
                                   </div>
                                   
                            </div>
                            <div className="right-side d-flex-align-center">
                                <div className="icon-wrapper d-flex-align-center">
                                    <img src={BlueLow} alt="" />
                                    <p>Low</p>
                                </div>
                                <div className="icon-wrapper d-flex-align-center">
                                    <img src={user} alt="" />
                                    <p>Support</p>
                                </div>

                                <button className="open-btn">Open</button>
                            </div>
                       </div>

                       <div className="row d-flex-align-center">
                       <div className="checkbox-wrapper">
                                <input type="checkbox" name="" id="" />
                            </div>
                            <div className="profile-area d-flex-align-center">
                                    <img src={Person2} alt="" />
                                   <div className="presentation">
                                        <h4>A new message from sir</h4>
                                        <p><span>jsalungpras@gmail.com</span> - <span>12 June 2021 10:00 AM</span></p>
                                   </div>
                                   
                            </div>
                            <div className="right-side d-flex-align-center">
                                <div className="icon-wrapper d-flex-align-center">
                                    <img src={BlueLow} alt="" />
                                    <p>Low</p>
                                </div>
                                <div className="icon-wrapper d-flex-align-center">
                                    <img src={user} alt="" />
                                    <p>Support</p>
                                </div>

                                <button className="open-btn">Open</button>
                            </div>
                       </div>

                        <div className="row d-flex-align-center">
                       <div className="checkbox-wrapper">
                                <input type="checkbox" name="" id="" />
                            </div>
                            <div className="profile-area d-flex-align-center">
                                    <img src={Person3} alt="" />
                                   <div className="presentation">
                                        <h4>Please continue the last project</h4>
                                        <p><span>ericklance@gmail.com</span> - <span>12 June 2021 10:00 AM</span></p>
                                   </div>
                                   
                            </div>
                            <div className="right-side d-flex-align-center">
                                <div className="icon-wrapper d-flex-align-center">
                                    <img src={BlueLow} alt="" />
                                    <p>Low</p>
                                </div>
                                <div className="icon-wrapper d-flex-align-center">
                                    <img src={user} alt="" />
                                    <p>Support</p>
                                </div>

                                <button className="open-btn">Open</button>
                            </div>
                       </div>
                        </div>

                    </div>
                </div>
                </div>
        </div>
    )
}

export default EmailTickets
