import { useState, useRef, useEffect } from 'react';
import menuStyles from './EventMenu.module.css';
import './EventMenu.module.css';
import { FaTimes } from 'react-icons/fa';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// components
import { LoadingSkeletonLine } from '../Loaders/Loaders';

// context
import { useAuthContext } from '../context/AuthContext';

// routes
const PLACES_URL = 'http://3.68.195.28/api/places';
const NEW_EVENT_URL = 'http://3.68.195.28/api/events';

const NewEventMenu = ({ showMenu, setShowMenu }) => {
   const { user } = useAuthContext();
   const [formData, setFormData] = useState({
      name: '',
      locationId: '',
      description: '',
   });
   const [startDate, setStartDate] = useState(null);
   const [displayMenu, setDisplayMenu] = useState(false);
   const [placesData, setPlacesData] = useState(null);
   const [loading, setLoading] = useState(true);
   const { name, locationId, description } = formData;

   const newEventContainer = useRef(null);
   const formContainerRef = useRef(null);
   const closeButtonRef = useRef(null);
   const dateInputRef = useRef(null);

   const fetchPlacesData = async () => {
      const response = await fetch(PLACES_URL, {
         headers: { Authorization: `Bearer ${user.token}` },
      });

      const result = await response.json();
      if (response.ok) {
         setPlacesData(result.places);
         setLoading(false);
      } else {
         console.error(result);
      }
   };

   const handleSubmit = async e => {
      e.preventDefault();

      const response = await fetch(NEW_EVENT_URL, {
         method: 'POST',
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
         resetForm();
      }
      if (!response.ok) {
         console.error(result.message);
         console.error(result.errors);
      }
   };

   const getFormData = e => {
      setFormData(prev => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const handleChangeDate = e => {
      setStartDate(new Date(e.target.value).toISOString());
   };

   const handleCloseMenu = e => {
      if (closeButtonRef.current.contains(e.target)) {
         setShowMenu(false);
      }
      if (displayMenu && !formContainerRef.current.contains(e.target)) {
         setDisplayMenu(false);
         setShowMenu(false);
      }
   };

   const handleClose = e => {
      if (e.key === 'Escape') {
         setDisplayMenu(false);
         setShowMenu(false);
      }
   };

   const resetForm = () => {
      setFormData({ name: '', locationId: '', description: '' });
      setStartDate(null);
      dateInputRef.current.value = null;
   };

   useEffect(() => {
      setDisplayMenu(true);
      if (user) {
         fetchPlacesData();
      }
   }, [user]);

   useEffect(() => {
      if (displayMenu) {
         window.addEventListener('click', handleCloseMenu);
         window.addEventListener('keydown', handleClose);
      } else {
         window.removeEventListener('click', handleCloseMenu);
         window.removeEventListener('keydown', handleClose);
      }

      return () => {
         window.removeEventListener('click', handleCloseMenu);
         window.removeEventListener('keydown', handleClose);
      };
   }, [showMenu, setShowMenu, displayMenu, setDisplayMenu]);

   return (
      <TransitionGroup>
         <CSSTransition
            in={displayMenu}
            timeout={300}
            appear={true}
            classNames="NewEventContainer"
         >
            <section className={menuStyles.NewEventContainer}>
               <CSSTransition
                  in={displayMenu}
                  timeout={300}
                  appear={true}
                  classNames="form-container"
               >
                  <div
                     className={menuStyles.EventFormContainer}
                     ref={formContainerRef}
                  >
                     <form
                        onSubmit={handleSubmit}
                        className={menuStyles.EventForm}
                     >
                        <div className={menuStyles.InputWrap}>
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

                        <div className={menuStyles.InputWrap}>
                           <label htmlFor="locationId">
                              Miejsce wydarzenia
                           </label>
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
                        <div className={menuStyles.InputWrap}>
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
                        <div className={menuStyles.InputWrap}>
                           <label htmlFor="startDate">Data rozpoczęcia</label>
                           <input
                              type="datetime-local"
                              name="startDate"
                              id="startDate"
                              ref={dateInputRef}
                              onChange={handleChangeDate}
                              required
                           ></input>
                        </div>
                        <button>Dodaj wydarzenie</button>
                     </form>
                     <button
                        className={menuStyles.CloseButton}
                        onClick={handleCloseMenu}
                        ref={closeButtonRef}
                     >
                        <FaTimes className={menuStyles.CloseIcon} />
                     </button>
                  </div>
               </CSSTransition>
            </section>
         </CSSTransition>
      </TransitionGroup>
   );
};

export default NewEventMenu;
