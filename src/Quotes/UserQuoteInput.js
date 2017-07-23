import React, {PureComponent} from 'react';

export default class UserQuoteInput extends PureComponent {
  render = () => {
    return (
      <div>
        <input type='text' />
        <button>Send</button>
      </div>
    );
  }
}
