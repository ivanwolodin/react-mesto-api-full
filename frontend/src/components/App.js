import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import PageNotFound from "./PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import PopupDeleteCard from "./PopupDeleteCard";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import { api } from "../utils/api";
import { userContext } from "../context/CurrentUserContext";
import { authorize, checkToken, register } from "../utils/auth";
import { useHistory } from "react-router";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatarUrl: "",
    id: "",
  });
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState("");
  const [toolTipStatus, setToolTipStatus] = useState(false);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [idCardDelete, setIdCardDelete] = useState(null);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);

  const [userEmail, setuUserEmail] = useState("");

  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log("Cannot get data from server");
          console.log(err);
        });

      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser({
            name: userData.name,
            about: userData.about,
            avatarUrl: userData.avatar,
            id: userData._id,
          });
        })
        .catch((err) => {
          console.log("Cannot get data from server");
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, [history]);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setuUserEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log("Cannot check token");
          console.log(err);
        });
    }
  }

  function handleLogin(data) {
    authorize(data.name, data.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          setuUserEmail(data.name);
          history.push("/");
        } else {
          setToolTipStatus(false);
          setToolTipMessage("Что-то пошло не так! Попробуйте ещё раз.");
          setInfoToolTipPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log("Cannot authorize user");
        console.log(err);
      });
  }

  function handleRegistration(data) {
    register(data.name, data.password)
      .then((res) => {
        if (res.status !== 400 && res.status !== 401) {
          history.push("/signin");
          setToolTipStatus(true);
          setToolTipMessage("Вы успешно зарегистрировались");
        } else {
          setToolTipStatus(false);
          setToolTipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        }
      })
      .catch((err) => {
        console.log("Cannot register user");
        console.log(err);
      })
      .finally(() => {
        setInfoToolTipPopupOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/signup");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log("Cannot handle liking");
        console.log(err);
      });
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then((response) => {
        setCards(cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Cannot handle card deleting");
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setDeleteCardPopupOpen(true);
    setIdCardDelete(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data.cardName, data.cardLink)
      .then((response) => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Cannot add new card");
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .changeUserInfo(data.name, data.about)
      .then((response) => {
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatarUrl: currentUser.avatarUrl,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Cannot change user data");
        console.log(err);
      });
  }

  function handleAvatarUpdate(data) {
    api
      .changeAvatar(data.avatar)
      .then((response) => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatarUrl: data.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Cannot change avatar");
        console.log(err);
      });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);

    setDeleteCardPopupOpen(false);
    setInfoToolTipPopupOpen(false);

    setSelectedCard({});
  }

  return (
    <div className="root">
      <div className="page">
        <Header userEmail={userEmail} handleLogout={handleLogout} />
        <userContext.Provider value={currentUser}>
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              handleDeleteCard={handleCardDelete}
              cards={cards}
            />
            <Route path="/signup">
              <Register handleRegistration={handleRegistration} />
            </Route>
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
            toolTipStatus={toolTipStatus}
            toolTipMessage={toolTipMessage}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddNewCard={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleAvatarUpdate}
          />
          <PopupDeleteCard
            title="Вы уверены?"
            name="popup_delete_card"
            closePopup={closeAllPopups}
            submitButton="Да"
            cardId={idCardDelete}
            onDeleteCard={handleDeleteCard}
            isOpen={isDeleteCardPopupOpen}
          />
          <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
        </userContext.Provider>
      </div>
    </div>
  );
}

export default App;
