import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import './navbar.css'
/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, {menu, onMenuClick}) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if(menu == 'animate'){
            onMenuClick()            
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, menu]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {

    
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props);

  return <div className='ClickOutSide' ref={wrapperRef}>{props.children}</div>;
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired
};

export default OutsideAlerter;
