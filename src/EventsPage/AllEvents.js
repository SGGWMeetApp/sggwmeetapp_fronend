import { useState, useEffect } from 'react';
import TableRow from '../GroupsPage/TableRow';
import { DualRingLoader } from '../Loaders/Loaders';
import moment from 'moment';

const PUBLIC_EVENTS_URL = 'http://3.68.195.28/api/events';

const AllEvents = ({ user, events, loading, setLoading, handleFetch }) => {
   useEffect(() => {
      setLoading(true);
      if (user) {
         handleFetch();
      }
   }, []);

   return (
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
   );
};

export default AllEvents;
