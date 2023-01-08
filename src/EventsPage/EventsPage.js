import { useState, useEffect } from 'react';
import style from '../GroupsPage/GroupsPage.module.css';
import './components/ModalStyle.module.css';
import eventsStyle from './EventsPage.module.css';
import { Icon } from '@iconify/react';
import TableRow from '../GroupsPage/TableRow';
import { NavLink } from 'react-router-dom';
import NewEventMenu from './NewEventMenu';
import moment from 'moment';
import { DualRingLoader } from '../Loaders/Loaders';
import AllEvents from './AllEvents';
import MyEvents from './MyEvents';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';

// context
import { useAuthContext } from '../context/AuthContext';

const PUBLIC_EVENTS_URL = 'http://3.68.195.28/api/events';

const EventsPage = () => {
   const { user } = useAuthContext();
   const [displayEventMenu, setDisplayEventMenu] = useState(false);
   const [events, setEvents] = useState(null);
   const [loading, setLoading] = useState(true);
   const [activeTab, setActiveTab] = useState('all-events');
   const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
   const [displayEditModal, setDisplayEditModal] = useState(false);

   const handleFetch = async () => {
      const response = await fetch(PUBLIC_EVENTS_URL, {
         headers: { Authorization: `Bearer ${user.token}` },
      });

      const result = await response.json();

      if (response.ok) {
         setEvents(result.events);
         setLoading(false);
      }
      if (!response.ok) {
         console.log(result);
      }
   };

   useEffect(() => {
      setLoading(true);
   }, []);

   useEffect(() => {
      if (user) {
         handleFetch();
      }
   }, [displayDeleteModal, displayEventMenu]);

   return (
      <div className={style.GroupContainer}>
         <div className={style.GroupsSection}>
            <div className={style.GroupsHeader}>
               <div className={eventsStyle.EventsTabSelect}>
                  <button
                     className={`${eventsStyle.BtnEventsAll} ${
                        activeTab === 'all-events' &&
                        eventsStyle.activeEventsTab
                     }`}
                     onClick={() => setActiveTab('all-events')}
                  >
                     Wszystkie wydarzenia
                  </button>
                  <button
                     className={`${eventsStyle.BtnEventsAuthor} ${
                        activeTab === 'my-events' && eventsStyle.activeEventsTab
                     }`}
                     onClick={() => setActiveTab('my-events')}
                  >
                     Twoje Wydarzenia
                  </button>
               </div>
               <div className={style.BtnContainer}>
                  <button className={style.BackMapBtn}>
                     <NavLink className={style.NavLinkBtn} to="/profile">
                        <Icon
                           icon="akar-icons:arrow-left"
                           color="#122c34"
                           width="20"
                           height="20"
                        />
                        Wróć do mapy
                     </NavLink>
                  </button>
                  <button
                     className={style.CreateGroupBtn}
                     onClick={() => setDisplayEventMenu(true)}
                  >
                     <Icon
                        icon="ant-design:plus-outlined"
                        color="white"
                        width="20"
                        height="20"
                     />
                     Dodaj wydarzenie
                  </button>
               </div>
            </div>

            <div style={{ height: '80vh', overflowY: 'scroll' }}>
               <table className={style.GroupsTable}>
                  <thead>
                     <tr>
                        <th>Nazwa</th>
                        <th>Data</th>
                        <th>Miejsce</th>
                        <th>Opis wydarzneia</th>
                        <th style={{ minWidth: '200px' }}>
                           Powiadomienie 24h przed
                        </th>
                        <th></th>
                     </tr>
                  </thead>
                  {activeTab === 'all-events' ? (
                     <AllEvents
                        user={user}
                        loading={loading}
                        setLoading={setLoading}
                        events={events}
                        handleFetch={handleFetch}
                     />
                  ) : (
                     <MyEvents
                        user={user}
                        loading={loading}
                        setLoading={setLoading}
                        events={events}
                        handleFetch={handleFetch}
                        displayEditModal={displayEditModal}
                        setDisplayDeleteModal={setDisplayDeleteModal}
                        setDisplayEditModal={setDisplayEditModal}
                     />
                  )}
               </table>
            </div>
         </div>
         {displayEventMenu && (
            <NewEventMenu
               showMenu={displayEventMenu}
               setShowMenu={setDisplayEventMenu}
            />
         )}
         {displayDeleteModal && (
            <DeleteModal setDisplayDeleteModal={setDisplayDeleteModal} />
         )}
         {displayEditModal && (
            <EditModal setDisplayEditModal={setDisplayEditModal} />
         )}
      </div>
   );
};

export default EventsPage;
