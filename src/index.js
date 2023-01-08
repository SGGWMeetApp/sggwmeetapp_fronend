import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { EventsContextProvider } from './context/EventsContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
   <AuthContextProvider>
      <EventsContextProvider>
         <App />;
      </EventsContextProvider>
   </AuthContextProvider>
);
