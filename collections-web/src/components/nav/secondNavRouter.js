import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavRoutes from "./routes.js";

class SecondNavRouter extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            data: [ ]
        };
    }
    
    componentDidMount() {
        var component = this;
        NavRoutes.map(function(r,index){
            var children = r.children;
            children.map(function(c,i){
                var child = c;
                child.parentPath = r.path; 
                component.state.data.push(child);
                return null;
            });
            return null;
        });
        component.forceUpdate();
    }

    render() { 
        return (
            <main>
                <Switch>
                    {this.state.data.map((r, i) => ( 
                        <Route key={i} path={r.parentPath + r.path} component={r.component} />
                    ))}
                </Switch>
            </main>
        )
    }
}

export default SecondNavRouter;