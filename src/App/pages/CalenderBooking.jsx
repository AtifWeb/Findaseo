
import React, { useEffect } from 'react'
import BodyHeader from '../component/BodyHeader'
import Sidebar from '../component/Sidebar'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Calender } from '../../Assets/script/js/Calender'
import {events} from "../Utils/CalenderEvents"
function CalenderBooking() {

    useEffect(() => {
  document.querySelector(".fc-prev-button").setAttribute("id","calender-prev-button")
  document.querySelector(".fc-next-button").setAttribute("id","calender-next-button")
    Calender()
    }, [])
    return (
        <div className="EmailTickets CalenderBooking main-wrapper d-flex">
            {/* sidebar */}
              <Sidebar active="calender"/>
              <div className="body-area">
                {/* header */}
                <BodyHeader active="calender"/>

                <div className="body-main-area">
                <h2>Calendar Booking</h2>
    
                <ul className="navigation-bar d-flex-align-center">
                    <li className="active d-flex-align-center">
                    <p>Schduled Meetings</p>
                    <span>3</span>
                    </li>
                    <li className="d-flex-align-center">
                    <p>Upcoming Meetings</p>
                    <span>1</span>
                    </li>
                    <li className="d-flex-align-center">
                    <p>Past Meetings</p>
                    <span>3</span>
                    </li>
                    <li className="d-flex-align-center">
                    <p>Pending</p>
                    <span>0</span>
                    </li>
                    <li className="d-flex-align-center">
                    <p>Meeting Categories</p>
                    <span>0</span>
                    </li>
                    <li className="button-wrapper">
                    <button className="schedule-btn">Add Schedule</button>
                    </li>
                </ul>



                <div className="bottom-calender-area grid-col-4" style={{marginTop:40}}>
                        <div style={{background:"#fff"}}>
                        <div class="box calender stagger">
              <div class="calender-top">
                <label htmlFor="calender-prev-button" class="icon-wrapper" id="calender-back-icon-wrapper">
                <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 1.5L2 8.5L9 15.5" stroke="#282D4A" stroke-width="1.6"/>
</svg>

                </label>
                <strong class="Calender-DateTime">Dec, 2021</strong>
                <label htmlFor="calender-next-button" class="icon-wrapper" id="calender-towards-icon-wrapper">
                <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1.5L8 8.5L1 15.5" stroke="#282D4A" stroke-width="1.6"/>
</svg>

                </label>
              </div>
              <div class="calender-days-name">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
              <div class="calender-days">
               
              </div>
            </div>

            <div className="bottom-after-calender">
            <h3>Scheduled Lists</h3>
            <ul>
              <li>
              Create a management dash...
              </li>
              <li>
              Unlock all payment in one
              </li>
              <li>
              Learn How to UI design figma
              </li>
            </ul>
            </div>


                        </div>


                        <div id="calender">
                        <FullCalendar
                            plugins={[ dayGridPlugin ]}
                            initialView="dayGridMonth"
                            events={events}
                            eventColor= '#7822e624'
                           
                        />
                        </div>
                </div>


                

                </div>
                </div>
        </div>
    )
}

export default CalenderBooking
