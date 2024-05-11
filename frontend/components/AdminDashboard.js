import React from 'react';
import { Dashboard, ShoppingCart, LocalMall, Payment, Person, Restaurant, LocalShipping, Campaign } from '@mui/icons-material';
import { Link } from 'react-router-dom';
// import Logo from './path/to/logo'; // Import your logo image

const Sidebar = () => {
  return (
    <div style={{ width: '200px', backgroundColor: '#FFA500', color: 'black', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', height: '100vh' }}>
      {/* <img src={Logo} alt="Logo" style={{ marginBottom: '20px' }} /> */}
      <SidebarItem icon={<Dashboard fontSize="large" />} name="Dashboard" link="/admin/dashboard" />
      <SidebarItem icon={<ShoppingCart fontSize="large" />} name="Order" link="/admin/order" />
      <SidebarItem icon={<LocalMall fontSize="large" />} name="Items" link="/admin/items" />
      <SidebarItem icon={<Payment fontSize="large" />} name="Payment" link="/admin/payment" />
      <SidebarItem icon={<Person fontSize="large" />} name="User" link="/admin/user" />
      <SidebarItem icon={<Restaurant fontSize="large" />} name="Restaurant" link="/admin/restaurants/add" />
      <SidebarItem icon={<LocalShipping fontSize="large" />} name="Delivery" link="/admin/delivery" />
      <SidebarItem icon={<Campaign fontSize="large" />} name="Promotion" link="/admin/promotion" />
    </div>
  );
}

const SidebarItem = ({ icon, name, link }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
      {icon}
      <Link to={link} style={{ textDecoration: 'none', marginLeft: '30px', textAlign: 'left', marginBottom: '5px', color: 'black', fontSize: '16px', fontWeight: 'bold', marginRight: '15px' }}>{name}</Link>
    </div>
  );
}

export default Sidebar;
