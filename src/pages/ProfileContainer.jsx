import React from 'react'

const ProfileContainer = ({ title, children }) => {
    return (
        <>
            <div className='text-center py-3'>
                <h2>{title}</h2>
            </div>
            <div className="container p-3" style={{ backgroundColor: '#e0f7e9', borderRadius: '15px', minHeight: '70vh' }}>
                {children}
            </div>
        </>
    );
};

export default ProfileContainer