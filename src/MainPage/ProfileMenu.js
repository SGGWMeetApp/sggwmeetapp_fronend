import React, { useRef, useEffect } from 'react';
import style from './ProfileMenu.module.css';
import { Icon } from '@iconify/react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProfileMenu = (props) => {
   const { setUser } = useAuthContext();

   const handleClick = () => {
      setUser(null);
      localStorage.removeItem('user');
      <Navigate to="/" />;
   };

   useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
   }, []);

   const refOne = useRef();
   const handleClickOutside = (e) => {
      if (refOne.current !== null) {
         if (!refOne.current.contains(e.target)) {
            props.visible();
         }
      }
   };
   return (
      <div className={style.MenuContainer} ref={refOne}>
         <div className={style.MenuHeader}>
            <p className={style.UserName}>{props.user.firstName} {props.user.lastName}</p>
            <p className={style.Usermail}>stara@foch.pl</p>
         </div>
         <ul className={style.MenuList}>
            <li>
               <button
                  onClick={() => props.OpenModal('settings')}
                  className={style.SettingBtn}
               >
                  <Icon
                     icon="ci:settings-filled"
                     color="rgba(0, 0, 0, 0.54)"
                     width="20"
                     height="20"
                  />
                  <p>Ustawienia</p>
               </button>
            </li>
            <li>
               <button
                  onClick={() => props.OpenModal()}
                  className={style.ProfilBtn}
               >
                  <Icon
                     icon="carbon:user-avatar-filled"
                     color="rgba(0, 0, 0, 0.54)"
                     width="20"
                     height="20"
                  />
                  <p>Profil</p>
               </button>
            </li>
         </ul>
         <button className={style.LogOutBtn} onClick={handleClick}>
            Wyloguj się
         </button>
      </div>
   );
};

export default ProfileMenu;
