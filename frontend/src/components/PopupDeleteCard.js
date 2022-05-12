import React from "react";
import PopupWithForm from "../components/PopupWithForm";

function PopupDeleteCard(props) {
  const isPopupOpen = props.isOpen ? "popup_opened" : "";

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.cardId);
  }

  return (
    <PopupWithForm
      title={props.title}
      isPopupOpen={isPopupOpen}
      onSubmit={handleSubmit}
      submitButton={props.submitButton}
      closePopup={props.closePopup}
    />
  );
}

export default PopupDeleteCard;
