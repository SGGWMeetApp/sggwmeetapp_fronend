import { useState, useEffect } from 'react';
import style from './Components.module.css';
import { DualRingLoader } from '../../Loaders/Loaders';
import { GoAlert } from 'react-icons/go';
import { IoLeafSharp } from 'react-icons/io5';

const Menu = ({ menu_url }) => {
   const [loading, setLoading] = useState(true);
   const [menu, setMenu] = useState(null);

   const fetchMenuData = async () => {
      const response = await fetch(menu_url, {});

      const result = await response.json();

      if (response.ok) {
         setMenu(result.menu);
         setLoading(false);
         console.log(result);
      }
      if (!response.ok) console.log(response);
   };

   useEffect(() => {
      console.log(menu_url);
      fetchMenuData();
   }, []);
   return (
      <div className={style.MenuContainer}>
         {!menu_url ? (
            <div className={style.MenuNotAvailable}>
               <GoAlert className={style.MenuAlertIcon} />
               <div className={style.MenuAlertWrapper}>
                  <h1>Aktualnie menu nie jest dostępne</h1>
                  <h2>Przepraszamy za niedogodności</h2>
               </div>
            </div>
         ) : loading ? (
            <DualRingLoader />
         ) : (
            <>
               {menu.map((object, index) => (
                  <div key={index} className={style.MenuWrapper}>
                     <div className={style.MenuHeader}>
                        <h1>{object.category}</h1>
                     </div>
                     <div className={style.MenuSection}>
                        {object.menuItems.map((el, index) => (
                           <div className={style.MenuDish} key={index}>
                              <div className={style.MenuDishImage}>
                                 <img src={el.images[0]} alt="Dish look"></img>
                              </div>
                              <div className={style.MenuDishData}>
                                 <div className={style.MenuDishHeader}>
                                    <p className={style.DishName}>{el.name}</p>
                                    <p className={style.DishAmount}></p>
                                 </div>
                                 <div className={style.MenuSectionDescribe}>
                                    <p className={style.DishDescribe}>
                                       {el.description}
                                    </p>
                                 </div>
                              </div>
                              <div className={style.DishPriceWrapper}>
                                 <p
                                    className={style.DishPrice}
                                 >{`${el.price} PLN`}</p>
                              </div>
                              {el.isVegan && (
                                 <IoLeafSharp
                                    className={style.DishIconVegan}
                                    title="Danie odpowiednie dla Wegan"
                                 />
                              )}
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </>
         )}
      </div>
   );
};

export default Menu;
