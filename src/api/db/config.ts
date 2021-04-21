import { MongoMemoryServer } from 'mongodb-memory-server'

export interface ConnectionString {
    connectionString: string
}

export interface DbConfig {
    testing: () => Promise<ConnectionString>
    development: () => Promise<ConnectionString>,
    production: () => Promise<ConnectionString>

}

const config: DbConfig = {
    testing: async function devConnection(): Promise<ConnectionString> {
        const inMemoryServer = new MongoMemoryServer()
        const connection: ConnectionString = {
            connectionString: await inMemoryServer.getUri()
        }
        return connection
    },
    development: function devConnection(): Promise<ConnectionString> {
        const connection: ConnectionString = {
            connectionString: process.env.LOCAL_CONNECTION_STRING || ''
        }
        return Promise.resolve(connection)
    },
    production: function devConnection(): Promise<ConnectionString> {
        const connection: ConnectionString = {
            connectionString: process.env.CONNECTION_STRING || ''
        }
        return Promise.resolve(connection)
    },
}

export default config

/*
mongoose.connect('mongodb://localhost:27017/boki-n-anene-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: false
        })

        mongoose.connection.on('open', function () {
            console.log('connected')
        })
        */