import DefaultView from '../defaultView';
import HomeContainer from '../../containers/homeContainer';
import DiscoveryContainer from '../../containers/discoveryContainer';
import AssistantContainer from '../../containers/assistantContainer';
import RequestHistoryContainer from '../../containers/requestHistoryContainer';
import QuestionsContainer from '../../containers/questionsContainer';
import CollectionContainer from '../../containers/collectionContainer';
import OnboardingContainer from '../../containers/onboardingContainer';

const Routes = [
    {
        navName : "Home",
        path : "/home",
        component : HomeContainer,
        isShown : true,
        iconName : "icon-home",
        headerType: "main",
        showBottomNav: true
    },
    {
        navName : "Discover",
        path : "/discover",
        component : DiscoveryContainer,
        isShown : true,
        iconName : "icon-discover",
        headerType: "none",
        showBottomNav: true
    },
    {
        navName : "Assistant",
        path : "/assistant",
        component : AssistantContainer,
        isShown : true,
        iconName : "icon-assistant",
        headerType: "main",
        showBottomNav: true
    },
    {
        navName : "Messages",
        path : "/messages",
        component : DefaultView,
        isShown : false,
        iconName : "icon-notifications",
        headerType: "main",
        showBottomNav: true
    },
    {
        navName : "Me",
        path : "/me",
        component : DefaultView,
        isShown : true,
        iconName : "icon-account",
        headerType: "main",
        showBottomNav: true
    },
    {
        navName : "Request History",
        path : "/requestHistory",
        component : RequestHistoryContainer,
        isShown : false,
        iconName : "",
        headerType: "main",
        showBottomNav: true
    },
    {
        navName : "Questions",
        path : "/questions",
        component : QuestionsContainer,
        isShown : false,
        iconName : "",
        headerType: "none",
        showBottomNav: true
    },
    {
        navName : "Collections",
        path : "/collections",
        component : CollectionContainer,
        isShown : false,
        iconName : "",
        headerType: "none",
        showBottomNav: true
    },
    {
        navName : "Onboarding",
        path : "/onboarding",
        component : OnboardingContainer,
        isShown : false,
        iconName : "",
        headerType: "none",
        showBottomNav: false
    }
]

export default Routes;