import { Navlink } from "react-router-dom";
import React from "react"


function Header({ logoutUser }) {
    
    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        }).then( resp => {
            if (resp.ok) {
                logoutUser()
            }
        })
    }

    return (
        <header>
            <h1>
                <span>Put something here</span>
                Patients
            </h1>
            <nav>
                <NavLink to="/PatientList">Your Patients</NavLink>
            </nav>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleModeClick}>{ buttonText }</button>
        </header>
    )

}