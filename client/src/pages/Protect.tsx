import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import type { RootState } from '../store';
import { useSelector } from 'react-redux';

interface ProtectProps {
    children: React.ReactNode
}

function Protect({children}: ProtectProps) {
    const navigate = useNavigate();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    })
  return <>
    {children}
  </>
}

export default Protect
