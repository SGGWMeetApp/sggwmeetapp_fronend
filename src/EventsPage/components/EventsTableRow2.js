import { useState } from 'react';
import style from '../../GroupsPage/GroupsPage.module.css';
import { Icon } from '@iconify/react';
import EventsMenu from './EventsMenu2';
import { useEventsContext } from '../../context/EventsContext';

const EventsTableRow = ({
   eventId,
   setDisplayDeleteModal,
   setDisplayEditModal,
   eventData,
}) => {
   const { setEventId, setSelectedEventData } = useEventsContext();
   const [visible, setVisible] = useState(false);
   const [displayMenu, setDisplayMenu] = useState(false);

   const handleClick = () => {
      setVisible(state => !state);
      setDisplayMenu(true);
      setEventId(eventId);
      setSelectedEventData(eventData);
   };

   return (
      <td
         style={{
            position: 'relative',
            width: '100px',
         }}
      >
         {!visible && (
            <button onClick={() => handleClick()} className={style.MoreBtn}>
               <Icon
                  icon="akar-icons:more-vertical"
                  color="rgba(0, 0, 0, 0.54)"
                  width="20"
                  height="20"
               />
            </button>
         )}
         {displayMenu && (
            <EventsMenu
               displayMenu={displayMenu}
               setDisplayMenu={setDisplayMenu}
               setVisible={setVisible}
               setDisplayDeleteModal={setDisplayDeleteModal}
               setDisplayEditModal={setDisplayEditModal}
               eventId={eventId}
            />
         )}
      </td>
   );
};

export default EventsTableRow;
