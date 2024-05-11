import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  activeIndex: 0,
  cart: [],
  adminActiveIndex: 0,
});

export default state;
