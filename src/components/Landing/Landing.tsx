import React, { useState } from 'react';
import './Landing.css';
import voter_admin from '../../assets/voter_login.svg';
import login_admin from '../../assets/admin_login.svg';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Landing = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div className="landing-container">
        <img src={logo} alt="Logo" className="landing-logo" />
        <div className="landing-container">
            <div className="left-section">
                <div className='contains'>
                    <div className="heading">    
                        <p>Choose Your Role</p>
                    </div>
                    <div className="role-selection">
                        <div
                            className={`selection-admin ${selectedImage === login_admin ? 'selected' : ''}`}
                            onClick={() => handleImageClick(login_admin)}
                        >
                            <Link to={selectedImage === login_admin ? '/admin_register' : ''}>
                                <img src={login_admin} alt="Admin" />
                                <div className="centers">Admin</div>
                            </Link>
                        </div>
                        <div
                            className={`selection-voter ${selectedImage === voter_admin ? 'selected' : ''}`}
                            onClick={() => handleImageClick(voter_admin)}
                        >
                            <Link to={selectedImage === voter_admin ? '/voter_register' : ''}>
                                <img src={voter_admin} alt="Voter" />
                                <div className="centers">Voter</div>
                            </Link>
                        </div>
                    </div>
                    {selectedImage && (
                        <div className="next-button">
                            <Link to={selectedImage === login_admin ? '/admin_register' : '/voter_register'}>
                                <button className="next-button">Next</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="right-section"></div>
        </div>
        </div>
    );
};

export default Landing;
