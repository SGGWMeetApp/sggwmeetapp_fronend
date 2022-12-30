import React from 'react';
import style from './LogInPage.module.css';
import styleHome from '../HomePage/HomePage.module.css';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import Navigation from './Navigatio';

const LOGIN_URL = 'http://3.68.195.28/api/login_check';

class LogInPage extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         error: null,
      };
   }

   getFormData(e) {
      this.setState({
         [e.target.name]: e.target.value,
         error: null,
      });
   }

   async handleSubmit(e) {
      e.preventDefault();

      const response = await fetch(LOGIN_URL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            username: this.state.email,
            password: this.state.password,
         }),
      });

      const json = await response.json();
      if (response.ok) {
         localStorage.setItem('user', JSON.stringify(json));
         window.location.reload();
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
               <div className={style.LogInWindow}>
                  <div className={styleHome.Logo}>
                     SGGW MeetApp <Icon icon="bxs:book-reader" color="#85c9b9" />
                  </div>
                  <h2 className={style.Header}>Zaloguj się do serwisu</h2>
                  <form onSubmit={(e) => this.handleSubmit(e)}>
                     <div className={style.LabelGroup}>
                        <label className={style.TextInputLabel}>Email</label>
                        <input
                           className={style.TextInput}
                           value={this.state.email}
                           type="email"
                           name="email"
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
                     <label className={style.CheckInputLabel}>
                        <input
                           className={style.CheckInput}
                           type="checkbox"
                        ></input>
                        Nie wylogowywuj mnie na tym urządzeniu
                     </label>
                     <div className={style.Register}>
                        <p className={style.RegisterParagraph}>
                           Nie masz jeszcze konta -{' '}
                           <NavLink
                              to="/register"
                              className={style.RegisterLink}
                           >
                              zarejestruj
                           </NavLink>{' '}
                        </p>
                     </div>
                     <button className={style.FormLogInButton}>Zaloguj</button>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}
export default LogInPage;
