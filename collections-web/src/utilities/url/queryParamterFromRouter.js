function queryParamaterFromRouter (component,parameter) {
        const queryString = require('query-string');
        const parsed = queryString.parse(component.props.location.search,{arrayFormat: 'bracket'});
        return parsed[parameter];
}

export default queryParamaterFromRouter; 