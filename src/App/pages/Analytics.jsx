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
import ChatGreen from '../../Assets/img/chat-green.png'
import CalenderPurple from '../../Assets/img/calender-purple.png'
import MessageBlue from '../../Assets/img/message-blue.png'
import ArrowRight from '../../Assets/img/arrow-right.png'
import GreenMessage from '../../Assets/img/green-message.png'
import LiveChat from '../../Assets/img/live-chat.png'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {VectorMap} from 'react-jvectormap'
import {data,options,Lineoptions,Linedata,BarData,BarOptions} from '../Utils/AnalyticsChart'
function Analytics() {
    const mapData = {
        CN: 100000,
        IN: 9900,
        SA: 86,
        EG: 70,
        SE: 0,
        FI: 0,
        FR: 0,
        US: 20,
        pk:20
      };

    return (
        <div className="Home main-wrapper d-flex">
            {/* sidebar */}
              <Sidebar active="Analytics"/>
              <div className="body-area">
                {/* header */}
                <BodyHeader/>

                <div className="body-main-area">
                <h2>Analytics</h2>

                <div className="top-banner-results">
                    <div className="box">
                        <h4 className="heading">Current Pavelify</h4>
                        <p>Insights</p>
                    </div>
                    <div className="box d-flex-align-center">
                        <img src={ChatGreen} alt="" />
                       
                 
                        <div className="presentation">
                        <h4 className="heading">Chat Leads Acquired</h4>
                        <p>20</p>
                        </div>
                    </div>
                    <div className="box d-flex-align-center">
                    <img src={CalenderPurple} alt="" />
                       <div className="presentation">
                       <h4 className="heading">Total Email Tickets</h4>
                        <p>1,456</p>
                       </div>
                    </div>
                    <div className="box d-flex-align-center">
                    <img src={MessageBlue} alt="" />
                       <div className="presentation">
                       <h4 className="heading">Calendar Booking</h4>
                        <p>189</p>
                       </div>
                    </div>
                </div>


                <div className="bottom-area">
                    <div className="chart-line-wrapper">
                        <div className="top d-flex-align-center">
                            <h3>Analytics</h3>
                            <select name="" id="">
                                <option value="Last 30 days">Last 30 days</option>
                            </select>
                        </div>
                        <div className="chart-line" style={{marginTop:30,height:280}}>
                            <Line data={Linedata} options={Lineoptions} />
                        </div>
                    </div>

                    <div className="todo-list">
                        <div className="top d-flex-align-center" style={{marginTop:10}}>
                            <h3>User Activity</h3>
                            
                        </div>
                       <div className="bar-chart-wrapper" style={{marginTop:40,height:280}}>
                       <Bar
          data={BarData}
          options={BarOptions}/>
                       </div>

                    </div>
                    
                    <div className="dognut-chart">
                    <div className="top d-flex-align-center">
                            <h3>Charts</h3>
                            <div className="dots">
                            <svg width="22" height="6" viewBox="0 0 22 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="2.0625" cy="3" r="2.0625" fill="#282D4A"/>
<circle cx="11" cy="3" r="2.0625" fill="#282D4A"/>
<circle cx="19.9375" cy="3" r="2.0625" fill="#282D4A"/>
</svg>

                            </div>
                        </div>

                        <div className="chart-container">
<p>2,378 <span>Visitors</span></p>
<Doughnut data={data} options={options} />
</div>

                    </div>

                    <div className="visitor-vector-map">
                    <div className="top d-flex-align-center">
                            <h3>Visitors</h3>
                            <div className="dots">
                            <svg width="22" height="6" viewBox="0 0 22 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="2.0625" cy="3" r="2.0625" fill="#282D4A"/>
<circle cx="11" cy="3" r="2.0625" fill="#282D4A"/>
<circle cx="19.9375" cy="3" r="2.0625" fill="#282D4A"/>
</svg>

                            </div>
                        </div>


                        <div style={{height: 200}} className="map" >
                        <VectorMap map={'world_mill'}
                       backgroundColor="#fff"
                       zoomOnScroll={false}
                       regionStyle={{
                        initial: {
                          fill: "#dfe1f7"
                        },
                        hover: {
                          fill: "#7822e6"
                        },
                        selected: {
                            fill: "#7822e6"
                          },
                      }}
                      series={{
                        regions: [
                          {
                            values: mapData, //this is your data
                            scale: ["#7822e6"], //your color game's here
                            normalizeFunction: "polynomial"
                          }
                        ]
                      }}
                      regionsSelectable={true}
                       containerStyle={{
                           width: '100%',
                           height: '100%'
                       }}
                       containerClassName="map"
            />
        </div>

                    </div>



                    
                    <div className="Customer-Lists">
                        <div className="top d-flex-align-center">
                            <h3>Customer Lists</h3>
                            <a href="#">See All</a>
                        </div>
                        <ul className="bottom">
                            <li className="d-flex-align-center">
                                <img src={Person1} alt="" />
                               <div className="presentation">
                                   <p>Jhon Smith</p>
                                   <p>jhonsmith@gmail.com</p>
                               </div>
                               <button>Contact</button>
                            </li>
                            <li className="d-flex-align-center">
                                <img src={Person2} alt="" />
                                <div className="presentation">
                                   <p>Talan Siphron</p>
                                   <p>talansiph@gmail.com</p>
                               </div>
                                <button>Contact</button>
                            </li>
                            <li className="d-flex-align-center">
                                <img src={Person3} alt="" />
                                <div className="presentation">
                                   <p>Wilson Baptista</p>
                                   <p>wilson@gmail.com</p>
                               </div>
                                <button>Contact</button>
                            </li>
                        </ul>

                    </div>

                </div>
                </div>
                </div>
        </div>
    )
}

export default Analytics
