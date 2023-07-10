import React, { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC);
  }

  handlePressESC = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseOverlay = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { largeImage } = this.props;
    return (
      <Overlay onClick={this.handleCloseOverlay}>
        <ModalWindow>
          <img src={largeImage} alt="Large" />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;
