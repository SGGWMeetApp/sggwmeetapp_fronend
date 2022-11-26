import React from 'react';
import style from '../LogInPage/LogInPage.module.css';
import styleRegister from './RegisterPage.module.css';
import { Icon } from '@iconify/react';
import { NavLink, Navigate } from 'react-router-dom';
import styleHome from '../HomePage/HomePage.module.css';
import Navigation from '../LogInPage/Navigatio';

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
      };
   }

   getFormData(e) {
      this.setState((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
         error: null,
      }));
   }

   getUserData(e) {
      this.setState((prevState) => ({
         userData: {
            ...prevState.userData,
            [e.target.name]: e.target.value,
         },
         error: null,
      }));
   }

   async handleSubmit(e) {
      e.preventDefault();

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
         localStorage.setItem('user', JSON.stringify(json));
         <Navigate to="/login" />;
      }
      if (!response.ok) {
         this.setState({
            error: json.message,
         });
      }
   }

   render() {
      return (
         <div className={style.LogInContainer}>
            <div className={style.LogInBack}>
               <Navigation />
               <div
                  className={style.LogInWindow}
                  id={styleRegister.RegisterWindow}
               >
                  <div className={styleHome.Logo}>
                     Brand <Icon icon="bxs:book-reader" color="#85c9b9" />
                  </div>
                  <h2 className={style.Header}>Zarejestruj się w serwisie</h2>
                  <form onSubmit={(e) => this.handleSubmit(e)}>
                     <div className={style.LabelGroup}>
                        <label className={style.TextInputLabel}>Email</label>
                        <input
                           className={style.TextInput}
                           type="email"
                           name="email"
                           value={this.state.email}
                           onChange={(e) => this.getFormData(e)}
                        ></input>
                     </div>
                     <div className={style.LabelGroup}>
                        <label className={style.TextInputLabel}>Hasło </label>
                        <input
                           className={style.TextInput}
                           value={this.state.password}
                           type="password"
                           name="password"
                           onChange={(e) => this.getFormData(e)}
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
                           onChange={(e) => this.getFormData(e)}
                        ></input>
                     </div>
                     <div className={style.LabelGroup}>
                        <label className={style.TextInputLabel}>Imię </label>
                        <input
                           className={style.TextInput}
                           value={this.state.userData.firstName}
                           type="text"
                           name="firstName"
                           onChange={(e) => this.getUserData(e)}
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
                           onChange={(e) => this.getUserData(e)}
                        ></input>
                     </div>
                     <div className={styleRegister.LabelGroupNumber}>
                        <label className={style.TextInputLabel}>Prefix </label>
                        <input
                           className={styleRegister.InputPrefix}
                           value={this.state.userData.phoneNumberPrefix}
                           type="tel"
                           name="phoneNumberPrefix"
                           onChange={(e) => this.getUserData(e)}
                        ></input>
                        <label className={styleRegister.NumberInputLabel}>
                           Numer telefonu{' '}
                        </label>
                        <input
                           className={styleRegister.InputNumber}
                           value={this.state.userData.phoneNumber}
                           type="tel"
                           name="phoneNumber"
                           onChange={(e) => this.getUserData(e)}
                        ></input>
                     </div>
                     <div className={style.LabelGroup}>
                        <label className={style.TextInputLabel}>
                           Dodatkowe informacje{' '}
                        </label>
                        <input
                           className={style.TextInput}
                           value={this.state.userData.description}
                           type="text"
                           name="description"
                           onChange={(e) => this.getUserData(e)}
                        ></input>
                     </div>
                     <label className={style.CheckInputLabel}>
                        <input
                           className={style.CheckInput}
                           type="checkbox"
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
                        Zarejestruj
                     </button>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}
export default RegisterPage;
