import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routes from './routes.js';

const ContainerSwitch = () => (
    <main>
        <Switch>
            {Routes.map((r, i) => ( 
            <Route key={i} exact path={r.path + "/"} component={r.component}/>
            ))}
        </Switch>
    </main>
);

export default ContainerSwitch;
