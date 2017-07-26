import React, { Component } from 'react';
import { fromJS } from 'immutable'
import { Header, Segment, TextArea, Form, Button } from 'semantic-ui-react';
import _ from 'lodash';
import Quotes from './Quotes/Quotes';
import LoadingSpinner from './Quotes/LoadingSpinner';


import './App.css';

import helpers from './Quotes/quoteHelper';

const userName = 'Brian';

const mssgeWrpperStle = {
  backgroundColor: '#F6F6F6',
  margin: 10,
  overflowY: 'scroll',
  height: '60vh',
  borderRadius: 10,
};

class App extends Component {
  state = {
    quotes: fromJS([]),
    quoteIndex: 0,
    chunkQuotes: '',
    textVal: '',
    noMessage: false,
    displayTime: false,
  }

  fetchMessage = () => {
    // Gets inital messages and chunks into each array. Then sets chunkQuotes.
    helpers.getMessageArchive().then(quotes => {
      const chunkQuotes = _.chunk(quotes, 1);
      this.setState({
        quotes: fromJS(chunkQuotes[this.state.quoteIndex]),
        chunkQuotes,
      });
    });
    return setTimeout(this.next, 5000);
  }

  next = () => {
    // inital load is roughly 50 for archived quotes.
    if (this.state.quotes.size < 48) {
      const randNum = (Math.floor(Math.random() * 6) + 3) * 1000;
      // reference to quotes
      let oldMap = this.state.quotes;
      // new quotes
      const newMap = oldMap.concat(fromJS(this.state.chunkQuotes[this.state.quoteIndex + 1]));

      this.setState({
        quoteIndex: this.state.quoteIndex + 1,
        quotes: newMap,
      });

      return setTimeout(this.next, randNum);
    }
    else {
      // archived quotes are close to depleted thn get the new messages
      const randNum = (Math.floor(Math.random() * 3) + 1) * 1000;

      this.getNewMessages();

      return setTimeout(this.next, randNum);
    }
  }

  getNewMessages = () => {
    helpers.getNewMessages().then(res => {

      const newMessage = fromJS(res);

      const oldMap = this.state.quotes;

      const newMap = oldMap.concat(newMessage);

      this.setState({ quotes: newMap, noMessage: newMessage.size === 0 ? true : false });
    });
  }

  handleInputText = (e) => {
    const textVal = e.target.value;

    this.setState({ textVal });
  }

  addToChatBox = (e) => {
    e.preventDefault()

    const oldMap = this.state.quotes;

    const {textVal} = this.state;

    const body = {
      personName: userName,
      chatMessage: textVal,
      dateCreated: new Date().toString(),
    };

    const newMap = oldMap.concat(fromJS([body]));

    this.setState({ quotes: newMap, textVal: '' });
  }

  componentDidMount = () => this.fetchMessage();

  handleTimeDisplay = () =>
    this.setState(prev => ({ displayTime: !prev.displayTime }))

  componentWillUpdate() {
    const node = this.refs.wrap;
    this.shouldScrollBottom = node.scrollTop + node.clientHeight === node.scrollHeight;
  }
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      const node = this.refs.wrap;
      node.scrollTop = node.scrollHeight
    }
  }

  render() {

    return (
      <div className="App">
        <Header as='h3' inverted attached style={{ marginBottom: 16 }}>Chat Nurro</Header>

        <section id='container' style={{ padding: 20, backgroundColor: '#F6F6F6' }}>

          <div id='hide-times-wrapper' style={{ position: 'relative', width: '100%', height: 40 }}>
            <Button
              positive
              style={{ position: 'absolute', right: 0 }}
              onClick={this.handleTimeDisplay}
            >
            {!this.state.displayTime ? 'See Times' : 'Hide Times'}
            </Button>
          </div>

          <Segment id='message-container' style={{ backgroundColor: '#F6F6F6' }}>

            <div id='message-wrapper' style={mssgeWrpperStle} ref='wrap'>
            {
              this.state.quotes.size
              ?
              this.state.quotes.map((quote, i) => {
                return (
                  <Quotes
                    key={i}
                    quote={quote}
                    user={this.state.user}
                    obi={this.state.obi}
                    mikeTyson={this.state.mikeTyson}
                    neil={this.state.neil}
                    chuck={this.state.chuck}
                    dispTime={this.state.displayTime}
                  />
                )
              })
              :
              <LoadingSpinner />
            }
            </div>

          </Segment>

          <Form id='user-chat-ctrls' onSubmit={ this.addToChatBox }>
            <TextArea value={this.state.textVal} onKeyPress={(e) => e.which === 13 && this.addToChatBox(e)} onChange={this.handleInputText} />
            <Button style={{ marginTop: 10 }} floated='right' primary disabled={this.state.textVal.length === 0} content='Send'/>
          </Form>

        </section>

      </div>
    );
  }
}

export default App;
