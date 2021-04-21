import { connect, connection } from 'mongoose'
import { ConnectionString } from './config'

function dbConnect(func: () => Promise<ConnectionString>, log = console.log, err = console.error) {
    func().then(data => {
        connect(data.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        connection.on('error', (error) => {
            err('Error connecting to the db')
        })
        connection.once('open', function () {
            log('Connected successfully')
        })
    })
}


export default dbConnect