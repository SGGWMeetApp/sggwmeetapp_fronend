import { useState, useEffect } from 'react';
import TableRow from '../GroupsPage/TableRow';
import EventsTableRow from './components/EventsTableRow';
import { DualRingLoader } from '../Loaders/Loaders';
import moment from 'moment';

const AllEvents = ({
   user,
   events,
   loading,
   setLoading,
   handleFetch,
   displayEditModal,
   setDisplayDeleteModal,
   setDisplayEditModal,
}) => {
   useEffect(() => {
      setLoading(true);
      if (user) {
         handleFetch();
      }
   }, [displayEditModal]);

   return (
      <tbody>
         {loading ? (
            <DualRingLoader />
         ) : events.filter(
              element => element.author.email === user.userData.email
           ).length > 0 ? (
            events
               .filter(element => element.author.email === user.userData.email)
               .map(el => (
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
                     <EventsTableRow
                        eventId={el.id}
                        eventData={el}
                        setDisplayDeleteModal={setDisplayDeleteModal}
                        setDisplayEditModal={setDisplayEditModal}
                     />
                  </tr>
               ))
         ) : (
            <tr>
               <td>
                  Aktualnie nie posiadasz żadnych osobiście utworzonych wydarzeń
               </td>
            </tr>
         )}
      </tbody>
   );
};

export default AllEvents;
