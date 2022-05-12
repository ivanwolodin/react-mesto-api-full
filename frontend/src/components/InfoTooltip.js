import React from "react";
import status_approved from "../images/registration_approved.svg";
import status_declined from "../images/registration_declined.svg";

function InfoTooltip({ isOpen, onClose, toolTipStatus, toolTipMessage }) {
  const isPopupOpen = isOpen ? "popup_opened" : "";
  const registrationResponceImage = toolTipStatus
    ? status_approved
    : status_declined;

  return (
    <div className={`popup popup_pic ${isPopupOpen}`}>
      <div className="popup__overlay" />
      <div className="popup__registration">
        <img
          className="popup__registration-image"
          alt="картинка статуса регистрации"
          src={registrationResponceImage}
        />
        <p className="popup__registration-message">{toolTipMessage}</p>
        <button
          className="popup__close-image popup__close-button"
          type="reset"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
