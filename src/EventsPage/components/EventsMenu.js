import { useRef, useEffect } from 'react';
import menuStyle from '../EventsPage.module.css';
import { FaTimes, FaTrash, FaEdit } from 'react-icons/fa';

const EventsMenu = ({
   setDisplayMenu,
   setVisible,
   setDisplayDeleteModal,
   setDisplayEditModal,
}) => {
   const menuRef = useRef(null);

   const handleClose = () => {
      setDisplayMenu(false);
      setVisible(state => !state);
   };

   const handleDelete = () => {
      handleClose();
      setDisplayDeleteModal(true);
   };

   const handleEdit = () => {
      handleClose();
      setDisplayEditModal(true);
   };

   return (
      <div className={menuStyle.EventMenu} ref={menuRef}>
         <button className={menuStyle.CloseBtn} onClick={() => handleClose()}>
            <FaTimes />
         </button>
         <ul>
            <li>
               <button
                  className={menuStyle.MenuButton}
                  onClick={() => handleEdit()}
               >
                  <FaEdit />
                  <p>Edytuj</p>
               </button>
            </li>
            <li>
               <button
                  className={menuStyle.MenuButton}
                  onClick={() => handleDelete()}
               >
                  <FaTrash />
                  <p>Usuń</p>
               </button>
            </li>
         </ul>
      </div>
   );
};

export default EventsMenu;
