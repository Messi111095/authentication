import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submit = useSubmit();


  useEffect(() => {    // Check if the token is expired on component mount
    if(!token){
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log('Token duration:', tokenDuration);
    setTimeout(() => {    
      submit(null, {action:'/logout', method: 'post' });
    }, tokenDuration); // Check every hour
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
