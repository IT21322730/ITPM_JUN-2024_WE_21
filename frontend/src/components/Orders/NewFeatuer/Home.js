import React from 'react';
import { NavLink } from "react-router-dom"
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import Header from '../../Header';
import Footer from '../../Footer';


const Home = () => {

  return(
    <>
      <Header/>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '30px',
        width: '50px', // Adjust width as needed
        height: '80px', // Adjust height as needed
    }}>
        <NavLink to={`#`} className="btn btn-success" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MarkChatUnreadIcon />
          Chat
        </NavLink>
      </div>
      <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chan-walrus-958545.jpg&fm=jpg" alt="" height="100%" width="100%" />

      <Footer/>
    </>
  )
};

export default Home;
