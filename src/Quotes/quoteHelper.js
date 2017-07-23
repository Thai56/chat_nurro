import axios from 'axios';

const _ = {
  getMessageArchive: () => {
    console.log('firing');
    return axios.get('http://localhost:8887/messagesArchived').then(res => {
      console.log(res, 'res');
      return res.data;
    })
    .catch(err => console.log(err, 'err'));
  },

  getNewMessages: () => {
    return axios.get('http://localhost:8887/newMessages').then(res => {
      console.log(res, 'newMessages');
      return res.data;
    });
  }
};
export default _;
