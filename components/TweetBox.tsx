import React from 'react'
import { CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon } from '@heroicons/react/outline'
import { useState } from 'react'

function TweetBox() {

    const [input, setInput] = useState('')

    return (
        <div className='flex space-x-2 p-5'>
            <img 
                className='h-14 w-14 object-cover rounded-full mt-4'
                src="https://links.papareact.com/gll" 
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
                            <PhotographIcon className='h-5 2-5 cursor-pointer transition transform duration-150 ease-out hover:scale-150'/>
                            <SearchCircleIcon className='h-5 2-5'/>
                            <EmojiHappyIcon className='h-5 2-5'/>
                            <CalendarIcon className='h-5 2-5'/>
                            <LocationMarkerIcon className='h-5 2-5'/>
                        </div>

                        <button 
                            className='bg-twitter text-white px-5 py-2 font-bold rounded-full disabled:opacity-40'
                            disabled={!input}
                        >
                            Tweet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TweetBox
