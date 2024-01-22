import React from 'react'

const Message = () => {
    return (
        <div className='h-full w-full'>

            <div className='flex justify-center'>
                <div className='flex justify-center bg-slate-300 h-[500px] w-[800px] border-2 border-gray-950 m-6'>
                    hello
                </div>
            </div>

            <div className='flex justify-center'>
                <div>
                    <input type="text" placeholder='message' className='border py-2 px-6 m-2' />
                    <button className='bg-blue-500 rounded px-4 py-2  m-2 text-slate-50'> Send </button>
                </div>
            </div>
            <div className='flex justify-center'>
                <div>
                    <input type="text" placeholder='room id' className='border py-2 px-6 m-2' />
                    <button className='bg-blue-500 rounded px-4 py-2  m-2 text-slate-50'> join </button>

                </div>
            </div>
        </div>
    )
}

export default Message