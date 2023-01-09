import React from 'react';
import style from '../LogInPage/LogInPage.module.css';
import styleRegister from './ResetPasswordPage.module.css';
import { Icon } from '@iconify/react';
import { NavLink, Navigate } from 'react-router-dom';
import styleHome from '../HomePage/HomePage.module.css';
import Navigation from '../LogInPage/Navigatio';
import { SmallDualRingLoader } from '../Loaders/Loaders';

const REGISTER_URL = 'http://3.68.195.28/passchange';

class ResetPasswordPage extends React.Component {
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
                  <h2 className={style.Header}>Zresetuj hasło</h2>
                  <h3 className={style.Header}>Podaj adres email, na który zostanie wysłany formularz resetowania hasła.</h3>
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
                     <button className={style.FormLogInButton}>
                        {(this.state.loading && <SmallDualRingLoader />) ||
                           'Resetuj hasło'}
                     </button>
                  </form>
               </div>
            </div>
            {this.state.redirect && <Navigate to="/login" replace={true} />}
         </div>
      );
   }
}
export default ResetPasswordPage;
