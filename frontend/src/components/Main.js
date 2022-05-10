import React, { useContext } from "react";
import { userContext } from "../context/CurrentUserContext";

import Card from "./Card";

function Main(props) {
  const currentUser = useContext(userContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <div
            className="profile__image"
            style={{ backgroundImage: `url(${currentUser.avatarUrl})` }}
          />
          <div
            className="profile__change-avatar"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__personal-data">
            <h1 className="profile__name"> {currentUser.name} </h1>
            <button
              className="profile__edit-button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__position"> {currentUser.about} </p>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} />
      </section>
      <section>
        <ul className="elements">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardClick={props.onCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleDeleteCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
