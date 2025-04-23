import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useIsAuth } from '@/hooks/useIsAuth'
import { PieChart , pieArcLabelClasses} from '@mui/x-charts/PieChart'
const base_url = import.meta.env.VITE_BASE_API_URL
const Dashboard = () => {
 useIsAuth()
 const palette = ['rgb(255,152,0)', 'rgb(118,106,241)'];
 const pieParams = {
  height: 210,
  margin: { right: 5 },
  // hideLegend: true,
};

const platforms = [
  {
      label: 'Completed Task',
      value: 20,
  },
  {
      label: 'Pending Task',
      value: 80,
  },
];


  const [todayDate ] = useState(new Date().toISOString().split('T')[0])
  return (
    <div className="flex h-full flex-col">

      <div className=' grid grid-cols-2 gap-5'>
        <div className='shadow-[0px_0px_20px_10px_rgba(0,_0,_0,_0.1)] rounded-lg mx-1 mt-2 p-3'>
          <div className='font-bold text-xl flex justify-around'>
            <div>
              Task status hour wise 
            </div>
            <div>
                {todayDate}
            </div>
          </div>
          <div >
          <PieChart
            colors={palette}
            series={[
              {
                data: platforms,
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
            {...pieParams}
          />
          </div>
          
        </div>
        <div className='shadow-[0px_0px_20px_10px_rgba(0,_0,_0,_0.1)] rounded-lg mx-1 mt-2 p-3'>
        <div className='font-bold text-xl flex justify-around'>
            <div>
              Task status Day wise
            </div>
            <div>
                {todayDate}
            </div>
          </div>
          <PieChart
            colors={palette}
            series={[
              {
                arcLabel: (item) => `${item.value}%`,
                data: platforms,
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: 'bold',
                fill : "white"
              },
            }}
            {...pieParams}
          />
        </div>
        <div className='shadow-[0px_0px_20px_10px_rgba(0,_0,_0,_0.1)] rounded-lg mx-1 mt-2 p-3'>
          <div className='font-bold text-xl flex justify-around'>
            <div>
              Task status Week wise
            </div>
            <div>
                <EndOfWeek/>
            </div>
          </div>
          <PieChart
            colors={palette}
            series={[
              {
                data: platforms,
                highlightScope: { fade: 'global', highlight: 'item' },
              },

            ]}
            {...pieParams}
          />
        </div>
        <div className='shadow-[0px_0px_20px_10px_rgba(0,_0,_0,_0.1)] rounded-lg mx-1 mt-2 p-3'>
          <div className='font-bold text-xl flex justify-around'>
            <div>
              Task status Month wise
            </div>
            <div>
                <EndOfMonth/>
            </div>
          </div>
          
          <PieChart
            colors={palette}
            series={[
              {
                data: platforms,
                highlightScope: { fade: 'global', highlight: 'item' },
              },

            ]}
            {...pieParams}
          />
        </div>

      </div>
    </div>
  )
}

export default Dashboard

// WeekEndDate.jsx
const EndOfWeek = () => {
  const today = new Date();

  // Sunday as end of the week
  const endOfWeekDate = new Date(today);
  endOfWeekDate.setDate(today.getDate() + (7 - today.getDay()));

  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <p>
     <strong>{formatter.format(endOfWeekDate)}</strong>
    </p>
  );
};

// MonthEndDate.jsx
const EndOfMonth = () => {
  const today = new Date();

  // Last day of the current month
  const endOfMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <p>
     <strong>{formatter.format(endOfMonthDate)}</strong>
    </p>
  );
};
