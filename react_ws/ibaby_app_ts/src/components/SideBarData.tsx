import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";


export const SideBarData=[
    {
        title: ' Monitor',
        path:'/MonitorView',
        icon: <MdIcons.MdMonitorHeart />
    },
    {
        title: 'Actuators',
        path:'/actuators',
        icon: <AiIcons.AiFillAlert />
    },
    {
        title: ' GPS',
        path:'/gps',
        icon: <TbIcons.TbGpsFilled  />
    },
    {
        title: ' Analitics',
        path:'/analitics',
        icon: <BsIcons.BsFillFileEarmarkBarGraphFill />
    }
    
]