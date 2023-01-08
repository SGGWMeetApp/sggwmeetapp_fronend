import { useState, useRef, useEffect } from 'react';
import ModalStyle from './ModalStyle.module.css';

// components
import { LoadingSkeletonLine } from '../../Loaders/Loaders';

// context
import { useAuthContext } from '../../context/AuthContext';
import { useEventsContext } from '../../context/EventsContext';

// routes
const PLACES_URL = 'http://3.68.195.28/api/places';
const EDIT_URL = 'http://3.68.195.28/api/events';

const EditModal = ({ setDisplayEditModal }) => {
   const { user } = useAuthContext();
   const { eventId, selectedEventData } = useEventsContext();
   const [formData, setFormData] = useState({
      name: selectedEventData.name,
      locationId: selectedEventData.locationData.id,
      description: selectedEventData.description,
      startDate:selectedEventData.startDate.slice(0,19), 
   });
   
   const [loading, setLoading] = useState(true);
   const { name, locationId, description, startDate } = formData;
   const [placesData, setPlacesData] = useState(null);

   const fetchPlacesData = async () => {
      const response = await fetch(PLACES_URL, {
         headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log(selectedEventData)
      const result = await response.json();
      if (response.ok) {
         setPlacesData(result.places);
         setLoading(false);
      } else {
         console.error(result);
      }
   };

   const getFormData = e => {
      setFormData(prev => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const handleChangeDate = e => {
      setFormData({startDate:new Date(e.target.value).toISOString()});
   };

   const handleSubmit = async e => {
      e.preventDefault();
      const response = await fetch(`${EDIT_URL}/${eventId}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
         },
         body: JSON.stringify({
            name: name,
            locationId: locationId,
            description: description,
            startDate: startDate,
         }),
      });

      const result = await response.json();

      if (response.ok) {
         setDisplayEditModal(false);
      }
      if (!response.ok) {
         console.error(result.message);
         console.error(result.errors);
      }
   };

   useEffect(() => {
      if (user) {
         fetchPlacesData();
      }
   }, [user]);

   return (
      <div className={ModalStyle.ModalContainer}>
         <div className={ModalStyle.EditModalContainer}>
            <h1 className={ModalStyle.EditFormHeader}>Edytuj wydarzenie</h1>
            <form className={ModalStyle.EventForm}>
               <div className={ModalStyle.InputWrap}>
                  <label htmlFor="name">Nazwa wydarzenia</label>
                  <input
                     type="text"
                     name="name"
                     id="name"
                     value={name}
                     onChange={getFormData}
                     required
                  ></input>
               </div>

               <div className={ModalStyle.InputWrap}>
                  <label htmlFor="locationId">Miejsce wydarzenia</label>
                  {loading ? (
                     <LoadingSkeletonLine />
                  ) : (
                     <select
                        name="locationId"
                        id="locationId"
                        value={locationId}
                        onChange={getFormData}
                        required
                     >
                        <option defaultValue hidden>
                           Wybierz miejsce wydarzenia
                        </option>
                        {placesData.map(el => (
                           <option key={el.id} value={el.id}>
                              {el.name}
                           </option>
                        ))}
                     </select>
                  )}
               </div>
               <div className={ModalStyle.InputWrap}>
                  <label htmlFor="description">Opis wydarzenia</label>
                  <input
                     type="text"
                     name="description"
                     id="description"
                     value={description}
                     onChange={getFormData}
                     required
                  ></input>
               </div>
               <div className={ModalStyle.InputWrap}>
                  {console.log(startDate)}
                  <label htmlFor="startDate">Data rozpoczęcia</label>
                  <input
                     type="datetime-local"
                     name="startDate"
                     id="startDate"
                     value={startDate}
                     onChange={handleChangeDate}
                     required
                  ></input>
               </div>
               <div className={ModalStyle.ButtonWrapper}>
                  <button
                     onClick={e => handleSubmit(e)}
                     className={ModalStyle.EditBtn}
                  >
                     Zapisz zmiany
                  </button>
                  <button
                     onClick={() => setDisplayEditModal(false)}
                     className={ModalStyle.CloseBtn}
                  >
                     Anuluj
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditModal;
