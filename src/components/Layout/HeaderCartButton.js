import React,{useContext,useEffect,useState} from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce(( curNumber, item)=>{
    return curNumber + item.amount;
  },0)
  const [btnHighLighted, setBtnHighLighted] = useState(false);
  const btnClass = `${classes.button} ${btnHighLighted ? classes.bump : ''}`
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnHighLighted(true);
    const timer = setTimeout(() => {
      setBtnHighLighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }; 
  }, [cartCtx.items]);
  return (
    <button className={btnClass} onClick={props.onClick}  >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
