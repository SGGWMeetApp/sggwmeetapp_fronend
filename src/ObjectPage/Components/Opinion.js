import React, { useState } from "react";
import style from "./Components.module.css";
import { Icon } from "@iconify/react";
import UserAvatar from "../../Assets/User-avatar.svg";
import ModalWindow from "../../MainPage/ModalWindows/Modal";
import AddOpinion from "../AddOpinion";
import EditOpinion from "../EditOpinion";
import axios from "axios";
const Opinions = (props) => {
  let rating = props.rating;
  const user = JSON.parse(localStorage.getItem("user"));
  const [openModalOpinion, setOpenModalOpinion] = useState(false);
  const [openModalEditOpinion, setOpenModalEditOpinion] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [comment, setComment] = useState("");
  const [isPositive, setIsPositive] = useState(true);
  function OpenModal() {
    setOpenModalOpinion(!openModalOpinion);
  }
  function CloseModal() {
    setOpenModalOpinion(false);
  }
  function OpenModalEdit(review) {
    setIsPositive(review.isPositive);
    setComment(review.comment);
    setReviewId(review.id);
    setOpenModalEditOpinion(!openModalOpinion);
  }
  function CloseModalEdit() {
    setOpenModalEditOpinion(false);
  }
  const onMark = async (review,isHelpful) => {
    setReviewId(review.id);
    if(review.id!==null && review.author.email!==user.userData.email){
    const possitive = isHelpful;

    await axios
      .post(
        `http://3.68.195.28/api/places/${props.objId}/reviews/${review.id}/votes`,
        {
          isPositive: possitive
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(props.getDetails);
    }
  };
  return (
    <div className={style.OpinionContainer}>
      <div className={style.OpinionsHeader}>
        {rating.reviews.length !== 0 ? (
          <div>
            <p style={{ marginBottom: "0px" }}>
              {rating.positivePercent}% poleca to miejsce
            </p>
            <p style={{ fontSize: "18px", marginTop: "0px" }}>
              {" "}
              {rating.reviews.length} opini
            </p>
          </div>
        ) : (
          <p>To miejsce nie otrzymało jeszcze opini</p>
        )}
        <button className={style.AddOpinion} onClick={() => OpenModal()}>
          <Icon
            icon="ant-design:plus-outlined"
            color="white"
            width="20"
            height="20"
          />
          Dodaj opinie
        </button>
      </div>
      <div className={style.Opinions}>
        {rating.reviews.length !== 0 ? (
          rating.reviews.map((review) => (
            <div className={style.Opinion} key={review.id}>
              <div key={review.id} className={style.OpinionHeader}>
                {review.author.avatarUrl ? (
                  <img
                    className={style.Avatar}
                    src={review.author.avatarUrl}
                    alt="Avatar"
                  />
                ) : (
                  <img className={style.Avatar} src={UserAvatar} alt="Avatar" />
                )}

                <div className={style.UserInfo}>
                  <p className={style.UserName}>
                    {review.author.firstName} {review.author.lastName}
                  </p>
                  <p className={style.Date}>
                    {review.publicationDate.slice(0, 10)}
                  </p>
                </div>
                <div className={style.OpinionRate}>
                  {review.isPositive ? (
                    <Icon
                      icon="ant-design:like-filled"
                      color="#85c9b9"
                      width="30"
                    />
                  ) : (
                    <Icon
                      icon="ant-design:dislike-filled"
                      color="#f54a4a"
                      width="30"
                    />
                  )}{" "}
                </div>

                <div className={style.ReviewRating}>
                  <div className={style.Positive}>
                    <button onClick={()=>onMark(review,true)}
                      style={{
                        background: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Icon
                        icon="ant-design:like-filled"
                        color="#85c9b9"
                        width="20"
                        height="20"
                      />
                    </button>
                    <p className={style.PositiveNumber}>{review.upvoteCount}</p>
                  </div>
                  <div className={style.Negative}>
                    <button onClick={()=>onMark(review,false)}
                      style={{
                        background: "white",
                        border: "none",
                        cursor: "pointer",
                        
                      }}
                    >
                      <Icon
                        icon="ant-design:dislike-filled"
                        color="#f54a4a"
                        width="20"
                        height="20"
                      />
                    </button>
                    <p className={style.NegativeNumber}>
                      {review.downvoteCount}
                    </p>
                  </div>
                </div>
              </div>
              {user.userData.email === review.author.email ? (
                <button
                  className={style.EditBtn}
                  onClick={() => OpenModalEdit(review)}
                >
                  <Icon
                    className={style.EditIcon}
                    icon="material-symbols:edit"
                    color="#1976d2"
                    width="22"
                    height="22"
                  />
                </button>
              ) : (
                <p></p>
              )}

              {review.comment === null ? (
                <p>Brak opini</p>
              ) : (
                <p className={style.OpinionText}>{review.comment}</p>
              )}
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
      <ModalWindow openModal={openModalOpinion} onClose={!openModalOpinion}>
        <AddOpinion
          CloseModal={CloseModal}
          objectId={props.objId}
          getDetails={props.getDetails}
        />
      </ModalWindow>
      <ModalWindow
        openModal={openModalEditOpinion}
        onClose={!openModalEditOpinion}
      >
        <EditOpinion
          CloseModal={CloseModalEdit}
          objectId={props.objId}
          reviewId={reviewId}
          getDetails={props.getDetails}
          comment={comment}
          isPositive={isPositive}
        />
      </ModalWindow>
    </div>
  );
};
export default Opinions;
