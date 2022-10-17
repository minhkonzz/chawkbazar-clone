import { useState } from "react"
import './Auth.css'

const UserSaver = () => {

  const [ toggled, setToggled ] = useState(false)

  return (
    <div className="d-flex at-center" onClick={() => setToggled(!toggled)}>
      <div className={`toggle ${toggled ? 'toggled' : 'not-toggled'} circle-bd-r`}>
        <div style={{ 
          width: 16, 
          height: 16, 
          backgroundColor: 'white', 
          borderRadius: 30
        }}/>
      </div>
      <p className="user-saver-title">Remember me</p>
    </div>
  )
}

export default UserSaver