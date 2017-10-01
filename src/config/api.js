import Firebase from 'firebase/app'
import 'firebase/database'

function createAPI ({ config, version }) {
  Firebase.initializeApp(config)
  return Firebase.database().ref(version)
}

export default createAPI({
  version: '/v0',
  config: {
    databaseURL: 'https://hacker-news.firebaseio.com'
  }
})
