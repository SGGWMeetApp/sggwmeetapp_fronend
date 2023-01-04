import React from "react";
import style from "./Components.module.css";
import { Icon } from "@iconify/react";
import UserAvatar from "../../Assets/User-avatar.svg";
const Opinions = (props) => {
  const rating = props.rating;

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
        <button className={style.AddOpinion}>
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
            <div className={style.Opinion}>
              <div key={review.id} className={style.OpinionHeader}>
                {review.author.avatarUrl ? (
                  <img
                    className={style.Avatar}
                    src={review.author.avatarUrl}
                    alt="Avatar"
                  />
                ) : (
                  <img
                    className={style.Avatar}
                    src={UserAvatar}
                    alt="Avatar"
                  />
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
                    <Icon
                      icon="ant-design:like-filled"
                      color="rgba(18, 44, 52, 0.5)"
                      width="20"
                      height="20"
                    />
                    <p className={style.PositiveNumber}>{review.upvoteCount}</p>
                  </div>
                  <div className={style.Negative}>
                    <Icon
                      icon="ant-design:dislike-filled"
                      color="rgba(18, 44, 52, 0.5)"
                      width="20"
                      height="20"
                    />
                    <p className={style.NegativeNumber}>
                      {review.downvoteCount}
                    </p>
                  </div>
                </div>
              </div>
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
    </div>
  );
};
export default Opinions;
