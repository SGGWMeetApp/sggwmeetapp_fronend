import React from 'react';
import style from '../LogInPage/LogInPage.module.css';
import styleRegister from './RegisterPage.module.css';
import { Icon } from '@iconify/react';
import { NavLink, Navigate } from 'react-router-dom';
import styleHome from '../HomePage/HomePage.module.css';
import Navigation from '../LogInPage/Navigatio';
import { SmallDualRingLoader } from '../Loaders/Loaders';

const REGISTER_URL = 'http://3.68.195.28/register';

class RegisterPage extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         confirmPassword: '',
         userData: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            description: '',
            phoneNumberPrefix: '',
         },
         error: null,
         checked: false,
         loading: false,
         redirect: false,
      };
   }

   getFormData(e) {
      this.setState(prevState => ({
         ...prevState,
         [e.target.name]: e.target.value,
         error: null,
      }));
   }

   getUserData(e) {
      this.setState(prevState => ({
         userData: {
            ...prevState.userData,
            [e.target.name]: e.target.value,
         },
         error: null,
      }));
   }

   async handleSubmit(e) {
      e.preventDefault();
      if (
         !this.state.email ||
         !this.state.password ||
         !this.state.confirmPassword ||
         !this.state.userData.firstName ||
         !this.state.userData.lastName ||
         !this.state.userData.phoneNumber ||
         !this.state.userData.phoneNumberPrefix
      ) {
         this.setState({ error: 'Uzupełnij wszystkie pola' });
      } else if (this.state.password !== this.state.confirmPassword) {
         this.setState({ error: 'Podane hasła różnią się' });
      } else if (!this.state.checked) {
         this.setState({ error: 'Zaakceptuj warunki korzystania z serwisu' });
      } else this.handleRegister();
   }

   async handleRegister() {
      this.setState({ loading: true });

      const response = await fetch(REGISTER_URL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            userData: { ...this.state.userData },
         }),
      });

      const json = await response.json();
      if (response.ok) {
         this.setState({ loading: false, redirect: true });
         localStorage.setItem('user', JSON.stringify(json));
      }
      if (!response.ok) {
         this.setState({
            error: json.message,
            loading: false,
         });
      }
   }

   handleCheck() {
      this.setState(prev => ({
         checked: !prev.checked,
      }));
   }

   render() {
      return (
         <div
            className={style.LogInContainer}
            id={styleRegister.RegisterContainer}
         >
            <div className={style.LogInBack} id={styleRegister.RegisterInBack}>
               <Navigation />
               <div
                  className={style.LogInWindow}
                  id={styleRegister.RegisterWindow}
               >
                  <div className={styleHome.Logo}>
                     SGGW MeetApp{' '}
                     <Icon icon="bxs:book-reader" color="#85c9b9" />
                  </div>
                  <h2 className={style.Header}>Zarejestruj się w serwisie</h2>
                  <div className={styleRegister.ErrorContainer}>
                     {this.state.error && (
                        <p className={styleRegister.ErrorMessage}>
                           {this.state.error}
                        </p>
                     )}
                  </div>
                  <form onSubmit={e => this.handleSubmit(e)}>
                     <div className={style.LabelGroup}>
                        <label className={style.TextInputLabel}>Email</label>
                        <input
                           className={style.TextInput}
                           type="email"
                           name="email"
                           value={this.state.email}
                           onChange={e => this.getFormData(e)}
                        ></input>
                     </div>
                     <div className={style.LabelGroup}>
                        <label className={style.TextInputLabel}>Hasło </label>
                        <input
                           className={style.TextInput}
                           value={this.state.password}
                           type="password"
                           name="password"
                           onChange={e => this.getFormData(e)}
                        ></input>
                     </div>
                     <div className={style.LabelGroup}>
                        <label
                           className={style.TextInputLabel}
                           id={styleRegister.Password}
                        >
                           Powtórz hasło{' '}
                        </label>
                        <input
                           className={style.TextInput}
                           value={this.state.confirmPassword}
                           name="confirmPassword"
                           type="password"
                           onChange={e => this.getFormData(e)}
                        ></input>
                     </div>
                     <div className={style.LabelGroup}>
                        <label className={style.TextInputLabel}>Imię </label>
                        <input
                           className={style.TextInput}
                           value={this.state.userData.firstName}
                           type="text"
                           name="firstName"
                           onChange={e => this.getUserData(e)}
                        ></input>
                     </div>
                     <div className={style.LabelGroup}>
                        <label className={style.TextInputLabel}>
                           Nazwisko{' '}
                        </label>
                        <input
                           className={style.TextInput}
                           value={this.state.userData.lastName}
                           type="text"
                           name="lastName"
                           onChange={e => this.getUserData(e)}
                        ></input>
                     </div>
                     <div className={styleRegister.LabelGroupNumber}>
                        <label className={style.TextInputLabel}>Prefix </label>
                        <input
                           className={styleRegister.InputPrefix}
                           value={this.state.userData.phoneNumberPrefix}
                           type="tel"
                           name="phoneNumberPrefix"
                           onChange={e => this.getUserData(e)}
                        ></input>
                        <label className={styleRegister.NumberInputLabel}>
                           Numer telefonu{' '}
                        </label>
                        <input
                           className={styleRegister.InputNumber}
                           value={this.state.userData.phoneNumber}
                           type="tel"
                           name="phoneNumber"
                           onChange={e => this.getUserData(e)}
                        ></input>
                     </div>
                     <label className={style.CheckInputLabel}>
                        <input
                           className={style.CheckInput}
                           type="checkbox"
                           name="terms"
                           value={this.state.checked}
                           onChange={() => this.handleCheck()}
                        ></input>
                        <p style={{ margin: '0px' }}>
                           Akceptuje{' '}
                           <NavLink className={style.RegisterLink}>
                              {' '}
                              warunki korzystania{' '}
                           </NavLink>
                           z serwisu
                        </p>
                     </label>
                     <div className={style.Register}>
                        <p className={style.RegisterParagraph}>
                           Mam już konto -{' '}
                           <NavLink to="/login" className={style.RegisterLink}>
                              zaloguj
                           </NavLink>{' '}
                        </p>
                     </div>
                     <button className={style.FormLogInButton}>
                        {(this.state.loading && <SmallDualRingLoader />) ||
                           'Zarejestruj'}
                     </button>
                  </form>
               </div>
            </div>
            {this.state.redirect && <Navigate to="/login" replace={true} />}
         </div>
      );
   }
}
export default RegisterPage;
