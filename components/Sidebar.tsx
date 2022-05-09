import React from 'react'
import { BellIcon, HashtagIcon, BookmarkIcon, CollectionIcon, DotsCircleHorizontalIcon, MailIcon, UserIcon, HomeIcon } from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
import Image from 'next/image'

function Sidebar() {
    return (
        <div className='col-span-2 flex flex-col items-center px-4 md:items-start'>

            <div className='m-3 h-10 w-10 relative flex items-center ' >
                <Image
                    src='https://links.papareact.com/drq'
                    layout='fill'
                    objectFit='contain'
                />
            </div>

            <SidebarRow Icon={HomeIcon} title='Home' />
            <SidebarRow Icon={HashtagIcon} title='Explore' />
            <SidebarRow Icon={BellIcon} title='Notifications' />
            <SidebarRow Icon={MailIcon} title='Messages' />
            <SidebarRow Icon={BookmarkIcon} title='Bookmarks' />
            <SidebarRow Icon={CollectionIcon} title='Lists' />
            <SidebarRow Icon={UserIcon} title='Sign In' />

            <SidebarRow Icon={DotsCircleHorizontalIcon} title='More' />

        </div>
    )
}

export default Sidebar
