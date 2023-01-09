import { useEffect } from 'react';
import modalStyle from './../EventsPage/components/ModalStyle.module.css';
import { useEventsContext } from '../../context/EventsContext';
import { useAuthContext } from '../../context/AuthContext';

const EVENTS_URL = 'http://3.68.195.28/api/events';

const DeleteGroupModal = ({ setDisplayDeleteModal }) => {
   const { eventId } = useEventsContext();
   const { user } = useAuthContext();

   const handleDelete = async () => {
      const response = await fetch(`${EVENTS_URL}/${eventId}`, {
         method: 'DELETE',
         headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.ok) {
         setDisplayDeleteModal(false);
      }
      if (!response.ok) {
         console.error(response);
      }
   };

   useEffect(() => {});

   return (
      <div className={modalStyle.ModalContainer}>
         <div className={modalStyle.DeleteModalContainer}>
            <h1>Na pewno chcesz usunąć wybrane wydarzenie?</h1>
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
                  onClick={() => setDisplayDeleteModal(false)}
               >
                  Anuluj
               </button>
            </div>
         </div>
      </div>
   );
};

export default DeleteGroupModal;
