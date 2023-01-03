import { useState, useEffect } from 'react';
import style from '../GroupsPage/GroupsPage.module.css';
import { Icon } from '@iconify/react';
import TableRow from '../GroupsPage/TableRow';
import { NavLink } from 'react-router-dom';
import NewEventMenu from './NewEventMenu';
import { DualRingLoader } from '../Loaders/Loaders';
import moment from 'moment';

// context
import { useAuthContext } from '../context/AuthContext';

const PUBLIC_EVENTS_URL = 'http://3.68.195.28/api/events';

const EventsPage = () => {
   const { user } = useAuthContext();
   const [displayEventMenu, setDisplayEventMenu] = useState(false);
   const [loading, setLoading] = useState(true);
   const [events, setEvents] = useState(null);

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
      if (user) {
         handleFetch();
      }
   }, [displayEventMenu]);

   return (
      <div className={style.GroupContainer}>
         <div className={style.GroupsSection}>
            <div className={style.GroupsHeader}>
               <h2 className={style.Header}>Twoje Wydarzenia</h2>
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
                  <tbody>
                     {loading ? (
                        <DualRingLoader />
                     ) : (
                        events.map(el => (
                           <tr key={el.id}>
                              <td
                                 style={{
                                    display: 'flex',
                                    gap: '4px',
                                    lineHeight: '32px',
                                 }}
                              >
                                 <input type="checkbox" />
                                 <p>{el.name}</p>
                              </td>
                              <td style={{ minWidth: '130px' }}>
                                 {moment(el.startDate).format('D.M.YYYY H:mm')}
                              </td>
                              <td>{el.locationData.name}</td>
                              <td>{el.description}</td>
                              <td>
                                 <input type="checkbox" />
                              </td>
                              <TableRow id="events" />
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>
         {displayEventMenu && (
            <NewEventMenu
               showMenu={displayEventMenu}
               setShowMenu={setDisplayEventMenu}
            />
         )}
      </div>
   );
};

export default EventsPage;
