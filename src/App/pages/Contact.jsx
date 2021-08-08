import React, { useEffect } from 'react'
import BodyHeader from '../component/BodyHeader'
import Sidebar from '../component/Sidebar'
import PlusIcon from '../../Assets/img/purple-plus.png'
import Message from '../../Assets/img/message.png'
import Tickets from '../../Assets/img/sms-tracking.png'
import Calenders from '../../Assets/img/calendar.png'
import DocumentText from '../../Assets/img/document-text.png'
import LeftArrow from '../../Assets/img/left-contact.png'
import RightArrow from '../../Assets/img/right-contact.png'
import Person1 from '../../Assets/img/Frame 1.png'
import Person2 from '../../Assets/img/Frame 2.png'
import Person3 from '../../Assets/img/Frame 3.png'
import Edit from '../../Assets/img/edit-2.png'
import Trash from '../../Assets/img/trash.png'
function Contact() {
    useEffect(() => {
       let Checkbox=document.querySelector("#all-check-checkbox");
       let CheckboxTbody=document.querySelectorAll(".table-body .row .col1 input");



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
        <div className="Contact main-wrapper d-flex">
            {/* sidebar */}
              <Sidebar active="contact"/>
              <div className="body-area">
                {/* header */}
                <BodyHeader/>

                <div className="body-main-area">
                <h2>Contacts</h2>
                    <div className="body-box">
                    <div className="left-side"> 
                        <div className="top-area d-flex-align-center">
                            <h3>Channels</h3>
                            <img src={PlusIcon} alt="" />
                        </div>
                        <ul>
                            <li className="d-flex-align-center active">
                                <div className="icon-wrapper">
                                    <img src={Message} alt="" />
                                </div>
                                <p>Live Chats</p>
                            </li>
                            <li className="d-flex-align-center">
                                <div className="icon-wrapper">
                                    <img src={Tickets} alt="" />
                                </div>
                                <p>Email Tickets</p>
                            </li>
                            <li className="d-flex-align-center">
                                <div className="icon-wrapper">
                                    <img src={Calenders} alt="" />
                                </div>
                                <p>Calendars</p>
                            </li>
                        </ul>
                    </div>


                    {/* right area */}
                    <div className="right-area">
                        <div className="top-area d-flex-align-center">
                            <h3>Live Chats</h3>
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
                        <div className="table-wrapper">
                        <div className="table">
                            <div className="table-head">
                                <div className="col col1">
                                    <input type="checkbox" name="" id="" id="all-check-checkbox" />
                                </div>
                                <div className="col col2">
                                    <h5>Profile</h5>
                                </div>
                                <div className="col col3">
                                    <h5>Email</h5>
                                </div>
                                <div className="col col4">
                                    <h5>Email Consent</h5>
                                </div>
                                <div className="col col5">
                                    <h5>Country</h5>
                                </div>
                                <div className="col col6">
                                    <h5>Tags</h5>
                                </div>
                                <div className="col col7">
                                    <h5>Actions</h5>
                                </div>
                            </div>
                            <div className="table-body">
                               <div className="row">
                               <div className="col col1">
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className="col col2 d-flex-align-center">
                                    <img src={Person1} alt="" />
                                    <p>Jhon Lenon</p>
                                </div>
                                <div className="col col3">
                                    <p>jhonle@gmail.com</p>
                                </div>
                                <div className="col col4">
                                    <select name="" id="">
                                        <option value="">
                                            Subscribed
                                        </option>
                                    </select>
                                </div>
                                <div className="col col5">
                                    <p>United States</p>
                                </div>
                                <div className="col col6">
                                    <h5>-</h5>
                                </div>
                                <div className="col col7">
                                    <div className="images-wrapper d-flex-align-center">
                                    <img src={Edit} alt="" />
                                    <img src={Trash} alt="" />

                                    </div>
                                </div>
                               </div>
                               <div className="row">
                               <div className="col col1">
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className="col col2 d-flex-align-center">
                                    <img src={Person2} alt="" />
                                    <p>Phillip Lipshutz</p>
                                </div>
                                <div className="col col3">
                                    <p>jhonle@gmail.com</p>
                                </div>
                                <div className="col col4">
                                    <select name="" id="">
                                        <option value="">
                                            Subscribed
                                        </option>
                                    </select>
                                </div>
                                <div className="col col5">
                                    <p>Germany</p>
                                </div>
                                <div className="col col6">
                                    <h5>-</h5>
                                </div>
                                <div className="col col7">
                                    <div className="images-wrapper d-flex-align-center">
                                    <img src={Edit} alt="" />
                                    <img src={Trash} alt="" />

                                    </div>
                                </div>
                               </div>
                               <div className="row">
                               <div className="col col1">
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className="col col2 d-flex-align-center">
                                    <img src={Person3} alt="" />
                                    <p>Davis Vetrovs</p>
                                </div>
                                <div className="col col3">
                                    <p>jhonle@gmail.com</p>
                                </div>
                                <div className="col col4">
                                    <select name="" id="">
                                        <option value="">
                                            Subscribed
                                        </option>
                                    </select>
                                </div>
                                <div className="col col5">
                                    <p>Swizerland</p>
                                </div>
                                <div className="col col6">
                                    <h5>-</h5>
                                </div>
                                <div className="col col7">
                                    <div className="images-wrapper d-flex-align-center">
                                    <img src={Edit} alt="" />
                                    <img src={Trash} alt="" />

                                    </div>
                                </div>
                               </div>
                               <div className="row">
                               <div className="col col1">
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className="col col2 d-flex-align-center">
                                    <img src={Person1} alt="" />
                                    <p>James Ekstrom</p>
                                </div>
                                <div className="col col3">
                                    <p>jhonle@gmail.com</p>
                                </div>
                                <div className="col col4">
                                    <select name="" id="">
                                        <option value="">
                                            Subscribed
                                        </option>
                                    </select>
                                </div>
                                <div className="col col5">
                                    <p>Japan</p>
                                </div>
                                <div className="col col6">
                                    <h5>-</h5>
                                </div>
                                <div className="col col7">
                                    <div className="images-wrapper d-flex-align-center">
                                    <img src={Edit} alt="" />
                                    <img src={Trash} alt="" />

                                    </div>
                                </div>
                               </div>
                               <div className="row">
                               <div className="col col1">
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className="col col2 d-flex-align-center">
                                    <img src={Person1} alt="" />
                                    <p>Craig Saris</p>
                                </div>
                                <div className="col col3">
                                    <p>jhonle@gmail.com</p>
                                </div>
                                <div className="col col4">
                                    <select name="" id="">
                                        <option value="">
                                            Subscribed
                                        </option>
                                    </select>
                                </div>
                                <div className="col col5">
                                    <p>Indonesia</p>
                                </div>
                                <div className="col col6">
                                    <h5>-</h5>
                                </div>
                                <div className="col col7">
                                    <div className="images-wrapper d-flex-align-center">
                                    <img src={Edit} alt="" />
                                    <img src={Trash} alt="" />

                                    </div>
                                </div>
                               </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Contact
