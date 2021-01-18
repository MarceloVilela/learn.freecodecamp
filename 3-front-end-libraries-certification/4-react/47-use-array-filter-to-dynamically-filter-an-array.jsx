class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    username: 'Jeff',
                    online: true
                },
                {
                    username: 'Alan',
                    online: false
                },
                {
                    username: 'Mary',
                    online: true
                },
                {
                    username: 'Jim',
                    online: false
                },
                {
                    username: 'Sara',
                    online: true
                },
                {
                    username: 'Laura',
                    online: true
                }
            ]
        };
    }
    render() {
        const usersOnline = this.state.users; // Change this line
        const renderOnline = usersOnline.filter(item => item.online); // Change this line
        return (
            <div>
                <h1>Current Online Users:</h1>
                <ul>
                    {renderOnline.map((item, key) => (
                        <li key={key}>{item.username}</li>
                    ))}
                </ul>
            </div>
        );
    }
}