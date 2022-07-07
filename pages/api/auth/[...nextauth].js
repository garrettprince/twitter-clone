import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        version: '2.0',
      }),
    ],
    secret: 'D3DtD16kMjo5/BQ1aqtZMg3KT7OLCLWwrqLEo5NPOGE=',
  })
