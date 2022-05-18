import React from 'react'
import { CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon } from '@heroicons/react/outline'
import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { MouseEvent } from 'react'
import { Tweet, TweetBody } from '../typings'
import { SetStateAction } from 'react'
import { Dispatch } from 'react'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
    const [input, setInput] = useState('')
    const [image, setImage] = useState('')

    const imageInputRef = useRef<HTMLInputElement>(null)

    const { data: session } = useSession()
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        if (!imageInputRef.current?.value) return

        setImage(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setImageUrlBoxIsOpen(false)
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST'
        })

        const json = await result.json()

        const newTweets = await fetchTweets()
        setTweets(newTweets)

        toast('Tweet Posted', {
            icon: '🚀'
        })

        return json
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        postTweet()

        setInput('')
        setImage('')
        setImageUrlBoxIsOpen(false)
    }

    return (
        <div className='flex space-x-2 p-5'>
            <img 
                className='h-14 w-14 object-cover rounded-full mt-4'
                src={session?.user?.image || "https://links.papareact.com/gll"} 
                alt="" 
            />

            <div className='flex flex-1 items-center pl-2'>
                <form className='flex flex-1 flex-col'>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='h-24 w-full text-xl outline-none placeholder:text-xl' type="text" 
                        placeholder="What's happening?" 
                    />
                    <div className='flex items-center'>
                        <div className='flex space-x-2 text-twitter flex-1'>
                            <PhotographIcon 
                                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                                className='h-5 2-5 cursor-pointer transition transform duration-150 ease-out hover:scale-150'
                            />
                            <SearchCircleIcon className='h-5 2-5'/>
                            <EmojiHappyIcon className='h-5 2-5'/>
                            <CalendarIcon className='h-5 2-5'/>
                            <LocationMarkerIcon className='h-5 2-5'/>
                        </div>

                        <button 
                            onClick={handleSubmit}
                            className='bg-twitter text-white px-5 py-2 font-bold rounded-full disabled:opacity-40'
                            disabled={!input || !session}
                        >
                            Tweet
                        </button>
                    </div>

                    {imageUrlBoxIsOpen && (
                        <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                            <input 
                                ref={imageInputRef}
                                className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white'
                                type="text" 
                                placeholder='Enter image URL...'
                            />
                            <button 
                                type='submit'
                                onClick={addImageToTweet}
                                className='font-bold text-white'>Add Image
                            </button>
                        </form>
                    )}

                    {image && (
                        <img className='mt-10 h-full w-full rounded-xl object-contain shadow-lg' src={image} alt="" />
                    )}
                </form>
            </div>
        </div>
    )
}

export default TweetBox
