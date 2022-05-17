import { RefreshIcon } from '@heroicons/react/outline'
import React from 'react'
import TweetBox from './TweetBox'
import TweetComponent from '../components/Tweet'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { useState } from 'react'

interface Props {
    tweets: Tweet[]
}

function Feed({ tweets: tweetsProp }: Props) {

    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)

    const handleRefresh = async () => {
        const tweets = await fetchTweets()
        setTweets(tweets)
    }

    return (
        <div className='col-span-7 lg:col-span-5 border-x'>
            <div className='flex items-center justify-between'>
                <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
                <RefreshIcon 
                    onClick={handleRefresh}
                    className='h-8 w-8 cursor-pointer text-twitter mt-5 mr-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125' 
                />
            </div>

            {/* tweetbox */}
            <div>
                <TweetBox />
            </div>

            {/* feed */}

            <div>
                {tweets.map(tweet => (
                    <TweetComponent 
                        key={tweet._id}
                        tweet={tweet}
                    />
                ))}
            </div>
        </div>
    )
}

export default Feed
