import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import IdentityCreation from '../models/onboarding/identityCreation';
import IntroQuestions from '../models/onboarding/introQuestions.ver1';
import BankingInformation from '../models/onboarding/bankingInformation.ver1';
import GetParameter from '../utilities/url/getParameter';
import PutParameter from '../utilities/url/putParameter';

class OnboardingContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            version: 1,
            step: 2,
            flow: [
                {
                    step: 1,
                    version: 1,
                    component: <IdentityCreation/>,
                    submitButtonText: "Join",
                    header: "Curated Recommendations You Will Love",
                    subHeader: "endvr will discovery new items to simplify your shopping experience",
                    stepName: "Account Creation",
                    footer: null,
                    footerLink: null
                },
                {
                    step: 2,
                    version: 1,
                    component: <IntroQuestions />,
                    submitButtonText: "Next",
                    header: "Answer questions to curate your experience",
                    subHeader: "Your answers are never shared and help endvr make the right curated recommendations",
                    stepName: "Introduction Questions",
                    footer: "You can exit onboarding at any time. Complete later to improve recommendations.",
                    footerLink: "Finish later"
                },
                {
                    step: 3,
                    version: 1,
                    component: <BankingInformation />,
                    submitButtonText: "Next",
                    header: "Help us give back to you",
                    subHeader: "As you shop from our smart recommendations we give back to you",
                    stepName: "Banking Information",
                    footer: "You can exit onboarding at any time. Complete later to improve recommendations.",
                    footerLink: "Finish later"
                }
            ],
            stepObj: {
            }
        }

        this.setStep = this.setStep.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount(){
        const step = GetParameter("step") === null ? 1 : parseInt(GetParameter("step"));
        this.setState({
            step: step
        },()=>{
            this.setStep();
        })
    }

    setStep(){
        const currentStep = this.state.step;
        const flowArr = this.state.flow;
        var foundStep = false;
        for(var flowObj of flowArr){
            if(flowObj.step==currentStep){
                foundStep = true;
                this.setState({
                    stepObj: flowObj
                })
            }
        }

        if(!foundStep){
            this.props.history.push("/home");
        }

        
    }

    submit(){
        const nextStep = this.state.step + 1;
        PutParameter("step",nextStep);

        if(this.state.step===1){
            this.refs.stepHolder.submit();
        }

        this.setState({
            step: nextStep
        },()=>{
            this.setStep();
        })
    }

    render(){
        const StepHolder = React.forwardRef((props,ref) => {
            switch(props.step){
                case 1: return <IdentityCreation ref={ref}/>
                case 2: return <IntroQuestions ref={ref}/>
                case 3: return <BankingInformation ref={ref}/>
            }
        })

        return(
            <Container fluid>
                <Row className="padding-top-25">
                    <Col>           
                        <h4 className="text-align-center">{this.state.stepObj.header}</h4>         
                        <h6 className="text-align-center text-muted margin-top-20">{this.state.stepObj.subHeader}</h6>                     
                        <StepHolder ref="stepHolder" step={this.state.step} />
                        <Button block className="bttn-secondary" onClick={this.submit}>{this.state.stepObj.submitButtonText}</Button>
                        {this.state.stepObj.footerLink!==null? <div className="text-align-center margin-top-10 font-h8"><Link to={"/home"}>{this.state.stepObj.footerLink}</Link></div> : <span></span>}
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default withRouter(OnboardingContainer);
//{this.state.stepObj.footer!==null? <h6 className="text-align-center text-muted margin-top-20">{this.state.stepObj.footer}</h6> : <span></span>}                     
//xs={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }}