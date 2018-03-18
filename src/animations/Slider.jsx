import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 500;

const defaultStyle = {
  overflow: 'hidden'
}

const transitionStyles = {
  entering: { maxHeight: '200px', transition: `max-height ${duration}ms ease-in` },
  entered: { maxHeight: '200px', overflow: 'auto' },
  exiting: { maxHeight: '0px', transition: `max-height ${duration}ms cubic-bezier(.2,.85,.34,.85)` },
  exited: { maxHeight: '0px' },
};

const Slider = (props) => {
  return (
    <Transition in={props.isOpen} timeout={duration}>
      {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        {props.children}
      </div>
    )}
    </Transition>
  );
};

export default Slider;