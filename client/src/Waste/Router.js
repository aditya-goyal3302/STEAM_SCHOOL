import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Register from '../components/register/Register';

export default function Router() {
    return (
        <Switch>
            <Route path="/" exact component={Register}> </Route>
        </Switch>
    )
}
