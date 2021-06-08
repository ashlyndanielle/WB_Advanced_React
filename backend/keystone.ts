import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import 'dotenv/config';

// schemas
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30, // how long they should stay signed in
    secret: process.env.COOKIE_SECRET
}

const { withAuth } = createAuth({
    listKey: 'User', // which schema is responsible for being the user
    identityField: 'email', // which field in User is going to be used to identify
    secretField: 'password',
    initFirstItem: { // prevents the "chicken & egg" auth issue
        fields: ['name', 'email', 'password'],
        // TODO: add in initial roles here
    }
})

export const context = {}

export default withAuth(
    config({
        server: {
            cors: {
                origin: [process.env.FRONTEND_URL],
                credentials: true
            }
        },
        db: {
            adapter: 'mongoose',
            url: databaseURL,
            onConnect: async (keystoneContext) => {
                console.log('___CONNECTED TO THE DATABASE___');
                if (process.argv.includes('--seed-data')) {
                    await insertSeedData(keystoneContext);
                }
            }
            // TODO: Add data seeding here
        },
        lists: createSchema({
            User,
            Product,
            ProductImage
        }),
        ui: {
            // show the keystone UI only for people who pass this test
            isAccessAllowed: ({ session }) => {
                console.log('____SESSION____');
                console.log(session);
                console.log('____SESSION____');
                return !!session?.data; // if this returns true, then the user is logged in
            }
        },
        session: withItemData(statelessSessions(sessionConfig), {
            // this is a GraphQL Query and gives us access to this information in the session
            User: `id name email`
        })
    })
);