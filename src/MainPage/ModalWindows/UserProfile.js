import React from 'react';
import { Icon } from '@iconify/react';
import UserAvatar from "../../Assets/User-avatar.svg";
import style from './Modal.module.css';
import ModalWindow from './Modal';
import EditUser from './EditUserProfile';
import { useState } from 'react';
const User = (props) => {
   const [openEdit, setOpenEdit] = useState(false);
   const  OnClick =()=>{
      setOpenEdit(true);
      
   }
   const CloseModal=()=>{
      setOpenEdit(false);
      props.CloseModal();
      
   }
   let user =props.user;
   let avatarUrl=null;
   if(user.avatarUrl){
      avatarUrl=user.avatarUrl;
   }
   else{
      avatarUrl =UserAvatar;
   }
   return (
      <div className={style.UserContainer}>
         <div className={style.UserHeader}>
            <p className={style.HeaderText}>Profil Użytkownika</p>
            <button
               onClick={() => props.CloseModal()}
               className={style.CloseBtn}
            >
               <Icon
                  icon="ci:close-small"
                  color="rgba(0, 0, 0, 0.54)"
                  width="26"
                  height="26"
               />
            </button>
         </div>
         <div className={style.UserContainerBody}>
            <img src={avatarUrl} alt="User foto"></img>
            <div className={style.UserInformation}>
               <div className={style.UserInformationHeader}>
                  <p className={style.UserName}>{user.firstName} {user.lastName}</p>
                  <button className={style.EditBtn} onClick={()=>OnClick()}>
                     <Icon
                        className={style.EditIcon}
                        icon="material-symbols:edit"
                        color="#1976d2"
                        width="22"
                        height="22"
                     />
                  </button>
               </div>
               <div className={style.UserContact}>
                  <p className={style.Mail}>Email: andrej164@onet.pl</p>
                  <p className={style.PhoneNumber}>Telefon: {user.phoneNumberPrefix} {user.phoneNumber}</p>
               </div>
               <div className={style.UserDescription}>
                  <p className={style.UserDescriptionText}>
                     {user.description}
                  </p>
               </div>
            </div>
         </div>
         <ModalWindow
            openModal={openEdit}
            onClose={!openEdit}
          >
            <EditUser CloseModal={()=>CloseModal() } user={props.user} />
          </ModalWindow>
      </div>
   );
};
export default User;
