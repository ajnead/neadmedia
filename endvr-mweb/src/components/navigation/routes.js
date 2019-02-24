import DefaultView from '../defaultView';
import HomeContainer from '../../containers/homeContainer';
import DiscoveryContainer from '../../containers/discoveryContainer';
import AssistantContainer from '../../containers/assistantContainer';
import RequestHistoryContainer from '../../containers/requestHistoryContainer';
import QuestionsContainer from '../../containers/questionsContainer';

const Routes = [
    {
        navName : "Home",
        path : "/home",
        component : HomeContainer,
        isShown : true,
        iconName : "icon-home",
        headerType: "main"

    },
    {
        navName : "Discover",
        path : "/discover",
        component : DiscoveryContainer,
        isShown : true,
        iconName : "icon-discover",
        headerType: "none"
    },
    {
        navName : "Assistant",
        path : "/assistant",
        component : AssistantContainer,
        isShown : true,
        iconName : "icon-assistant",
        headerType: "main"
    },
    {
        navName : "Messages",
        path : "/messages",
        component : DefaultView,
        isShown : false,
        iconName : "icon-notifications",
        headerType: "main"
    },
    {
        navName : "Me",
        path : "/me",
        component : DefaultView,
        isShown : false,
        iconName : "icon-account",
        headerType: "main"
    },
    {
        navName : "Request History",
        path : "/requestHistory",
        component : RequestHistoryContainer,
        isShown : false,
        iconName : "",
        headerType: "main"
    },
    {
        navName : "Questions",
        path : "/questions",
        component : QuestionsContainer,
        isShown : false,
        iconName : "",
        headerType: "none"
    }
]

export default Routes;