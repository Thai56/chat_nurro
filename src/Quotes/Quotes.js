import React, { PureComponent } from 'react';
import { Popup, Image } from 'semantic-ui-react';
import images from '../images';

const { neil, tyson, obi, chuck, placeholder, bob, vader, lea, sid, han, yoda, c3, luke } = images;

const flexWrap = { display: 'flex', flexWrap: 'wrap', margin: 10 };

const bold = { fontWeight: 600, marginRight: 6, paddingTop: 8 };

export default class Quotes extends PureComponent {
  getPersonImg = (personName) => {
    const nameArr = ['Chuck Norris', 'Luke Skywalker', 'Neil deGrasse Tyson', 'Obi-Wan Kenobi',
    'Mike Tyson', 'Brian', 'Bob Marley', 'Yoda', 'Darth Vader', 'Han Solo', 'Princess Leia Organa',
    'C-3PO', 'Darth Sidious'];
    let result;
    if (personName === nameArr[0]) result = chuck;
    else if (personName === nameArr[1]) result = luke;
    else if (personName === nameArr[2]) result = neil;
    else if (personName === nameArr[3]) result = obi;
    else if (personName === nameArr[4]) result = tyson;
    else if (personName === nameArr[5]) result = placeholder;
    else if (personName === nameArr[6]) result = bob;
    else if (personName === nameArr[7]) result = yoda;
    else if (personName === nameArr[8]) result = vader;
    else if (personName === nameArr[9]) result = han;
    else if (personName === nameArr[10]) result = lea;
    else if (personName === nameArr[11]) result = c3;
    else if (personName === nameArr[11]) result = sid;
    else result = placeholder;
    return result;
  }

  render() {
    const { props: { quote, dispTime }, getPersonImg } = this;

    const personName = quote.get('personName');

    return (
      <div style={flexWrap}>
        <Popup
          on='hover'
          trigger={
            <div>
              <Image avatar src={getPersonImg(personName)} size='mini' />
            </div>
          }
          content={<Image src={getPersonImg(personName)} size='small'/>}
        />

        <label style={bold}>{quote.get('personName')}: </label>
        { dispTime && <div style={bold}>{`[${quote.get('dateCreated')}] - `}</div> }
        <span style={{ paddingTop: 8 }}>{quote.get('chatMessage')}</span>
      </div>
    );
  }
}
