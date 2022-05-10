import React from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete, currentUser }) {
  const isOwn = card.owner._id === currentUser.id;
  const isLiked = card.likes.some((i) => i._id === currentUser.id);
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }

  const cardDeleteButtonClassName = `${isOwn ? "element__delete-icon" : ""}`;

  const cardLikedButtonClassName = `${
    isLiked ? "element__like-button_liked" : ""
  }`;

  return (
    <li className="element">
      <article>
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <div className="element__info">
          <h2 className="element__name">{card.name}</h2>
          <div className="element__like-section">
            <button
              className={`element__like-button ${cardLikedButtonClassName}`}
              onClick={handleLikeClick}
            />
            <div className="element__like-counter"> {card.likes.length}</div>
          </div>
        </div>
        <div className={cardDeleteButtonClassName} onClick={handleDeleteCard} />
      </article>
    </li>
  );
}

export default Card;
