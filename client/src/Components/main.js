//root component handle authentication here
import React, { Component } from 'react';

class Main extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Main;