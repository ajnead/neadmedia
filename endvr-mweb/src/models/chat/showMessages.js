import React, {Component } from 'react';
import { Row, Col } from 'reactstrap';

class ShowMessages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatMessages : props.chatMessages,
        }

        this.images = [
            '81b0ef55d92527af53b4c52989b6ecacd07f5347.jpg',
            '81b0ef55d92527af53b4c52989b6ecacd07f5347.jpg',
            '81b0ef55d92527af53b4c52989b6ecacd07f5347.jpg',
            '81b0ef55d92527af53b4c52989b6ecacd07f5347.jpg',
            '81b0ef55d92527af53b4c52989b6ecacd07f5347.jpg'
          ];
    }

    componentDidMount(){
        this.showDialog();
    }

    componentWillReceiveProps(){
        this.showDialog();
    }

    showDialog() {
        var dialogs = this.props.chatMessages;
        for(var loop = 0; loop < dialogs.length; loop++ ){
            var dialog = dialogs[loop];
            
            var avatar = this.props.avatar;
            var bubbleColor = "host";
            var senderName = this.props.userName;
            
            if(dialog.senderType=="bot"){
                avatar = "eileen";
                bubbleColor = "remote";
                senderName = "Eileen";
            }
            
            dialog.avatar = avatar;
            dialog.bubbleColor = bubbleColor;
            dialog.senderName = senderName;

            dialog.showResults = "hide";
            if(dialog.hasSearchResult){
                dialog.showResults = "block";
            }
        }
        
        this.setState({
            chatMessages : dialogs,
        });
    }

    render() {
        return (
            <div>            
            {this.state.chatMessages.map((m, i) => (
                <Row key={i} noGutters className="margin-top-5">
                    <Col xs="2" sm="2">
                        <div className="assistant-avatar">
                            <div className={"avatar " + m.avatar}></div>
                        </div>
                    </Col>
                    <Col xs="10" sm="10">
                        <div className="assistant-name">{m.senderName}</div>
                        {m.messages.map((message, i) => (
                        <div key={i} className={"assistant-message " + m.bubbleColor}>
                           {message}
                        </div> 
                        ))}
                    </Col>
                </Row>
            ))}
            </div>
        )
    }
}

export default ShowMessages;



/*
 *shows image results in slider for search
 *this needs to be redone
<div className={m.showResults}>
    <div className="assistant-message review-products">
        <ImageSlider showSlider={m.showResults} images = {this.images} size="6" option="reviewSwipe" />
    </div>
    <div className={"assistant-message " + m.bubbleColor}>
        If you click any product, you can begin reviewing the options above.  Please swipe right for the results you like and left for the results you dislike.  I can find more results based on your likes and dislikes.
    </div> 
</div>
*/