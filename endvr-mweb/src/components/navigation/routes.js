import DefaultView from '../defaultView';
import HomeContainer from '../../containers/homeContainer';
import DiscoveryContainer from '../../containers/discoveryContainer';
import AssistantContainer from '../../containers/assistantContainer';

const Routes = [
    {
        navName : "Home",
        path : "/home",
        component : HomeContainer,
        isShown : true,
        iconName : "icon-home"

    },
    {
        navName : "Discover",
        path : "/discover",
        component : DiscoveryContainer,
        isShown : true,
        iconName : "icon-discover"
    },
    {
        navName : "Assistant",
        path : "/assistant",
        component : AssistantContainer,
        isShown : true,
        iconName : "icon-assistant"
    },
    {
        navName : "Messages",
        path : "/messages",
        component : DefaultView,
        isShown : false,
        iconName : "icon-notifications"
    },
    {
        navName : "Me",
        path : "/me",
        component : DefaultView,
        isShown : false,
        iconName : "icon-account"
    }
]

export default Routes;