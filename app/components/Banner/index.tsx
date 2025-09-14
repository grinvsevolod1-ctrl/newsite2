import Image from "next/image";

const Banner = () => {
    return (
        <div className='mx-auto max-w-7xl mt-4 mb-6 sm:py-6 px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

                {/* COLUMN-1 */}
                <div className="mx-auto sm:mx-0 flex flex-col justify-center">
                    <div className='py-2 text-center lg:text-start'>
                        <button className='text-blue bg-lightblue hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-black'>
                            NetNext
                        </button>
                    </div>
                    <div className="py-2 text-center lg:text-start">
                        <h1 className='text-4xl md:text-6xl font-bold text-darkpurple leading-tight'>
                            Мы создаём<br /> современные сайты<br /> и цифровые решения
                        </h1>
                        <p className='mt-4 text-lg text-gray-600'>
                            От идеи до запуска — мы превращаем ваши цели в работающие продукты
                        </p>
                    </div>
                    <div className='mt-6 text-center lg:text-start'>
                        <button className='text-sm md:text-xl font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue'>
                            Начать проект
                        </button>
                    </div>
                </div>

                {/* COLUMN-2 */}
                <div className='hidden lg:flex items-center justify-center'>
                    <Image
                        src="/images/banner/banner.svg"
                        alt="hero-image"
                        width={800}
                        height={642}
                        priority
                    />
                </div>

            </div>
        </div>
    )
}

export default Banner;
