import React, { useContext, useState } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.context';

const GoodsComponent = (props) => {
 const { addGoods, removeGoods } = useContext(GoodsContext);
 const [isSelected, setIsSelected] = useState(false);

 const onClick = () => {
  setIsSelected((prevIsSelected) => {
   const newValue = !prevIsSelected;

   if (newValue) {
    addGoods(props);
   } else {
    removeGoods(props);
   }

   return newValue;
  });
 };

 const classNames = ['goods'];

 if (isSelected ) {
  classNames.push('selected');
 }

 return (
  <div className={classNames.join(' ')} onClick={onClick}>
   <img src={props.imageSrc} title={props.title} />
   <div className='goods-cost'>{props.cost}</div>
  </div>
 );
};

export default GoodsComponent;