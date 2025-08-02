import { Avatar } from "@mantine/core";
import { work } from "../Data/Data";
const Working = () => {

    return (
        <div className="w-full bg-mine-shaft-950 py-16">
            <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl mb-6 text-center font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400">
                How it<span> Works</span>
            </div>
            <div className="text-lg mb-12 sm-mx:text-base xs-mx:text-sm mx-auto text-mine-shaft-300 text-center w-1/2 sm-mx:w-11/12 ">
                Effortlessly navigate through the process and land your dream job.
            </div>
            <div className="flex flex-col lg:flex-row gap-10 px-8 lg:px-16 xs-mx:px-2 justify-between items-center">
                <div className="flex-shrink-0 relative">
                    <img src="/Working/Girl.png" alt="girl" className="w-[20rem] lg:w-[30rem] mx-auto" />
                    <div className="w-36 xs-mx:w-24 flex top-[15%] right-0 lg-mx:-right-10 xs-mx:right-0 absolute flex-col items-center gap-1 border border-bright-sun-400 rounded-xl py-3 px-1 backdrop-blur-md">
                    <Avatar className="!h-16 !w-16" src="avatar-7.png" alt="it's me" />
                    <div className="text-sm xs-mx:text-xs font-semibold text-mine-shaft-200 text-center">
                        Complete Your Profile
                    </div>
                    <div className="text-xs text-mine-shaft-300">
                        70% Complete
                    </div>

                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {
                        work.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center p-2  rounded-lg">
                                <div className="flex items-center shrink-0 justify-center p-2 bg-bright-sun-300 rounded-full">
                                    <img
                                        src={`/Working/${item.name}.png`}
                                        alt={item.name}
                                        className="h-16 w-16 sm-mx:h-12 sm-mx:w-12 xs-mx:h-9 xs-mx:w-9 p-2 sm-mx:p-1"
                                    />
                                </div>
                                <div>
                                    <div className="text-mine-shaft-100 text-xl md-mx:text-lg sm-mx:text-base font-semibold">{item.name}</div>
                                    <div className="text-mine-shaft-300 text-sm xs-mx:text-xs mt-2">{item.desc}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Working;
