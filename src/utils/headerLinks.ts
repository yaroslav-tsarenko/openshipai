import { BsTruck } from "react-icons/bs";
import { RiOpenArmFill } from "react-icons/ri";
import { RiRobot2Line } from "react-icons/ri";
import { AiOutlineSafety } from "react-icons/ai";
import { FaRegHandshake } from "react-icons/fa6";
import { TbNews } from "react-icons/tb";
import { IoInformationCircleOutline } from "react-icons/io5";
export const headerLinks = [
    {
        name: 'Open',
        link: '/open-page',
        icon: RiOpenArmFill,
    },
    {
        name: 'Ship',
        link: '/ship-page',
        icon: BsTruck,
    },
    {
        name: 'AI',
        link: '/ai-page',
        icon: RiRobot2Line,
    },
    {
        name: 'Safety',
        link: '/safety-page',
        icon: AiOutlineSafety,
    },
    {
        name: 'Partners',
        link: '/partners-page',
        icon: FaRegHandshake,
    },
    {
        name: 'Blog',
        link: '/blog-page',
        icon: TbNews,
    },
    {
        name: 'About',
        link: '/about-page',
        icon: IoInformationCircleOutline,
    },
];