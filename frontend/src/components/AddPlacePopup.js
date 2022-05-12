import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddNewCard }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  const isPopupOpen = isOpen ? "popup_opened" : "";

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddNewCard({
      cardName: cardName,
      cardLink: cardLink,
    });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="popup_image"
      isPopupOpen={isPopupOpen}
      closePopup={onClose}
      submitButton="Создать"
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__subtitle popup__subtitle_type_image popup__input"
            id="card-input"
            type="text"
            placeholder="Название"
            name="name"
            required
            minLength="2"
            value={cardName}
            onChange={handleCardNameChange}
            maxLength="30"
          />
          <span className="card-input-error"> </span>
          <input
            className="popup__subtitle popup__subtitle_type_link popup__input"
            value={cardLink}
            onChange={handleCardLinkChange}
            id="url-input"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            required
          />
          <span className="url-input-error" />
        </>
      }
    />
  );
}

export default AddPlacePopup;
