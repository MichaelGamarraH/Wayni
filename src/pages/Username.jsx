import React, { useEffect, useState } from 'react'
import ProfileContainer from './ProfileContainer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



const Username = () => {
    const { id } = useParams();   
    const navigate = useNavigate();

 
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://localhost:7154/api/User/get-user-by-id/${id}`);
                const user = response.data;
                setName(user.name);
                setUserName(user.userName);
                setPassword(user.password);
                setEmail(user.email);
                setPhoneNumber(user.phoneNumber);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7154/api/User/update-user-by-id/${id}`, {
                name: name,              
                userName: userName,      
                password: password,      
                email: email,            
                phoneNumber: phoneNumber  
            });
            console.log('User updated successfully');
            navigate('/');  
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <ProfileContainer title={
            <div className="d-flex align-items-center justify-content-center position-relative">
                <Link to="/" className="position-absolute start-0 ms-3">
                    <i className="bi bi-chevron-left"></i>
                </Link>
                <span className="text-center flex-grow-1">Update Username</span>
            </div>
        }>
            <div className="container d-flex flex-column" style={{ minHeight: '70vh' }}>
                <form onSubmit={handleSubmit} className="d-flex flex-column flex-grow-1">
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
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

export default Username;