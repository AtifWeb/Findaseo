import React from 'react'
import Photo from '../../Assets/img/Photo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
function BodyHeader() {
    return (
        <div className="BodyHeader d-flex-align-center">
            <form className="left-area d-flex-align-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#9CA2C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 22L20 20" stroke="#9CA2C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        <input type="text" placeholder="Search..." />
            </form>

            <div className="right-area d-flex-align-center">
                <button className="sm-btn">Upgrade</button>
                <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0201 2.91003C8.71009 2.91003 6.02009 5.60003 6.02009 8.91003V11.8C6.02009 12.41 5.76009 13.34 5.45009 13.86L4.30009 15.77C3.59009 16.95 4.08009 18.26 5.38009 18.7C9.69009 20.14 14.3401 20.14 18.6501 18.7C19.8601 18.3 20.3901 16.87 19.7301 15.77L18.5801 13.86C18.2801 13.34 18.0201 12.41 18.0201 11.8V8.91003C18.0201 5.61003 15.3201 2.91003 12.0201 2.91003Z" stroke="#9CA2C9" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z" stroke="#9CA2C9" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#9CA2C9" stroke-width="1.5" stroke-miterlimit="10"/>
</svg>

                </div>

                <div className="profile-name-area d-flex-align-center">
                        <img src={Photo} alt="" />
                        <p>Salung Prastyo</p>
                        <div className="icon-wrapper">
                        <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.44513 3.37805L0 0.621948H6.89025L3.44513 3.37805Z" fill="#282D4A"/>
</svg>

                        </div>
                </div>
            </div>

            <div className="burger-icon" onClick={e=>document.querySelector(".Sidebar").classList.toggle("active")}>
            <FontAwesomeIcon icon={faBars} />
            </div>
        </div>
    )
}

export default BodyHeader
