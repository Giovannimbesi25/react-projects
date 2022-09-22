import "./header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faBed, faPlane, faTaxi, faCar, faMusic, faCalendar, faCalendarDays, faPerson, faSearch} from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import {useState} from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'

const Header = ({type}) => {

    const [show, setShow] = useState(false)

    const [openOptions, setOpenOptions] = useState(false);

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room:1
    })

    //prev è il vettore allo stato precedente
    const handleOption = (name, operation)=>{
        setOptions(prev=>{
            return{ ...prev,
                [name] : operation === "i" ? 
                options[name]+1 : options[name]-1 }})
    }

    const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
    ]);
  return (


    <div className="header">
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBed}/>
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane}/>
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar}/>
                    <span>Car Rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faMusic}/>
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi}/>
                    <span>Airport Taxis</span>
                </div>
            </div>
            {   
                type !== "list" &&
                <>


            <h1 className="headerTitle">Lorem ipsum dolor sit amet.</h1>
            <p className="headerDesc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, doloremque!</p>
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                    <input type="text" placeholder="Where are you going?"
                    className="headerSearchInput"/>
                </div>
                <div className="headerSearchItem dateContainer">
                    <FontAwesomeIcon onClick={()=> setShow(!show)} icon={faCalendarDays} className="headerIcon dateIcon"/>
                    <span onClick={()=>setShow(!show)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                    {
                        show && <DateRange
                        editableDateInputs={true}
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="dateUI"
                    />
                    }
                    
                </div>
                <div className="headerSearchItem">
                    <FontAwesomeIcon onClick={() =>setOpenOptions(!openOptions)}  icon={faPerson} className="headerIcon"/>
                    <span onClick={() =>setOpenOptions(!openOptions)} className="headerSerchText">{options.adult} adult · {options.children} children · {options.room} rooms  </span>
                    { openOptions && <div className="options">
                        <div className="optionItem">
                            <span  className="optionText">Adult</span>
                            <div className="counterItem">
                                <button  
                                disabled={options.adult <=1}
                                className="optionCounter" onClick={() =>handleOption("adult", "d")}>-</button>
                                <span className="optionCounterValue">{options.adult}</span>
                                <button className="optionCounter" onClick={() =>handleOption("adult", "i")}>+</button>
                            </div>
                            

                        </div>
                        <div className="optionItem">
                            <span className="optionText">Child</span>
                            <div className="counterItem">
                                <button 
                                disabled={options.children == 0 }
                                className="optionCounter" onClick={() =>handleOption("children", "d")}>-</button>
                                <span className="optionCounterValue">{options.children}</span>
                                <button className="optionCounter" onClick={() =>handleOption("children", "i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">Room</span>
                            <div className="counterItem">
                                <button 
                                disabled={options.room <= 1 }
                                className="optionCounter" onClick={() =>handleOption("room", "d")}>-</button>
                                <span className="optionCounterValue">{options.room}</span>
                                <button className="optionCounter" onClick={() =>handleOption("room", "i")}>+</button>
                            </div>
                        </div>
                    </div>}
                    
                
                </div>
                <FontAwesomeIcon icon={faSearch} className="searchIcon"/>
            
            </div>
            </>}
        </div>
    </div>
    
  )
}

export default Header