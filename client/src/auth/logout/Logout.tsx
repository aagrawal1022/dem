import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'store/slices/authSlice';

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};
