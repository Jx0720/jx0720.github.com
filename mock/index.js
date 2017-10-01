module.exports = {
  'POST:/apis/post/user': require('./data/user1.js'),
  'PUT:/apis/put/user': require('./data/user2.js'),
  'DELETE:/apis/delete/user': require('./data/user3.js'),
  '/apis/user': require('./data/user4.js')
}
