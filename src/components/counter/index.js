// Counter Component
import React, { useContext } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.context';
import GoodsComponent from '../goods';

const CounterComponent = () => {
  const { selectedGoods, autoDetectCombination } = useContext(GoodsContext);
  const sum = Math.min(selectedGoods.reduce((acc, cur) => acc + cur.cost, 0), 40);

  const handleAutoDetect = () => {
    if (sum < 40) {
      autoDetectCombination();
    }
  };

  return (
    <div className='cost-wrapper'>
      <div>{sum}/40</div>
      <div className='auto-detect' onClick={handleAutoDetect}>auto-detect</div>
      <div className='selected-goods'>
        {selectedGoods.map(el => (
          <GoodsComponent {...el} key={'selected' + el.id} />
        ))}
      </div>
    </div>
  );
};

export default CounterComponent;
