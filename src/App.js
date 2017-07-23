import React, { Component } from 'react';
import { fromJS } from 'immutable'
import ReactDOM from 'react-dom';
import base64Img from 'base64-img';
import {Image, Popup, Message, Header, Icon, Segment, TextArea, Form, Button } from 'semantic-ui-react';
import lodash from 'lodash';
import ScrollToTop from 'react-scroll-up'
import Quotes from './Quotes/Quotes';
import UserQuoteInput from './Quotes/UserQuoteInput';
import LoadingSpinner from './Quotes/LoadingSpinner';

import './App.css';

import _ from './Quotes/quoteHelper';

const imageURl = 'http://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1492195753/articles/2014/09/19/the-right-s-war-on-neil-degrasse-tyson/140918-mak-tyson-tease_einiuy';

const tysonUrl = 'http://video.skysports.com/syeWcyYjE6tD6uVdcmi5JSv6w_cNTsw5/promo318169129';

const obiUrl = 'http://markmcmillion.com/wp-content/uploads/2015/11/Obi-Wan.jpg';

const chuckUrl = 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAZ1AAAAJGVmYTJhNzZjLTY2MDAtNDFhMS1iMjliLTZlMTQwYTNkNjE5Nw.jpg';

const userUrl = 'http://heartlandpreciousmetals.com/wp-content/uploads/2014/06/person-placeholder.jpg';

const userName = 'Thai';

class App extends Component {
  state = {
    quotes: fromJS([]),
    quoteIndex: 0,
    chunkQuotes: '',
    textVal: '',
    showInitBtn: true,
    neil: '', mikeTyson: '',
    obi: '', chuck: '', user: '',
    noMessage: false,
    displayTime: false,
  }

  fetchMessage = () => {
    _.getMessageArchive().then(quotes => {
      const chunkQuotes = lodash.chunk(quotes, 1);
      this.setState({
        quotes: fromJS(chunkQuotes[this.state.quoteIndex]),
        chunkQuotes,
        showInitBtn: false
      });
    });
    return setTimeout(this.next, 5000);
  }

  next = () => {
    // let oldMap = this.state.quotes;
    // const newMap = oldMap.concat(fromJS(this.state.chunkQuotes[this.state.quoteIndex + 1]));
    // this.setState({
    //   quoteIndex: this.state.quoteIndex + 1,
    //   quotes: newMap,
    // });
    if (this.state.quotes.size < 48) {
      const randNum = (Math.floor(Math.random() * 6) + 3) * 1000;
      console.log('randomNum', randNum);

      let oldMap = this.state.quotes;
      const newMap = oldMap.concat(fromJS(this.state.chunkQuotes[this.state.quoteIndex + 1]));
      this.setState({
        quoteIndex: this.state.quoteIndex + 1,
        quotes: newMap,
      });
      return setTimeout(this.next, randNum);
    }
    else {
      const randNum = (Math.floor(Math.random() * 15) + 3) * 1000;
      console.log('randomNum', randNum);

      this.getNewMessages();
      return setTimeout(this.next, randNum);
    }
  }

  getNewMessages = () => {
    _.getNewMessages().then(res => {
      // this.setState({newMessages: fromJS(res)});
      const newMessage = fromJS(res);
      console.log(newMessage.size, 'size');
      const oldMap = this.state.quotes;
      const newMap = oldMap.concat(newMessage);
      this.setState({ quotes: newMap, noMessage: newMessage.size === 0 ? true : false });
    })
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

  componentDidMount() {
    const body = base64Img.requestBase64(imageURl, (err, res, body) => {
      this.setState({ neil : body})
    });
    const tyson = base64Img.requestBase64(tysonUrl, (err, res, body) => {
      this.setState({ mikeTyson : body})
    });
    const obi = base64Img.requestBase64(obiUrl, (err, res, body) => {
      this.setState({ obi : body})
    });
    const chuck = base64Img.requestBase64(chuckUrl, (err, res, body) => {
      this.setState({ chuck : body})
    });
    const user = base64Img.requestBase64(userUrl, (err, res, body) => {
      this.setState({ user : body})
    });
    this.fetchMessage();

  }

  handleTimeDisplay = () => this.setState(prev => ({ displayTime: !prev.displayTime }))

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

          <div style={{ position: 'relative', width: '100%', height: 40 }}>
            <Button
              positive
              style={{ position: 'absolute', right: 0 }}
              onClick={this.handleTimeDisplay}
            >
            {!this.state.displayTime ? 'See Times' : 'Hide Times'}
          </Button>
          </div>

          <Segment style={{ backgroundColor: '#F6F6F6' }}>
            <div style={{ backgroundColor: '#F6F6F6', margin: 10, overflowY: 'scroll', height: '60vh', borderRadius: 10 }} ref='wrap'>
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
              <ScrollToTop showUnder={160}>
                <Icon id='scroll-up' name='hand pointer' size='large'/>
              </ScrollToTop>
            </div>

          </Segment>
          { /*
            this.state.quotes.size < 48
            &&
            this.state.quotes.size > 0
            &&
            <button style={{ marginBottom: 16 }}
              disabled={this.state.quotes.size > 48}
              onClick={this.next}>
              next</button> */
          }

          <Form onSubmit={this.addToChatBox} style={{ margin: 30 }} style={{ width: '100%' }}>
            {/*<input value={this.state.textVal} onChange={this.handleInputText}/>*/}
            <TextArea value={this.state.textVal} onKeyPress={(e) => e.which === 13 && this.addToChatBox(e)} onChange={this.handleInputText} />
            <Button style={{ marginTop: 10 }} floated='right' primary disabled={this.state.textVal.length === 0} content='Send'/>
          </Form>

          {
            this.state.noMessage && <Message warning>No New Messages Please Try Again In One Moment</Message>
          }
          { /*
            this.state.quotes.size > 48
            &&
            <button style={{ marginBottom: 16 }} onClick={this.getNewMessages}>next</button> */
          }
        </section>
      </div>
    );
  }
}

export default App;
