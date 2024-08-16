import React, { useEffect, useState } from 'react'
import ProfileContainer from './ProfileContainer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function Password() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordValidationError, setPasswordValidationError] = useState('');
    const [user, setUser] = useState(null);

    // Mostrar u ocultar la contraseña
    const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
    const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    // Validar la coincidencia de contraseñas y la validez de la nueva contraseña en tiempo real
    useEffect(() => {
        const passwordValid = /^(?=.*[A-Z]).{8,16}$/;
        
        if (newPassword && confirmPassword) {
            setPasswordMismatch(newPassword !== confirmPassword);
        } else {
            setPasswordMismatch(false);
        }

        if (newPassword) {
            if (!passwordValid.test(newPassword)) {
                setPasswordValidationError('Password must be 8-16 characters long and include at least one uppercase letter.');
            } else {
                setPasswordValidationError('');
            }
        } else {
            setPasswordValidationError('');
        }
    }, [newPassword, confirmPassword]);

    // Obtener los datos del usuario
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://localhost:7154/api/User/get-user-by-id/${id}`);
                setUser(response.data); // Almacena todos los datos del usuario
            } catch (error) {
                console.error('Error fetching user data:', error);
                setPasswordError('Error fetching user data. Please try again.');
            }
        };

        fetchUserData();
    }, [id]);

    // Validaciones y envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica la coincidencia de contraseñas
        if (passwordMismatch || passwordValidationError) {
            return;
        }

        // Verifica la contraseña actual
        if (user && currentPassword.trim() !== user.password) {
            setPasswordError('Current password is incorrect.');
            return;
        }

        try {
            await axios.put(`https://localhost:7154/api/User/update-user-by-id/${id}`, {
                name: user?.name,  
                email: user?.email,  
                password: newPassword,  
                phoneNumber: user?.phoneNumber,  
                userName: user?.userName
            });

            alert('Password updated successfully');
            navigate('/');  
        } catch (error) {
            console.error('Error updating password:', error);
            setPasswordError('Error updating password. Please try again.');
        }
    };

    return (
        <ProfileContainer title={
            <div className="d-flex align-items-center justify-content-center position-relative">
                <Link to="/" className="position-absolute start-0 ms-3">
                    <i className="bi bi-chevron-left"></i>
                </Link>
                <span className="text-center flex-grow-1">Change Password</span>
            </div>
        }>
            <div className="container d-flex flex-column" style={{ minHeight: '70vh' }}>
                <form onSubmit={handleSubmit} className="d-flex flex-column flex-grow-1">
                    {/* Current Password */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="current-password" className="form-label">Current Password</label>
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            className="form-control"
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`bi ${showCurrentPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute end-0 me-2`}
                            style={{ top: '50%', transform: 'translateY(-50%)' }}
                            onClick={toggleShowCurrentPassword}
                        ></i>
                    </div>

                    {/* New Password */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="new-password" className="form-label">New Password</label>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            className="form-control"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`bi ${showNewPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute end-0 me-2`}
                            style={{ top: '50%', transform: 'translateY(-50%)' }}
                            onClick={toggleShowNewPassword}
                        ></i>
                        {passwordValidationError && (
                            <div className="text-danger mt-2">{passwordValidationError}</div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="form-control"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute end-0 me-2`}
                            style={{ top: '50%', transform: 'translateY(-50%)' }}
                            onClick={toggleShowConfirmPassword}
                        ></i>
                    </div>

                    {/* Error Messages */}
                    {passwordMismatch && (
                        <div className="text-danger mb-3">Passwords don't match</div>
                    )}
                    {passwordError && (
                        <div className="text-danger mb-3">{passwordError}</div>
                    )}

                    <div className="mt-auto">
                        <button
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: '#28a745', color: '#fff', width: '100%' }}
                            disabled={passwordMismatch || !!passwordValidationError}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </ProfileContainer>
    );
}