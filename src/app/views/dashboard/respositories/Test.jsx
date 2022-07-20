import React from 'react'
// import "./styles.css";

class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '' }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = (event) => {
        console.log('Hi there, user!')
        this.setState({name: event})
    }

    render() {
        return (
            <div >
              {this.state.name}
                <p>Click this text to see the event bubbling</p>{' '}
                <button onClick={()=>this.setState({name: 'event'})}>Click me</button>
            </div>
        )
    }
}

export default Test
