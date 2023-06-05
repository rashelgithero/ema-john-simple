import React, { useContext } from 'react';
import { Route} from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({children, ...rest }) => {
    const [logInUser] = useContext(userContext);
    
    return (
        <Route>
            {...rest}
            render={({location}) => 
            logInUser.email?
            (children) 
            : (
               <redirect to ={{
                pathName: '/login',
                state: { from: location }
               }}></redirect>
            ) }

        </Route>
    );
};

export default PrivateRoute;