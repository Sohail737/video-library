import styles from "./Toast.module.css";
import { useEffect } from "react";
import {useToast} from "../../context"

export const Toast = ({ message,type,duration }) => {
    const {showToast,dispatchToast}=useToast();
    useEffect(()=>{
        const toastDuration=setTimeout(()=>dispatchToast({type:"TOGGLE_TOAST",payload:false}),duration)

        return ()=>clearTimeout(toastDuration)
    },[showToast])
    

  return (
    <div className={showToast?styles.ToastVisible:styles.toastHidden}>
      <div className={type === "success" ? styles.toastPosition+" toast success" : styles.toastPosition+" toast error"}>
        <p className="toast-text">{message}</p>

        <svg
        onClick={()=>dispatchToast({type:"TOGGLE_TOAST",payload:false})}
          className="toast-button"
          width="1em"
          height="1em"
          viewBox="0 0 1000 1000"
        >
          <path
            d="M654 501l346 346l-154 154l-346-346l-346 346L0 847l346-346L0 155L154 1l346 346L846 1l154 154z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
};
