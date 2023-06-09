import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/users/usersSlice';

const IsAdmin = <T extends {}>(Component: React.ComponentType<T>) => {
  const ProtectedComponent = (props: T) => {
    const user = useSelector(selectUser);
    const router = useRouter();

    useEffect(() => {
      if (!user || user.role !== 'admin') {
        router.push('/');
      }
    }, [user, router]);

    if (!user || user.role !== 'admin') {
      return null;
    }

    return <Component {...props} />;
  };

  return ProtectedComponent;
};

export default IsAdmin;
