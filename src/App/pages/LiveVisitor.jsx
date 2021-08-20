import React from 'react'
import BodyHeader from '../component/BodyHeader'
import Sidebar from '../component/Sidebar'
import LeftArrow from '../../Assets/img/left-contact.png'
import RightArrow from '../../Assets/img/right-contact.png'
import GermanyFlag from '../../Assets/img/flag-germany.png'
import FireFox from '../../Assets/img/logos_firefox.png'
import SpainFlag from '../../Assets/img/flag-spain.png'
import JapanFlag from '../../Assets/img/flag-japan.png'
import Chrome from '../../Assets/img/logos_chrome.png'
import { Doughnut } from 'react-chartjs-2';
import {Map} from '../../Assets/script/js/Map'
import {VectorMap} from 'react-jvectormap'
function LiveVisitors() {
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
    const data = {
        labels: ['Data One', 'Data Two', 'Data Three'],
        datasets: [
          {
            label: '# of Votes',
            data: [25, 25, 25, 25],
            backgroundColor: [
              '#9953B7',
              '#18AB8F',
              '#2D96D6',
              '#EEF0F6',
              
            ],
            hoverOffset:5,
            borderColor: [
                '#9953B7',
                '#18AB8F',
                '#2D96D6',
                '#EEF0F6',
             
            ],
            borderWidth: 1,
            cutout:80
          },
      
        ],
      };
      
      const options = {
        maintainAspectRatio: false,
        responsive:true,
        
        plugins: {
            legend: {
                
                labels:{
                    boxWidth:15,
                    boxHeight:15,
                    padding:20,
                },
              position: 'bottom',
              reverse:true,
            //   boxHeight:20,
            },
           
          },
        
        // cutoutPercentage: 120,
      };
    return (
        <div className="LiveVisitors main-wrapper  d-flex">
              {/* sidebar */}
              <Sidebar active="LiveVisitor"/>
              <div className="body-area">
                {/* header */}
                <BodyHeader/>
                <div className="body-main-area">
                <h2>Live Visitors</h2>
                <div className="grid-box-area grid-col-3">
                    <div className="top-area">
                        <div className="map-area">
                        <h4>Traffic Channels</h4>
                        <div style={{height: 300}} className="map">
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
                        <div className="traffic-channels">
                            <h4>Traffic Channels</h4>
                            <div className="table">
                                <ul className="table-head grid-col-3">
                                    <li>
                                    STATES
                                    </li>
                                    <li>
                                    Orders
                                    </li>
                                    <li>
                                    Sales
                                    </li>
                                </ul>
                                <ul className="table-body">
                                    <ul className="row grid-col-3">
                                        <li>
                                        United States
                                        </li>
                                        <li>
                                        23,890
                                        </li>
                                        <li>
                                        $3,900
                                        </li>
                                    </ul>
                                    <ul className="row grid-col-3">
                                        <li>
                                        Germany
                                        </li>
                                        <li>
                                        16,890
                                        </li>
                                        <li>
                                        $3,900
                                        </li>
                                    </ul>
                                    <ul className="row grid-col-3">
                                        <li>
                                        Japan
                                        </li>
                                        <li>
                                        12,900
                                        </li>
                                        <li>
                                        $3,900
                                        </li>
                                    </ul>
                                    <ul className="row grid-col-3">
                                        <li>
                                        Portugal
                                        </li>
                                        <li>
                                        9,800
                                        </li>
                                        <li>
                                        $3,900
                                        </li>
                                    </ul>
                                    <ul className="row grid-col-3">
                                        <li>
                                        Rusia
                                        </li>
                                        <li>
                                        11,890
                                        </li>
                                        <li>
                                        $3,900
                                        </li>
                                    </ul>
                                    <ul className="row grid-col-3">
                                        <li>
                                        France
                                        </li>
                                        <li>
                                        8,099
                                        </li>
                                        <li>
                                        $3,900
                                        </li>
                                    </ul>
                                    <ul className="row grid-col-3">
                                        <li>
                                        Spain
                                        </li>
                                        <li>
                                        23,890
                                        </li>
                                        <li>
                                        $3,900
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </div>


                    {/* chart area */}

                    <div className="chart-warpper">
<h4>Visitors Statistic</h4>
<div className="chart-container">
<p>2,378 <span>Visitors</span></p>
<Doughnut data={data} options={options} />
</div>
                    </div>



                    <div className="visitors-in-site ">
                     <div className="top-area d-flex-align-center">
                     <h4>Visitors on yours site at the moment</h4>
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
                     <div className="table">

                         <ul className="table-head">
                    <li>
                    No
                    </li>
                    <li>
                    Name
                    </li>
                    <li>
                    Entered
                    </li>
                    <li>
                    Last Visited Page
                    </li>
                    <li>
                    Country/Device
                    </li>
                         </ul>  

                         <ul className="table-body">
                             <div className="row ">
                             <li>
                    1.
                    </li>
                    <li>
                    <div className="tag">
                        A
                    </div>
                    <div className="presentation">
                        <h5>#e897dhj   <div className="icons-wrapper ">
                    

                    <img src={GermanyFlag} alt="" />
                    <img src={FireFox} alt="" />
            </div>
</h5>
                        <p>New</p>
                       
                    </div>
                    </li>
                    <li>
                    12 June 2021
                    </li>
                    <li>
                    <a href="http://palevay.com">http://palevay.com</a>
                    </li>
                    <li >
                    <div className="icons-wrapper">
                    

                            <img src={GermanyFlag} alt="" />
                            <img src={FireFox} alt="" />
                    </div>

                    <button>Start Chat</button>
                    </li> 
                             </div>

                             <div className="row">
                             <li>
                    2.
                    </li>
                    <li>
                    <div className="tag blue">
                        C
                    </div>
                    <div className="presentation">
                        <h5>#f56hjk8</h5>
                        <p>New</p>
                    </div>
                    </li>
                    <li>
                    8 days ago
                    </li>
                    <li>
                    <a href="http://palevay.com">http://palevay.com</a>
                    </li>
                    <li >
                    <div className="icons-wrapper">
                    

                            <img src={SpainFlag} alt="" />
                            <img src={FireFox} alt="" />
                    </div>

                    <button>Start Chat</button>
                    </li> 
                             </div>

                             <div className="row">
                             <li>
                    3.
                    </li>
                    <li>
                    <div className="tag yellow">
                    B
                    </div>
                    <div className="presentation">
                        <h5>#e897dhj</h5>
                        <p>New</p>
                    </div>
                    </li>
                    <li>
                    2 days ago
                    </li>
                    <li>
                    <a href="http://palevay.com">http://palevay.com</a>
                    </li>
                    <li >
                    <div className="icons-wrapper">
                    


                            <img src={JapanFlag} alt="" />
                            <img src={Chrome} alt="" />
                    </div>

                    <button>Start Chat</button>
                    </li> 
                             </div>
                         </ul>
                     </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default LiveVisitors
