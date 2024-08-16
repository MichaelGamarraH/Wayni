import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileContainer from './ProfileContainer';

const Name = () => {
    const { id } = useParams();  
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;  

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (user) {
             
            const [userName, userLastName] = user.name.split(' ');
            setName(userName || '');
            setLastName(userLastName || '');
        } else if (id) {
             
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`https://localhost:7154/api/User/get-user-by-id/${id}`);
                    const [userName, userLastName] = response.data.name.split(' ');
                    setName(userName || '');
                    setLastName(userLastName || '');
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUser();
        }
    }, [user, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedName = `${name} ${lastName}`;

        try {
            await axios.put(`https://localhost:7154/api/User/update-user-by-id/${user?.id || id}`, {
                name: updatedName,
                email: user?.email,          
                password: user?.password,    
                phoneNumber: user?.phoneNumber,  
                userName: user?.userName
            });
            console.log('User updated successfully');
            navigate('/');  
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <ProfileContainer title={
            <div className="d-flex align-items-center justify-content-center position-relative">
                <Link to="/" className="position-absolute start-0 ms-3">
                    <i className="bi bi-chevron-left"></i>
                </Link>
                <span className="text-center flex-grow-1">Edit Name</span>
            </div>
        }>
            <div className="container d-flex flex-column" style={{ minHeight: '70vh' }}>
                <form onSubmit={handleSubmit} className="d-flex flex-column flex-grow-1">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-auto">
                        <button 
                            type="submit" 
                            className="btn" 
                            style={{ backgroundColor: '#28a745', color: '#fff', width: '100%' }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </ProfileContainer>
    );
};

export default Name;