import React from 'react';
import CalendarMoodmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import '../../styles/mood-map.css';

const today = new Date();

export default function ShowCalendar() {
  const randomValues = getRange(200).map(index => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3),
    };
  });
  return (
    <div>
      <h1>Your Mood Map</h1>
      <p>Random values with onClick and react-tooltip</p>
      <CalendarMoodmap
        startDate={shiftDate(today, -200)}
        endDate={today}
        values={randomValues}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={value => {
          return {
            'data-tip': `${value.date.toISOString().slice(0, 10)} Feeling that day: ${
              value.count
            }`,
          };
        }}
        showWeekdayLabels={true}
        onClick={value => alert(`Your mood this day: ${value.count}`)}
      />
      <ReactTooltip />
    </div>
  );
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
