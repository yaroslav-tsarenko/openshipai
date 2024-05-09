import React from 'react';
import "./LoadDetailsComponent.css";

const LoadDetailsComponent = () => {
    return (
        <div className="w-[1416px] bg-white max-w-full overflow-hidden flex flex-row items-start justify-start pt-0 px-0 pb-[0.2px] box-border leading-[normal] tracking-[normal]">
            <main className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.04)] rounded-8xl bg-white flex flex-col items-start justify-start pt-[15.1px] px-[51px] pb-[100px] box-border gap-[60.5px] max-w-full mq750:gap-[30px] mq750:pl-[25px] mq750:pr-[25px] mq750:box-border mq450:gap-[15px] mq450:pb-[42px] mq450:box-border mq1050:pt-5 mq1050:pb-[65px] mq1050:box-border">
                <div className="w-[1416px] h-[1111.8px] relative rounded-8xl bg-white hidden max-w-full" />
                <header className="flex flex-col items-start justify-start max-w-full text-left text-[32px] text-darkgray-300 font-prompt">
                    <div className="flex flex-row items-start justify-start gap-[27px] shrink-0 [debug_commit:1de1738]">
                        <div className="flex flex-col items-start justify-start pt-[27.4px] px-0 pb-0">
                            <img
                                className="w-[26px] h-[18px] relative object-contain z-[1]"
                                loading="lazy"
                                alt=""
                                src="/vector.svg"
                            />
                        </div>
                        <h1 className="m-0 relative text-inherit leading-[45.4px] font-bold font-inherit text-transparent !bg-clip-text [background:linear-gradient(90deg,_#012f79,_#0257df)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] whitespace-nowrap z-[1]">
                            Aston Martin DB 11
                        </h1>
                    </div>
                    <div className="flex flex-row items-start justify-start py-0 px-[53px] text-xl mq450:pl-5 mq450:pr-5 mq450:box-border">
                        <b className="relative shrink-0 [debug_commit:1de1738] z-[1]">
                            5673-5385-6525-8642
                        </b>
                    </div>
                </header>
                <section className="self-stretch flex flex-row items-start justify-end py-0 px-7 box-border max-w-full text-left text-base text-darkgray-300 font-prompt">
                    <div className="w-[1206px] flex flex-col items-start justify-start gap-[129.6px] max-w-full lg:gap-[65px] mq750:gap-[32px] mq450:gap-[16px]">
                        <div className="self-stretch flex flex-col items-end justify-start gap-[32.1px] max-w-full mq750:gap-[16px]">
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start [row-gap:20px] z-[1]">
                                <div className="h-[50.1px] flex-1 relative min-w-[182px] max-w-[184px] shrink-0 [debug_commit:1de1738] text-white">
                                    <img
                                        className="absolute top-[0px] left-[0px] w-full h-full"
                                        alt=""
                                        src="/rectangle-150.svg"
                                    />
                                    <b className="absolute top-[14.2px] left-[41px] inline-block w-[88px] h-[22.7px] min-w-[88px] z-[1]">
                                        Publication
                                    </b>
                                </div>
                                <div className="h-[50.1px] flex-1 relative min-w-[182px] max-w-[185px] shrink-0 [debug_commit:1de1738] z-[2] ml-[-15.4px]">
                                    <img
                                        className="absolute top-[0px] left-[0px] w-full h-full"
                                        alt=""
                                        src="/rectangle-151.svg"
                                    />
                                    <b className="absolute top-[14.2px] left-[61.1px] inline-block w-[50px] h-[22.7px] min-w-[50px] z-[1]">
                                        Active
                                    </b>
                                </div>
                                <div className="h-[50.1px] flex-1 relative min-w-[182px] max-w-[185px] shrink-0 [debug_commit:1de1738] z-[3] ml-[-15.4px]">
                                    <img
                                        className="absolute top-[0px] left-[0px] w-full h-full"
                                        alt=""
                                        src="/rectangle-152.svg"
                                    />
                                    <b className="absolute top-[16px] left-[62px] inline-block w-[61px] h-[22.7px] min-w-[61px] z-[1]">
                                        Booked
                                    </b>
                                </div>
                                <div className="h-[50.1px] flex-1 relative min-w-[182px] max-w-[185px] shrink-0 [debug_commit:1de1738] z-[4] ml-[-15.4px]">
                                    <img
                                        className="absolute top-[0px] left-[0px] w-full h-full"
                                        alt=""
                                        src="/rectangle-152.svg"
                                    />
                                    <b className="absolute top-[14.2px] left-[49px] inline-block w-[89px] h-6 min-w-[89px] z-[1]">
                                        Dispatched
                                    </b>
                                </div>
                                <div className="h-[50.1px] flex-1 relative min-w-[182px] max-w-[185px] shrink-0 [debug_commit:1de1738] z-[5] ml-[-15.4px]">
                                    <img
                                        className="absolute top-[0px] left-[0px] w-full h-full"
                                        alt=""
                                        src="/rectangle-152.svg"
                                    />
                                    <b className="absolute top-[14.2px] left-[51.9px] inline-block w-[81px] h-[22.7px] min-w-[81px] z-[1]">
                                        Picked Up
                                    </b>
                                </div>
                                <div className="h-[50.1px] flex-1 relative min-w-[182px] max-w-[185px] shrink-0 [debug_commit:1de1738] z-[6] ml-[-15.4px]">
                                    <img
                                        className="absolute top-[0px] left-[0px] w-full h-full"
                                        alt=""
                                        src="/rectangle-152.svg"
                                    />
                                    <b className="absolute top-[14.2px] left-[54.8px] inline-block w-[75px] h-[22.7px] min-w-[75px] z-[1]">
                                        Delivered
                                    </b>
                                </div>
                                <div className="h-[50.1px] flex-1 relative min-w-[182px] max-w-[185px] shrink-0 [debug_commit:1de1738] z-[7] ml-[-15.4px]">
                                    <img
                                        className="absolute top-[0px] left-[0px] w-full h-full"
                                        alt=""
                                        src="/rectangle-152.svg"
                                    />
                                    <b className="absolute top-[14.2px] left-[56.7px] inline-block w-[72px] h-[22.7px] min-w-[72px] z-[1]">
                                        Archived
                                    </b>
                                </div>
                            </div>
                            <div className="self-stretch flex flex-row items-start justify-start gap-[10px] max-w-full text-xs lg:flex-wrap">
                                <div className="flex-1 flex flex-col items-start justify-start pt-[4.8px] px-0 pb-0 box-border max-w-full mq750:min-w-full">
                                    <div className="self-stretch flex flex-col items-start justify-start gap-[87px] max-w-full mq450:gap-[22px] mq1050:gap-[43px]">
                                        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                                            <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px] mq750:flex-wrap">
                                                <div className="flex flex-col items-start justify-start gap-[4.9px]">
                                                    <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px">
                                                        <div className="flex flex-col items-start justify-start">
                                                            <b className="relative inline-block min-w-[49px] shrink-0 [debug_commit:1de1738] z-[1]">
                                                                LOAD ID
                                                            </b>
                                                            <b className="relative text-xl text-transparent !bg-clip-text [background:linear-gradient(90deg,_#013280,_#000a1a)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] shrink-0 [debug_commit:1de1738] z-[2] mq450:text-base">
                                                                5673-5385-6525-8642
                                                            </b>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-start justify-start">
                                                        <b className="relative inline-block min-w-[94px] shrink-0 [debug_commit:1de1738] z-[1]">
                                                            SHIPMENT TITLE
                                                        </b>
                                                        <h2 className="m-0 relative text-xl font-bold font-inherit text-transparent !bg-clip-text [background:linear-gradient(180deg,_#00255f,_#004dc5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[128px] shrink-0 [debug_commit:1de1738] z-[2] mq450:text-base">
                                                            Aston Martin
                                                        </h2>
                                                    </div>
                                                    <div className="flex flex-row items-start justify-start py-0 px-px">
                                                        <div className="flex flex-col items-start justify-start">
                                                            <b className="relative inline-block min-w-[65px] shrink-0 [debug_commit:1de1738] z-[1]">
                                                                CUSTOMER
                                                            </b>
                                                            <h2 className="m-0 relative text-xl font-bold font-inherit text-transparent !bg-clip-text [background:linear-gradient(180deg,_#00255f,_#004dc5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[46px] shrink-0 [debug_commit:1de1738] z-[2] mq450:text-base">
                                                                John
                                                            </h2>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-start justify-start">
                                                        <b className="relative inline-block min-w-[61px] shrink-0 [debug_commit:1de1738] z-[1]">
                                                            DURATION
                                                        </b>
                                                        <b className="relative text-xl inline-block text-transparent !bg-clip-text [background:linear-gradient(180deg,_#00255f,_#004dc5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] min-w-[71px] shrink-0 [debug_commit:1de1738] z-[2] mq450:text-base">
                                                            239 mil
                                                        </b>
                                                    </div>
                                                    <div className="flex flex-row items-start justify-start py-0 px-px">
                                                        <b className="relative inline-block min-w-[53px] z-[1]">
                                                            AMOUNT
                                                        </b>
                                                    </div>
                                                </div>
                                                <div className="w-[325px] rounded-4xs bg-gainsboro box-border flex flex-row items-start justify-center pt-[89px] pb-[94px] pr-5 pl-[21px] max-w-full z-[1] text-3xs text-gray-100 border-[1px] border-solid border-whitesmoke-200">
                                                    <div className="h-[208.9px] w-[325px] relative rounded-4xs bg-gainsboro box-border hidden max-w-full border-[1px] border-solid border-whitesmoke-200" />
                                                    <b className="relative leading-[24px] inline-block min-w-[38px] z-[1]">
                                                        Image 1
                                                    </b>
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-px box-border max-w-full shrink-0 text-xl text-darkgray-100">
                                                <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-[20px] mq1050:flex-wrap">
                                                    <div className="w-[383px] flex flex-col items-start justify-start gap-[22.7px] min-w-[383px] max-w-full mq750:min-w-full mq1050:flex-1">
                                                        <b className="relative inline-block text-transparent !bg-clip-text [background:linear-gradient(180deg,_#00255f,_#004dc5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] min-w-[8px] shrink-0 [debug_commit:1de1738] z-[2] mq450:text-base">
                                                            1
                                                        </b>
                                                        <div className="self-stretch flex flex-row items-start justify-start gap-[11px] shrink-0 [debug_commit:1de1738] max-w-full text-lg mq450:flex-wrap">
                                                            <div className="h-[103.1px] flex flex-col items-start justify-start pt-[3.8px] px-0 pb-0 box-border">
                                                                <img
                                                                    className="w-8 flex-1 relative max-h-full overflow-hidden z-[1]"
                                                                    loading="lazy"
                                                                    alt=""
                                                                    src="/group-83-1.svg"
                                                                />
                                                            </div>
                                                            <div className="flex-1 flex flex-col items-start justify-start gap-[28.4px] min-w-[221px] max-w-full">
                                                                <div className="flex flex-col items-start justify-start">
                                                                    <h3 className="m-0 relative text-inherit leading-[25.5px] font-bold font-inherit text-transparent !bg-clip-text [background:linear-gradient(90deg,_#001f50,_#0047b6)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1]">
                                                                        New York, USA
                                                                    </h3>
                                                                    <div className="relative text-xs font-semibold inline-block min-w-[92px] whitespace-nowrap z-[1] mt-[-4.7px]">
                                                                        4 March - 13:00
                                                                    </div>
                                                                </div>
                                                                <div className="self-stretch flex flex-col items-start justify-start">
                                                                    <h3 className="m-0 relative text-inherit leading-[25.5px] font-bold font-inherit text-transparent !bg-clip-text [background:linear-gradient(90deg,_#001f50,_#0047b6)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1]">
                                                                        Washington, District of Columbia, USA
                                                                    </h3>
                                                                    <div className="flex flex-row items-start justify-start py-0 px-0.5 text-xs">
                                                                        <div className="relative font-semibold inline-block min-w-[88px] whitespace-nowrap z-[1]">
                                                                            4 March - 17:10
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-[331px] flex flex-col items-start justify-end pt-0 px-0 pb-[8.4px] box-border min-w-[331px] max-w-full text-3xs text-gray-100 mq1050:flex-1">
                                                        <div className="self-stretch flex flex-row items-start justify-start gap-[0.1px] mq450:flex-wrap">
                                                            <div className="flex flex-col items-start justify-start pt-[1.3px] px-0 pb-0">
                                                                <div className="w-[17.9px] h-[50.7px] relative rounded-10xs bg-whitesmoke-200 z-[1]">
                                                                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-10xs bg-whitesmoke-200 hidden" />
                                                                    <img
                                                                        className="absolute h-[18.34%] w-[26.82%] top-[40.83%] right-[32.96%] bottom-[40.83%] left-[40.22%] max-w-full overflow-hidden max-h-full object-contain z-[1]"
                                                                        alt=""
                                                                        src="/vector-1.svg"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 flex flex-row items-end justify-start gap-[4.8px] min-w-[203px] mq450:flex-wrap">
                                                                <div className="flex flex-col items-start justify-start gap-[38.7px] min-w-[96.69999999999708px] mq450:flex-1">
                                                                    <div className="flex flex-row items-start justify-start py-0 pr-0 pl-[4.7px]">
                                                                        <div className="rounded-4xs bg-gainsboro flex flex-row items-start justify-start py-[13px] pr-[26.7px] pl-[27.3px] shrink-0 [debug_commit:1de1738] whitespace-nowrap z-[1] border-[1px] border-solid border-whitesmoke-200">
                                                                            <div className="h-[51.9px] w-[92px] relative rounded-4xs bg-gainsboro box-border hidden border-[1px] border-solid border-whitesmoke-200" />
                                                                            <b className="relative leading-[24px] inline-block min-w-[38px] z-[1]">
                                                                                Image 1
                                                                            </b>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col items-start justify-start gap-[0.1px] shrink-0 [debug_commit:1de1738] text-xs text-darkgray-300">
                                                                        <b className="relative inline-block min-w-[85px] shrink-0 [debug_commit:1de1738] z-[1]">
                                                                            VEHICLE RUNS
                                                                        </b>
                                                                        <h2 className="m-0 relative text-xl font-bold font-inherit text-transparent !bg-clip-text [background:linear-gradient(180deg,_#00255f,_#004dc5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[35px] shrink-0 [debug_commit:1de1738] z-[1] mq450:text-base">
                                                                            Yes
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1 flex flex-row items-start justify-start gap-[0.1px] min-w-[137px]">
                                                                    <div className="flex-1 flex flex-col items-end justify-start gap-[39.8px]">
                                                                        <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[4.7px] pl-0">
                                                                            <div className="flex-1 flex flex-row items-start justify-start gap-[4.8px]">
                                                                                <div className="flex-1 rounded-4xs bg-gainsboro flex flex-row items-start justify-start pt-[15px] px-[25.5px] pb-3 whitespace-nowrap z-[1] border-[1px] border-solid border-whitesmoke-200">
                                                                                    <div className="h-[51.9px] w-[92px] relative rounded-4xs bg-gainsboro box-border hidden border-[1px] border-solid border-whitesmoke-200" />
                                                                                    <b className="relative leading-[24px] inline-block min-w-[40px] z-[1]">
                                                                                        Image 2
                                                                                    </b>
                                                                                </div>
                                                                                <div className="flex-1 rounded-4xs bg-gainsboro flex flex-row items-start justify-start pt-[15px] px-[25.7px] pb-3 whitespace-nowrap z-[1] border-[1px] border-solid border-whitesmoke-200">
                                                                                    <div className="h-[51.9px] w-[92px] relative rounded-4xs bg-gainsboro box-border hidden border-[1px] border-solid border-whitesmoke-200" />
                                                                                    <b className="relative leading-[24px] inline-block min-w-[39px] z-[1]">
                                                                                        Image 3
                                                                                    </b>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="w-[174px] flex flex-row items-start justify-between gap-[20px] text-xs text-darkgray-300">
                                                                            <div className="flex flex-col items-start justify-start gap-[0.1px]">
                                                                                <b className="relative inline-block min-w-[81px] shrink-0 [debug_commit:1de1738] z-[1]">
                                                                                    CONVERTIBLE
                                                                                </b>
                                                                                <h2 className="m-0 relative text-xl font-bold font-inherit text-transparent !bg-clip-text [background:linear-gradient(180deg,_#00255f,_#004dc5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[35px] shrink-0 [debug_commit:1de1738] z-[1] mq450:text-base">
                                                                                    Yes
                                                                                </h2>
                                                                            </div>
                                                                            <div className="flex flex-col items-start justify-start gap-[0.1px]">
                                                                                <b className="relative inline-block min-w-[57px] shrink-0 [debug_commit:1de1738] z-[1]">
                                                                                    MODIFIED
                                                                                </b>
                                                                                <h2 className="m-0 relative text-xl font-bold font-inherit text-transparent !bg-clip-text [background:linear-gradient(180deg,_#00255f,_#004dc5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[35px] shrink-0 [debug_commit:1de1738] z-[1] mq450:text-base">
                                                                                    Yes
                                                                                </h2>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col items-start justify-start pt-[1.3px] px-0 pb-0">
                                                                        <div className="w-[17.9px] h-[50.7px] relative rounded-10xs bg-whitesmoke-200 z-[1]">
                                                                            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-10xs bg-whitesmoke-200 hidden" />
                                                                            <img
                                                                                className="absolute h-[18.34%] w-[26.82%] top-[40.83%] right-[33.52%] bottom-[40.83%] left-[39.66%] max-w-full overflow-hidden max-h-full object-contain z-[1]"
                                                                                alt=""
                                                                                src="/vector-2.svg"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-[811px] flex flex-row items-start justify-start py-0 px-px box-border max-w-full text-center text-xl text-white">
                                            <div className="flex-1 flex flex-col items-end justify-start gap-[8.8px] max-w-full">
                                                <div className="self-stretch flex flex-row items-start justify-between shrink-0 [debug_commit:1de1738] max-w-full gap-[20px] mq750:flex-wrap">
                                                    <div className="w-[129px] flex flex-col items-start justify-start pt-[3.3px] px-0 pb-0 box-border">
                                                        <div className="self-stretch rounded-6xs bg-forestgreen flex flex-row items-start justify-start pt-1.5 px-[45px] pb-[5px] z-[1]">
                                                            <div className="h-[41px] w-[129px] relative rounded-6xs bg-forestgreen hidden" />
                                                            <b className="relative inline-block min-w-[33px] z-[1] mq450:text-base">
                                                                Bid
                                                            </b>
                                                        </div>
                                                    </div>
                                                    <div className="w-[451px] rounded-3xs bg-whitesmoke-100 box-border flex flex-row items-start justify-start pt-5 px-4 pb-[21px] whitespace-nowrap max-w-full z-[1] text-left text-sm text-silver border-[1px] border-solid border-darkgray-200">
                                                        <div className="h-[78.5px] w-[451px] relative rounded-3xs bg-whitesmoke-100 box-border hidden max-w-full border-[1px] border-solid border-darkgray-200" />
                                                        <b className="h-[34.3px] relative inline-block z-[2]">
                                                            Type a short descriptive message for shipper....
                                                        </b>
                                                    </div>
                                                </div>
                                                <div className="w-[761px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-left text-sm text-silver">
                                                    <div className="w-[141px] rounded-3xs bg-whitesmoke-100 box-border flex flex-row items-start justify-start pt-[11px] px-3.5 pb-3 shrink-0 [debug_commit:1de1738] whitespace-nowrap z-[1] border-[1px] border-solid border-darkgray-200">
                                                        <div className="h-[45.4px] w-[141px] relative rounded-3xs bg-whitesmoke-100 box-border hidden border-[1px] border-solid border-darkgray-200" />
                                                        <b className="relative inline-block min-w-[92px] z-[2]">
                                                            Delivery time
                                                        </b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[393.3px] w-[324px] flex flex-col items-end justify-start gap-[41.7px] min-w-[324px] max-w-full lg:flex-1 mq450:gap-[21px]">
                                    <img
                                        className="self-stretch flex-1 relative rounded-3xs max-w-full overflow-hidden max-h-full object-cover shrink-0 [debug_commit:1de1738] z-[1]"
                                        loading="lazy"
                                        alt=""
                                        src="/image-52@2x.png"
                                    />
                                    <div className="flex flex-row items-start justify-end py-0 px-2.5">
                                        <div className="flex flex-col items-start justify-start gap-[6.6px] shrink-0 [debug_commit:1de1738]">
                                            <b className="relative inline-block min-w-[89px] z-[1]">
                                                QOUTE BUDJET
                                            </b>
                                            <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px">
                                                <div className="rounded-8xs bg-gray-200 flex flex-row items-start justify-start py-[9px] pr-[15px] pl-5 z-[1] border-[1px] border-solid border-gainsboro">
                                                    <b className="relative inline-block min-w-[82px]">
                                                        Submit Qoute
                                                    </b>
                                                    <div className="h-[37.8px] w-[117px] relative rounded-8xs bg-gray-200 box-border hidden border-[1px] border-solid border-gainsboro" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[878px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-center text-xl text-white">
                            <div className="w-[156px] rounded-6xs bg-forestgreen flex flex-row items-start justify-start py-[9px] px-[22px] box-border whitespace-nowrap z-[1]">
                                <div className="h-12 w-[156px] relative rounded-6xs bg-forestgreen hidden" />
                                <b className="relative inline-block min-w-[107px] z-[1]">
                                    Submit Bid
                                </b>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LoadDetailsComponent;
