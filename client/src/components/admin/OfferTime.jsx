// import React, { useState, useEffect } from 'react';

// function OfferTime() {
//   const [seconds, setSeconds] = useState(24 * 60 * 60); // 24 hours in seconds

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds(prevSeconds => {
//         if (prevSeconds === 0) {
//           clearInterval(interval);
//           // Perform any action once countdown is completed
//           // For re-rendering, you can use forceUpdate or useState trigger
//         }
//         return prevSeconds - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // Convert seconds to hours, minutes, and seconds
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = seconds % 60;

//   return (
//     <div>
//       <h1>Countdown Timer</h1>
//       <div>
//         <p>Hours: {hours}</p>
//         <p>Minutes: {minutes}</p>
//         <p>Seconds: {remainingSeconds}</p>
//       </div>
//     </div>
//   );
// }

// export default OfferTime;

// import React, { useState, useEffect } from 'react';

// function CountdownTimer() {
//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setTimeLeft(prevTimeLeft => {
//         const newTimeLeft = calculateTimeLeft();
//         if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
//           return calculateTimeLeft();
//         }
//         return newTimeLeft;
//       });
//     }, 1000);

//     return () => clearTimeout(timer);
//   });

//   function calculateTimeLeft() {
//     const difference = +new Date("2024-04-13") - +new Date();
//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60)
//       };
//     }

//     return timeLeft;
//   }

//   return (
//     <div>
//       <h1>Countdown Timer</h1>
//       {timeLeft.days > 0 && <p>Days: {timeLeft.days}</p>}
//       <p>Hours: {timeLeft.hours}</p>
//       <p>Minutes: {timeLeft.minutes}</p>
//       <p>Seconds: {timeLeft.seconds}</p>
//     </div>
//   );
// }

// export default CountdownTimer;

import React, { useState,useEffect } from 'react';
import axios from "axios";


// Admin Panel Component
function AdminPanel({ onSubmit }) {
  // const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/datetime/countdown', { time : time });
      console.log('Countdown time post successfully!');
    } catch (error) {
      console.error('Error setting countdown time:', error);
      console.log('Error setting countdown time. Please try again.');
    }
    if (time.trim() !== '') {
      onSubmit(time);
    }
  };
  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Countdown End Date :
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// User Panel Component
function UserPanel({ countdownEndDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(countdownEndDate) - new Date();
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { days, hours, minutes, seconds };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const [countdownTime, setCountdownTime] = useState('');
  useEffect(()=>{
    fetchCountdownTime();

    // Set up a timer to fetch countdown time every minute
    const timer = setInterval(fetchCountdownTime, 60000); // 60000 milliseconds = 1 minute

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  });
  const fetchCountdownTime = async () => {
    try {
      const response = await axios.get('http://localhost:8000/datetime/getCountdown');
      const { time } = response.data;
      setCountdownTime(time);
    } catch (error) {
      console.error('Error fetching countdown time:', error);
    }
  };

  return (
    <div>
      <h2>User Panel</h2>
      {timeLeft.days > 0 && <p>Days: {timeLeft.days}</p>}
      <p>Hours: {timeLeft.hours}</p>
      <p>Minutes: {timeLeft.minutes}</p>
      <p>Seconds: {timeLeft.seconds}</p>
      <p>Countdown Time: {countdownTime}</p>
    </div>
  );
}

// Main App Component
function App() {
  const [countdownEndDate, setCountdownEndDate] = useState(null);

  const handleDateSubmit = (date) => {
    setCountdownEndDate(date);
  };

  return (
    <div>
      <AdminPanel onSubmit={handleDateSubmit} />
      {countdownEndDate && <UserPanel countdownEndDate={countdownEndDate} />}
    </div>
  );
}

export default App;
