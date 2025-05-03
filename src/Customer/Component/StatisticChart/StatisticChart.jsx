import React from 'react';
import './StatisticChart.scss';

const data = [
  { day: 'Mon', value: 5000 },
  { day: 'Tue', value: 4000 },
  { day: 'Wed', value: 10209 },
  { day: 'Thu', value: 5800 },
  { day: 'Fri', value: 6000 },
  { day: 'Sat', value: 3000 },
  { day: 'Sun', value: 4500 },
];

const StatisticChart = () => {
  return (
    <div className="chart-card">
      <h3>Statistic</h3>
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="bar-group">
            <div
              className={`bar ${item.day === 'Wed' ? 'highlight' : ''}`}
              style={{ height: `${item.value / 100}px` }}
            >
              {item.day === 'Wed' && <span className="bar-label">$10,209</span>}
            </div>
            <span className="bar-day">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticChart;
