import React from "react";
import { Layout} from "antd";
import state from "../../utils/state";
import { useSnapshot } from "valtio";
import Items from "./Items";
import Cart from "./Cart";
import Orders from "./Orders";
import PaymentCards from "./PaymentCards";
import Header from "./Header";
import Footer from "./Footer";

const { Content } = Layout;

const Home = () => {
  const snap = useSnapshot(state);

  return (

    <Layout>
     <Header/>  
      <Content style={{ padding: "0 50px" }}>
        {snap.activeIndex === 0 && <Items />}
        {snap.activeIndex === 1 && <Cart />}
        {snap.activeIndex === 2 && <Orders />}
        {snap.activeIndex === 3 && <PaymentCards />}
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;
