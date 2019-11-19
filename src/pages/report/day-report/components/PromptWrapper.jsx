import React from 'react';
import Prompt from 'umi/prompt';

// why we need *when* here?
// Prompt in React 16 "Warning: A history supports only one prompt at a time" [1]
// [1] https://github.com/ReactTraining/react-router/issues/5707
const initState = {
  when: false,
  showPrompt: false,
};

class PromptWrapper extends React.Component {
  state = initState;

  componentDidMount() {
    this.setState({
      when: true,
    });
  }

  componentWillReceiveProps({ showPrompt }) {
    window.onbeforeunload = showPrompt ? () => true : null;

    this.setState({
      title,
      showPrompt,
    });
  }

  componentWillUnmount() {
    this.setState({
      ...initState,
    });
    window.onbeforeunload = null;
  }

  render() {
    return (
      <React.Fragment>
        <Prompt
          when={this.state.when}
          message={() => (this.state.showPrompt ? `Sure to leave?` : true)}
        />
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default PromptWrapper;
