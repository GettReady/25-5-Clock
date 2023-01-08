// import React from 'react'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="clocks">
                {/* <div id="clock-face">
                    <div id="hour-hand"></div>
                    <div id="minute-hand"></div>
                </div> */}
                {/* <div className="flap-face"> */}
                    <div className="flap-set">
                        <Display style="left" number="9" />
                        <Display style="right" number="9" />
                    </div>
                    <div className="flap-set">
                        <Display style="left" number="9" />
                        <Display style="right" number="9" />
                    </div>
                {/* </div> */}
                
            </div>
        );
    }
}

const _flipTopAnimation = "flip-top";
const _flipBottomAnimation = "flip-bottom";

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = { number: 0 };
        this.topBackLeaf = React.createRef();
        this.bottomBackLeaf = React.createRef();
        this.topFrontLeaf = React.createRef();
        this.bottomFrontLeaf = React.createRef();
    }

    restartFlip = (event) => {
        let elements = [...document.getElementsByClassName("flip-top"), ...document.getElementsByClassName("flip-bottom")];
        for (let i = 0; i < elements.length; ++i) {
            console.log(elements[i]);
            elements[i].style.animation = "none";
            setTimeout(() => { elements[i].style.animation = ""; }, 1);
        }
        // let element = event.target;
        // console.log(element);
        // element[i].style.animation = "none";
        // setTimeout(() => { element.style.animation = ""; }, 100);
        if (this.state.number == 9) {
            this.setState({ number: 0 });
        } else {
            this.setState({ number: ++this.state.number });
        }        
        
    }

    flip = () => {

        this.topFrontLeaf.current.style.animation = "none";
        setTimeout(() => { this.topFrontLeaf.current.style.animation = ""; }, 1);
        this.bottomFrontLeaf.current.style.animation = "none";
        setTimeout(() => { this.bottomFrontLeaf.current.style.animation = ""; }, 1);

        setTimeout(() => { 
            this.topBackLeaf.current.innerText = this.state.number;
        }, 10);
        setTimeout(() => { 
            this.bottomBackLeaf.current.innerText = this.state.number;
        }, 300);

        if (this.state.number == 9) {
            this.setState({ number: 0 });
        } else {
            this.setState({ number: ++this.state.number });
        }
    }

    render() {
        let leafStylingTop = "leaf top " + this.props.style + " ";
        let leafStylingBottom = "leaf bottom " + this.props.style + " ";
        let number = this.state.number==0 ? 9 : this.state.number-1;
        return (
            // <div className="display" onMouseDown={this.flip}>
            //     <div className="flipper front"> 
            //         <div className={leafStylingTop + _flipTopAnimation}>{this.state.number-1}</div> {/*------------*/}
            //         <div className={leafStylingBottom + _flipBottomAnimation}>{this.state.number}</div> {/*+++++++++++*/}
            //     </div>  
            //     <div className="flipper back">
            //         <div ref={this.topBackLeaf} className={leafStylingTop}>{this.state.number}</div> {/*//////////*/}
            //         <div ref={this.bottomBackLeaf} className={leafStylingBottom}>{this.state.number}</div> {/*//////////*/}
            //     </div>
            // </div> 
            <div className="display" onMouseDown={this.flip}>
                <div className="flipper front"> 
                    <div ref={this.topFrontLeaf} className={leafStylingTop + _flipTopAnimation}>{number}</div> {/*------------*/}
                    <div ref={this.bottomFrontLeaf} className={leafStylingBottom + _flipBottomAnimation}>{this.state.number}</div> {/*+++++++++++*/}
                </div>  
                <div className="flipper back">
                    <div ref={this.topBackLeaf} className={leafStylingTop}>0</div> {/*//////////*/}
                    <div ref={this.bottomBackLeaf} className={leafStylingBottom}>0</div> {/*//////////*/}
                </div>
            </div> 
        );
    }
}

const container = document.getElementById("wrapper");
const root = ReactDOM.createRoot(container);
root.render(<App />);