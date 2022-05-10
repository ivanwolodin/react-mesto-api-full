import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { userContext } from "../context/CurrentUserContext";

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
  const currentUser = useContext(userContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const isPopupOpen = isOpen ? "popup_opened" : "";
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popup_profile"
      isPopupOpen={isPopupOpen}
      closePopup={onClose}
      onSubmit={handleSubmit}
      submitButton="Сохранить"
      children={
        <>
          <input
            className="popup__subtitle popup__subtitle_type_name popup__input"
            value={name}
            onChange={handleNameChange}
            id="name-input"
            type="text"
            placeholder="Имя"
            name="name"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="name-input-error" />
          <input
            className="popup__subtitle popup__subtitle_type_profession popup__input"
            value={description}
            onChange={handleDescriptionChange}
            id="position-input"
            type="text"
            placeholder="Профессия"
            name="profession"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="position-input-error" />
        </>
      }
    />
  );
}

export default EditProfilePopup;
