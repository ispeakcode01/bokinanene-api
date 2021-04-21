import server from './server'
import config from './api/db/config'
import db from './api/db'

if (process.env.NODE_ENV === 'development') {
    db(config.development)
}

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})
