import { useContext, createContext, useState } from 'react';

const EventsContext = createContext();

export const useEventsContext = () => useContext(EventsContext);

export const EventsContextProvider = ({ children }) => {
   const [eventId, setEventId] = useState(null);
   const [selectedEventData, setSelectedEventData] = useState(null);

   return (
      <EventsContext.Provider
         value={{
            eventId,
            setEventId,
            selectedEventData,
            setSelectedEventData,
         }}
      >
         {children}
      </EventsContext.Provider>
   );
};
