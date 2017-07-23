import React, { Component } from 'react';
import { fromJS } from 'immutable'
import ReactDOM from 'react-dom';
import base64Img from 'base64-img';
import {Image, Popup, Message, Header, Icon } from 'semantic-ui-react';
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

//   var initMyLib = function() {
//   templog.prepend( lognumber++ + '. initMyLib is invoked\n' );
//   if (typeof(myLib) == 'undefined') {
//     setTimeout(initMyLib, 50);
//   } else {
//     useMyLib();
//   }
// }
  // intoMyLib = () => {
  //   if (this.state.quotes.size < 48) {
  //
  //   }
  // }

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
    var node = this.refs.wrap;
    this.shouldScrollBottom = node.scrollTop + node.clientHeight === node.scrollHeight;
  }
  componentDidUpdate() {
    // var el = this.refs.wrap;
    // console.log('el', el.scrollTop, el.offsetHeight, el.scrollHeight);
    // el.scrollTop = el.scrollHeight;

    console.log(this.refs);
    if (this.shouldScrollBottom) {
      var node = this.refs.wrap;
      node.scrollTop = node.scrollHeight
    }
  }

  render() {
    return (
      <div className="App" style={{ paddingTop: 20}}>
        <Header as='h3' attached>Chat Nurro</Header>

        <button
          style={{ position: 'absolute', marginTop: 10, right: 10 }}
          onClick={this.handleTimeDisplay}
        >
        {!this.state.displayTime ? 'See Times' : 'Hide Times'}
        </button>

        <Popup
          on='hover'
          trigger={<Image avatar src={this.state.neil} size='mini' />}
          content={<Image src={this.state.neil} size='small'/>}
        />
        <Popup
          on='hover'
          trigger={<Image avatar src={this.state.mikeTyson} size='mini' />}
          content={<Image src={this.state.mikeTyson} size='small'/>}
        />
        <Popup
          on='hover'
          trigger={<Image avatar src={this.state.obi} size='mini' />}
          content={<Image src={this.state.obi} size='small'/>}
        />
        <Popup
          on='hover'
          trigger={<Image avatar src={this.state.chuck} size='mini' />}
          content={<Image src={this.state.chuck} size='small'/>}
        />
        <Popup
          on='hover'
          trigger={<Image avatar src={this.state.user} size='mini' />}
          content={<Image src={this.state.user} size='small'/>}
        />

      {<div id='btn-container' style={{ marginBottom: 16 }}>
          {/*this.state.showInitBtn &&
            <button onClick={() => this.fetchMessage() }>see quotes</button>*/}
        </div>}

        <div style={{ overflowY: 'scroll', height: 400, border: '1px solid black' }} ref='wrap'>
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
        {
          this.state.quotes.size < 48
          &&
          this.state.quotes.size > 0
          &&
          <button style={{ marginBottom: 16 }}
            disabled={this.state.quotes.size > 48}
            onClick={this.next}>
            next</button>
        }

        <form onSubmit={this.addToChatBox} style={{ margin: 30 }}>
          {<input value={this.state.textVal} onChange={this.handleInputText}/>}
          {/*<TextArea
            placeholder='Try adding multiple lines'
            value={this.state.textVal} onChange={this.handleInputText}
          />*/}
          <button disabled={this.state.textVal.length === 0}>Send</button>
        </form>

        {
          this.state.noMessage && <Message warning>No New Messages Please Try Again In One Moment</Message>
        }
        {
          this.state.quotes.size > 48
          &&
          <button style={{ marginBottom: 16 }} onClick={this.getNewMessages}>next</button>
        }

      </div>
    );
  }
}

export default App;
