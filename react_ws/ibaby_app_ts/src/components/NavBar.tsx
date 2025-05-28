import { LiaBarsSolid } from "react-icons/lia";
import { SideBarData } from "./SideBarData";
import {Link} from "react-router-dom";
 
function SideBar({mobile, close, HandleToggle}:{mobile: boolean; close:boolean; HandleToggle: () => void}){

    return(
        <>
        <div className="container" id="bar">
            <div className="navbar">
                <div className="row">
                    <div className="col" id="butBar">
                        <button className={`button-close ${mobile? 'mobile':''}`} onClick={HandleToggle}>
                            <LiaBarsSolid />
                        </button>
                    </div>
                    <div className="col-8">
                        <div className="instructions">
                            <a>Please use the left side panel to access any of the functions available</a>
                        </div>
                    </div>   
                </div>
                
            </div>
        </div>
        
        
        <div className={`sidebar-menu ${close || mobile ? 'closed' : 'open'}`}>
            {SideBarData.map((item)=>{
                return(
                    <>
                    <ul className='but'>
                        <li  key="item">
                            <Link to={item.path}>
                            <button className="rounded-5">
                                {item.icon}
                                {item.title}
                            </button>
                            </Link>
                        </li>  
                    </ul>
                    </>
                )
            })
            }
        </div>
        
        </>
    )
}

export default SideBar