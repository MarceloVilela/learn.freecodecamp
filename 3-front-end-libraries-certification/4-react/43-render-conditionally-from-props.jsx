class Results extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        {/* Change code below this line */ }
        return <h1>{this.props.fiftyFifty}</h1>;
        {/* Change code above this line */ }
    }
}

class GameOfChance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState((state) => ({
            counter: state.counter + 1 // Change this line
        }));
    }
    render() {
        const expression = Math.random() >= 0.5 ? 'You Win!' : 'You Lose!'; // Change this line
        return (
            <div>
                <button onClick={this.handleClick}>Play Again</button>
                {/* Change code below this line */}
                <Results fiftyFifty={expression} />
                {/* Change code above this line */}
                <p>{'Turn: ' + this.state.counter}</p>
            </div>
        );
    }
}