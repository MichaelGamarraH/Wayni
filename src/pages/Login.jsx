import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileContainer from './ProfileContainer';

const Login = () => {
    const [listUsers, setListUsers] = useState([]);

    const leerServicio = () => {
        const servicio = "https://localhost:7154/api/User/get-all-users";
        fetch(servicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListUsers(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        leerServicio();
    }, []);

    const firstUser = listUsers.length > 0 ? listUsers[0] : null;

    return (
        <ProfileContainer title="Profile Setting">
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center mb-2" style={{ padding: '1rem' }}>
                    <div>
                        <strong>Name</strong>
                        <div className="text-muted">{firstUser ? firstUser.name : 'Loading...'}</div>
                    </div>
                    <div className="d-flex align-items-center">
                        {firstUser && (
                            <Link to={`/loginname/${firstUser.id}`} state={{ user: firstUser }}>
                                <i className="bi bi-chevron-right"></i>
                            </Link>
                        )}
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center mb-2" style={{ padding: '1rem' }}>
                    <div>
                        <strong>User Name</strong>
                        <div className="text-muted">{firstUser ? firstUser.userName : 'Loading...'}</div>
                    </div>
                    <div className="d-flex align-items-center">
                        {firstUser && (
                            <Link to={`/loginusername/${firstUser.id}`}>
                                <i className="bi bi-chevron-right"></i>
                            </Link>
                        )}
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center mb-2" style={{ padding: '1rem' }}>
                    <div>
                        <strong>Email</strong>
                        <div className="text-muted">{firstUser ? firstUser.email : 'Loading...'}</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center mb-2" style={{ padding: '1rem' }}>
                    <div>
                        <strong>Phone Number</strong>
                        <div className="text-muted">{firstUser ? firstUser.phoneNumber : 'Loading...'}</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center mb-2" style={{ padding: '1rem' }}>
                    <div>
                        <strong>Change Password</strong>
                    </div>
                    <div className="d-flex align-items-center">
                        {firstUser && (
                            <Link to={`/loginPassword/${firstUser.id}`}>
                                <i className="bi bi-chevron-right"></i>
                            </Link>
                        )}
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center mb-2" style={{ padding: '1rem' }}>
                    <div>
                        <strong>Delete my account and data</strong>
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center mb-2" style={{ padding: '1rem' }}>
                    <div>
                        <strong>Notification</strong>
                        <div className="text-muted">On</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </li>
            </ul>
        </ProfileContainer>
    );
};

export default Login;
