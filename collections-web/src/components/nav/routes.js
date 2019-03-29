import DefaultView from "../defaultView";
import AttributeContainer from "../../containers/attributeContainer";
import BrandContainer from "../../containers/brandContainer";
import FoundationContainer from "../../containers/foundationContainer";
import MicroserviceContainer from "../../containers/microserviceContainer";
import SourceContainer from "../../containers/sourceContainer";
import SkuContainer from "../../containers/skuContainer";
import RelationshipContainer from "../../containers/relationshipContainer";
import CrawlerContainer from "../../containers/crawlerContainer";
import TraceContainer from "../../containers/traceContainer";
import AccountContainer from "../../containers/accountContainer";
import TokenContainer from "../../containers/tokenContainer";

const NavRoutes = [
    {
        navName : "Definitions",
        path : "/definitions",
        defaultPath : "/attributes",
        className : "default",
        id : "navDefinitions",
        children : [
            {
                path : "/attributes",
                navName : "Attributes",
                defaultPath: "",
                component: AttributeContainer
            },
            {
                path : "/categories",
                navName : "Categories",
                defaultPath: "",
                component: DefaultView
            },
            {
                path : "/brands",
                navName : "Brands",
                defaultPath: "",
                component: BrandContainer
            },
            {
                path : "/foundations",
                navName : "Foundations",
                defaultPath: "",
                component: FoundationContainer
            },
            {
                path : "/crawler",
                navName : "Crawler",
                defaultPath: "/mappings",
                component: CrawlerContainer
            },
            {
                path : "/collections",
                navName : "Collections",
                defaultPath: "",
                component: DefaultView
            }
        ]
    },
    {
        navName : "Data",
        path : "/data",
        defaultPath : "/sources/data",
        className : "default",
        id : "navData",
        children : [
            {
                path : "/sources",
                navName : "Sources",
                defaultPath : "/data",
                component: SourceContainer,
            },
            {
                path : "/skus",
                navName : "Skus",
                defaultPath: "/data",
                component: SkuContainer
            },
            {
                path : "/relationships",
                navName : "Relationships",
                defaultPath: "/parent",
                component: RelationshipContainer
            }
        ]
    },
    {
        navName : "System",
        path : "/system",
        defaultPath : "/microservices/groups",
        className : "default",
        id : "navSystem",
        children : [
            {
                path : "/microservices",
                navName : "Microservices",
                defaultPath: "/groups",
                component: MicroserviceContainer
            },
            {
                path : "/trace",
                navName : "Trace",
                defaultPath: "",
                component: TraceContainer
            },
            {
                path : "/types",
                navName : "Types",
                defaultPath: "",
                component: DefaultView
            }
        ]
    },
    {
        navName : "Identity",
        path : "/identity",
        defaultPath : "/account",
        className : "default",
        id : "navSystem",
        children : [
            {
                path : "/account",
                navName : "Account",
                defaultPath: "",
                component: AccountContainer
            },
            {
                path : "/preferences",
                navName : "Preferences",
                defaultPath: "",
                component: DefaultView
            },
            {
                path : "/tokens",
                navName : "Token",
                defaultPath: "",
                component: TokenContainer
            }
        ]
    }
];

export default NavRoutes;