import React from 'react';
import { Switch, Route } from 'react-router-dom';

class ThirdNavSwitch extends React.Component{
    
    render(){
        return(
                <main>
                    <Switch>
                        {this.props.nav.map((r, i) => ( 
                            <Route key={i} path={r.to} component={r.component} />
                        ))}
                    </Switch>
                </main>
        )
    }
}

export default ThirdNavSwitch;