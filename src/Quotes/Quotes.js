import React, { PureComponent } from 'react';
import {Popup, Image} from 'semantic-ui-react';
import LoadingSpinner from './LoadingSpinner';

export default class Quotes extends PureComponent {
  getBase64 = (personName) => {
    console.log(personName);
    const { obi, mikeTyson, chuck, user, neil } = this.props;
    const nameArr = ['Chuck Norris', 'Luke Skywalker', 'Neil deGrasse Tyson', 'Obi-Wan Kenobi',
    'Mike Tyson', 'Thai', 'Bob Marley', 'Yoda', 'Darth Vader', 'Han Solo', 'Princess Leia Organa',
    'C-3PO', 'Darth Sidious' ];
    let result;
    if (personName === nameArr[0]) result = chuck;
    else if (personName === nameArr[1]) result = user;
    else if (personName === nameArr[2]) result = neil;
    else if (personName === nameArr[3]) result = obi;
    else if (personName === nameArr[4]) result = mikeTyson;
    else result = user;
    return result;
  }

  render() {
    const { quote, dispTime } = this.props;
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: 10 }}>
        <Popup
          on='hover'
          trigger={
            <div>
              <Image avatar src={this.getBase64(quote.get('personName'))} size='mini' />
            </div>
          }
          content={<Image src={this.getBase64(quote.get('personName'))} size='small'/>}
        />
        <label style={{ fontWeight: 600 }}>{quote.get('personName')}: </label>
        <span>{quote.get('chatMessage')}</span>
        <div style={{ fontWeight: 600 }}>{dispTime && `[${quote.get('dateCreated')}]`}</div>
      </div>
    );
  }
}
