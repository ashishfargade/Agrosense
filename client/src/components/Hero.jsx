export const Hero = () => {
    return (
        <div>
            <div className="w-full h-[80vh] top-[90px] bg-black">
                <img
                    className="absolute top=[10%] w-full h-[80%] object-cover opacity-60"
                    src=".\src\assets\images\image-6.jpg"
                    autoPlay
                    loop
                    muted
                />

                <div className="w-full h-[90%] flex flex-col justify-center items-center text-white px-4 text-center">
                    <div className="border-2 bg-white opacity-50 rounded-lg mt-6">
                        <h1 className="text-black placeholder-opacity-0 text-4xl font-bold">
                            Our AIM
                        </h1>
                        <p className="w-[150vh] text-2xl text-black">
                            🌾 Sustainable Agriculture: We're committed to
                            sustainable farming practices. Using Eco-Invest
                            promotes soil health and reduces environmental
                            impact.
                        </p>
                    </div>
                    <div className="border-2 bg-white opacity-50 rounded-lg my-10">
                        <h1 className="text-black placeholder-opacity-0 text-4xl font-bold">
                            What's in it for you?
                        </h1>
                        <p className="w-[150vh] text-2xl text-black">
                            📈 Maximize Profits: Increase your farm's
                            productivity and profitability. Our recommendations
                            are designed to maximize your yields and minimize
                            risks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
