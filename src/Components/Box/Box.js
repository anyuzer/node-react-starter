import React from 'react';
import styles from './styles';

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello World"
    };
  }

  updateMessage() {
    this.setState({
      message: (this.state.message === 'Hello World' ? 'Goodbye World' : 'Hello World')
    });
  }

  render() {
    return (
      <div style={styles.box} onClick={this.updateMessage.bind(this)}>
        {this.state.message}
      </div>
    );
  }
}

export default Box;