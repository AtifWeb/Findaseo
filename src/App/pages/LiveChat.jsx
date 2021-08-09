import React from 'react'
import BodyHeader from '../component/BodyHeader'
import Sidebar from '../component/Sidebar'
import PlusIcon from '../../Assets/img/purple-plus.png'
import Person1 from '../../Assets/img/Frame 1.png'
import Person2 from '../../Assets/img/Frame 2.png'
import Person3 from '../../Assets/img/Frame 3.png'
import time from '../../Assets/img/svg/time.svg'
function LiveChat() {
    return (
        <div className="LiveChat main-wrapper d-flex">
              {/* sidebar */}
              <Sidebar active="LiveChat"/>
              <div className="body-area">
                {/* header */}
                <BodyHeader/>

                <div className="body-main-area">
                <h2>Live Chats</h2>
                <div className="messages-box-area">
                    {/* left side */}
                    <div className="left-side">
                        <div className="top-area d-flex-align-center">
                            <h3>Chats</h3>
                            <img src={PlusIcon} alt="" />
                        </div>

                        <form action="">
                            <div className="input-wrapper">
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.22921 11.375C9.07117 11.375 11.375 9.07114 11.375 6.22918C11.375 3.38721 9.07117 1.08334 6.22921 1.08334C3.38724 1.08334 1.08337 3.38721 1.08337 6.22918C1.08337 9.07114 3.38724 11.375 6.22921 11.375Z" stroke="#9CA2C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9167 11.9166L10.8334 10.8333" stroke="#9CA2C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


                                <input type="text" placeholder="Search name..."/>
                                
                            </div>
                        </form>

                        <div className="users">
                            <div className="user d-flex-align-center">
                                <img src={Person1} alt="" />
                                <div className="presentation d-flex-align-center">
                                    <div className="left-side">
                                    <h4>Jhon Smith</h4>
                                    <p>Hello sir...</p>
                                    </div>
                                    <div className="right-side">
                                        <p>10:00 AM</p>
                                        <span className="badge d-flex-align-center">
                                            2
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="user d-flex-align-center">
                                <img src={Person2} alt="" />
                                <div className="presentation d-flex-align-center">
                                    <div className="left-side">
                                    <h4>Angel Mango</h4>
                                    <p>How are you?</p>
                                    </div>
                                    <div className="right-side">
                                        <p>10:26 AM</p>
                                     
                                    </div>
                                </div>
                            </div>
                            <div className="user d-flex-align-center">
                                <img src={Person3} alt="" />
                                <div className="presentation d-flex-align-center">
                                    <div className="left-side">
                                    <h4>Chance Gouse</h4>
                                    <p>How are you?</p>
                                    </div>
                                    <div className="right-side">
                                        <p>10:40 AM</p>
                                        <span className="badge d-flex-align-center">
                                            1
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* middile side */}
                    <div className="middle-side">
                        <div className="contact-area">
                            <div className="top-area d-flex-align-center">
                                <h3>Your Contacts</h3>
                                <div className="icon-wrapper">
                                <svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="2.0625" cy="2.0625" r="2.0625" fill="#282D4A"/>
<circle cx="11" cy="2.0625" r="2.0625" fill="#282D4A"/>
<circle cx="19.9375" cy="2.0625" r="2.0625" fill="#282D4A"/>
</svg>

                                </div>
                            </div>

                            <div className="contact-images d-flex-align-center">
                                <img src={Person1} alt="" />
                                <img src={Person2} alt="" />
                                <img src={Person3} alt="" />
                                <img src={Person2} alt="" />
                                <img src={Person1} alt="" />
                                <img src={Person3} alt="" />
                                <div className="add-contact">
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="18" cy="18" r="17.5" stroke="#7822E6" stroke-opacity="0.12"/>
<path d="M17.75 11V24.5" stroke="#7822E6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M11 17.75H24.5" stroke="#7822E6" stroke-width="1.5" stroke-linecap="round"/>
</svg>

                                </div>
                            </div>
                        </div>

                        <div className="messages-container-wrapper">
                        <div className="message-container">
                            <div className="message">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem amet, metus fermentum fermentum, sed. Nec eu elementum, non lacinia.</p>
                                <div className="date-area d-flex-align-center">
                                    <p className="name">Jhon</p>
                                    <p>.</p>
                                    <img src={time} alt="" />
                                    <p>12:00</p>
                                </div>
                            </div>

                            
                            <div className="message me">
                                <p>Hi Jhon</p>
                                <div className="date-area d-flex-align-center">
                                    <p className="name">Jhon</p>
                                    <p>.</p>
                                    <img src={time} alt="" />

                                    <p>12:00</p>
                                </div>
                            </div>


                            <div className="message queue">
                                <p>Lorem ipsum dolor sit amet</p>
                                <div className="date-area d-flex-align-center">
                                    <p className="name">Jhon</p>
                                    <p>.</p>
                                    <img src={time} alt="" />

                                    <p>12:00</p>
                                </div>
                            </div>
                            <div className="message queue">
                                <p>Yes of course</p>
                                <div className="date-area d-flex-align-center">
                                    <p className="name">Jhon</p>
                                    <p>.</p>
                                    <img src={time} alt="" />

                                    <p>12:00</p>
                                </div>
                            </div>

                            <div className="message">
                                <p>Hello, How are you?, are you available?</p>
                                <div className="date-area d-flex-align-center">
                                    <p className="name">Jhon</p>
                                    <p>.</p>
                                    <img src={time} alt="" />

                                    <p>12:00</p>
                                </div>
                            </div>

                            <div className="message me queue">
                                <p>Yes of course</p>
                                <div className="date-area d-flex-align-center">
                                    <p className="name">Jhon</p>
                                    <p>.</p>
                                    <img src={time} alt="" />

                                    <p>12:00</p>
                                </div>
                            </div>

                            <div className="message me">
                                <p>Hello, How are you?, are you available?</p>
                                <div className="date-area d-flex-align-center">
                                    <p className="name">Jhon</p>
                                    <p>.</p>
                                    <img src={time} alt="" />

                                    <p>12:00</p>
                                </div>
                            </div>

                            
                        </div>

                        <form action="" className="message-sender-form">
                            <div className="input-wrapper d-flex-align-center">
                                <input type="text" placeholder="Write a message" />
                                <input type="submit" value="" id="message-submit" />
                                <label htmlFor="message-submit" className="icon-wrapper">
                                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="31" height="31" rx="4" fill="#2D96D6"/>
<path d="M18.4151 10.7267L13.1476 12.4767C9.60674 13.6609 9.60674 15.5917 13.1476 16.77L14.7109 17.2892L15.2301 18.8525C16.4084 22.3934 18.3451 22.3934 19.5234 18.8525L21.2792 13.5909C22.0609 11.2284 20.7776 9.93919 18.4151 10.7267ZM18.6017 13.865L16.3851 16.0934C16.2976 16.1809 16.1867 16.2217 16.0759 16.2217C15.9651 16.2217 15.8542 16.1809 15.7667 16.0934C15.5976 15.9242 15.5976 15.6442 15.7667 15.475L17.9834 13.2467C18.1526 13.0775 18.4326 13.0775 18.6017 13.2467C18.7709 13.4159 18.7709 13.6959 18.6017 13.865Z" fill="white"/>
</svg>

                                </label>
                            </div>
                        </form>
                        </div>
                    </div>

                    {/* right side */}
                    <div className="right-side"></div>
                </div>
                </div>
                </div>

              
        </div>
    )
}

export default LiveChat
