import { useState } from "react";
import { NftCard, NftDesign } from "./icons/NftDesign";
import { ActiveEvents } from "../components-functional/ActiveEvents";
import { MintedCollection } from "../components-functional/MintedCollections";
const DashboardMenu = () => {
  const [open, setOpen] = useState(true);
  const [menuVisible, setmenuVisible] = useState("Active")
  const renderComponent = () =>{
    if (menuVisible == "Active") {
      // <ActiveEvents/>
      return(

       <ActiveEvents/>
        )
    }
  else if (menuVisible == "Minited Collection") {
    return(

      <MintedCollection/>
    )
    

  }
  else if (menuVisible == "Dashboard") {
    return(
    <div className="text-white">
      Dashboard
      </div>
    )
  }
  
  }
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Minited Collection", src: "Chat" },
    { title: "Active", src: "User", gap: true },
    { title: "Pause ", src: "Calendar" },
    { title: "Shortlist", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/logo.svg"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
         
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (


            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`/${Menu.src}.png`} />

              <button onClick={()=>{
                setmenuVisible(Menu.title)
                console.log(Menu.title)
              }}>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">


        {renderComponent()}
      

        {/* // menuVisible == "Active" ?<ActiveEvents/>  : <div className="text-white">Dashboard</div>   */}




          
        
        
      </div>
    </div>
  );
};
export default DashboardMenu;
