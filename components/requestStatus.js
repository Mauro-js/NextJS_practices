const Loading = () => {
    return  <div className='flex justify-center items-center h-screen'>
                <div className='relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r shadow-2xl from-indigo-600 via-indigo-600 to-gray-100'>
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-100 rounded-full'>              
                    </div>
                </div>
            </div>
}

const Slow = () => {
    return <div className="flex-col flex justify-center items-center h-screen">
                        <img src="/noWifi.svg" className="w-1/6"/>
                        <div className="text-center mb-12">
                            <h5 className="text-base md:text-lg text-indigo-700 mb-1">Slow Conection</h5>
                        </div>
                    </div>
}

const Error = () => {
    return <div className="flex-col flex justify-center items-center h-screen">
                        <img src="/error.svg" className="w-1/6"/>
                        <div className="text-center mb-12">
                            <h5 className="text-base md:text-lg text-indigo-700 mb-1">An error has occurredon</h5>
                        </div>
                    </div>
}



export {Loading, Slow, Error}