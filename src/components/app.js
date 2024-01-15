import React, { useState } from 'react';
import * as uuid from 'uuid';
import GoodsComponent from './goods';
import CounterComp from './counter';
import './style.css';
import GoodsMock from './goodsMock.json';
import GoodsContext from '../context/goods.context';
import CampComponent from './camp';

const goods = GoodsMock.map(el => ({
 ...el,
 id: uuid.v1()
}));

const AppComponent = () => {
 const [data, setData] = useState(goods);
 const [selectedGoods, setSelectedGoods] = useState([]);

 const addGoods = (item) => {
  setSelectedGoods((prevSelectedGoods) => [...prevSelectedGoods, item]);
 };

 const removeGoods = (item) => {
  setSelectedGoods((prevSelectedGoods) => prevSelectedGoods.filter(el => item.id !== el.id));
 };

 const removeAllGoods = () => {
  setData((prevData) => prevData.filter(el => !selectedGoods.find(item => item.id === el.id)));
  setSelectedGoods([]);
 };

 const autoDetectCombination = () => {
  console.log('Button clicked!'); // Додано для перевірки

  const targetSum = 40;

  // Перевірка, чи поточна сума не перевищує 40
  const currentSum = selectedGoods.reduce((acc, cur) => acc + cur.cost, 0);
  if (currentSum === targetSum) {
    console.log('Already reached the target sum of 40');
    return;
  }

  const findCombination = (arr, target, partial = []) => {
    const currentSum = partial.reduce((acc, cur) => acc + cur.cost, 0);

    if (currentSum === target) {
      setSelectedGoods(partial);
      return true;
    }

    if (currentSum > target) {
      return false;
    }

    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = arr.slice(i + 1);
      const newPartial = [...partial, current];

      if (findCombination(remaining, target, newPartial)) {
        return true;
      }
    }

    return false;
  };

  // Викликаємо рекурсивну функцію для пошуку комбінації
  findCombination(data, targetSum);
};

 return (
  <div className='app'>
   <div className='wrapper'>
    <GoodsContext.Provider value={{
     selectedGoods: selectedGoods,
     addGoods,
     removeGoods,
     removeAllGoods,
     autoDetectCombination,
    }}>
     <CounterComp />
     <div className='goods-wrapper'>
      {data.map(el => <GoodsComponent {...el} key={el.id} />)}
     </div>
     <CampComponent />
    </GoodsContext.Provider>
   </div>
  </div>
 );
};

export default AppComponent;