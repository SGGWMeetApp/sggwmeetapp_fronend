import { useEffect } from 'react';
import modalStyle from './../EventsPage/components/ModalStyle.module.css';
import { useState } from 'react';

const EVENTS_URL = 'http://3.68.195.28/api/groups';

const DeleteGroup = (props) => {
   const groupId  = props.groupId;
   let user = JSON.parse(localStorage.getItem("user"));

   const handleDelete = async () => {
      const response = await fetch(`${EVENTS_URL}/${groupId}`, {
         method: 'DELETE',
         headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.ok) {
        props.getGroups();
         props.OpenModal();
      }
      if (!response.ok) {
         console.error(response);
      }
   };

   useEffect(() => {});

   return (
      <div className={modalStyle.ModalContainer}>
         <div className={modalStyle.DeleteModalContainer}>
            <h1>Na pewno chcesz usunąć wybraną grupę?</h1>
            <p>To działanie jest nieodwracalne.</p>
            <div className={modalStyle.ButtonWrapper}>
               <button
                  className={modalStyle.BtnConfirmDelete}
                  onClick={() => handleDelete()}
               >
                  Tak, usuń
               </button>
               <button
                  className={modalStyle.BtnAbort}
                  onClick={() => props.OpenModal()}
               >
                  Anuluj
               </button>
            </div>
         </div>
      </div>
   );
};

export default DeleteGroup;
