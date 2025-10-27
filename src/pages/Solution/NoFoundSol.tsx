import notfound from '../../assets/nofound.png'
const NoFoundSol = () => {
    return (
        <>

            <div className='flex justify-center'>
                <img src={notfound} alt="" />

            </div>

            <div>
                <h1 className='text-2xl font-bold text-center'>No Solution Found</h1>
            </div>
        </>
    )
}

export default NoFoundSol