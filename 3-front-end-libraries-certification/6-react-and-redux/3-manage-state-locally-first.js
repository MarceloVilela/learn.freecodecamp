class DisplayMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }
    // Add handleChange() and submitMessage() methods here
    handleChange(input) {
        this.setState({ ...this.state, input });
    }
    submitMessage() {
        this.setState({ ...this.state, messages: [...this.state.messages, this.state.input], input: '' });
    }
    render() {
        return (
            <div>
                <h2>Type in a new Message:</h2>
                { /* Render an input, button, and ul below this line */}
                <input value={this.state.input} onChange={(e) => this.handleChange(e.target.value)} />
                <button onClick={this.submitMessage}>Add message</button>
                <ul>
                    {this.state.messages.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
                { /* Change code above this line */}
            </div>
        );
    }
};