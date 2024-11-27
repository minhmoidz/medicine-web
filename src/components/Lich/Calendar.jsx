import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Calendar.scss';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([
    { date: dayjs().date(1).format('YYYY-MM-DD'), title: 'Ca làm sáng', shift: '06:00 - 12:00' },
    { date: dayjs().date(17).format('YYYY-MM-DD'), title: 'Ca làm sáng', shift: '06:00 - 12:00' },
    { date: dayjs().date(26).format('YYYY-MM-DD'), title: 'Ca làm chiều', shift: '12:00 - 18:00' },
    { date: dayjs().date(29).format('YYYY-MM-DD'), title: 'Ca làm tối', shift: '18:00 - 00:00' },
    { date: dayjs().date(5).format('YYYY-MM-DD'), title: 'Ca làm tối', shift: '18:00 - 00:00' },
    { date: dayjs().date(14).format('YYYY-MM-DD'), title: 'Ca làm tối', shift: '18:00 - 00:00' },
    { date: dayjs().date(20).format('YYYY-MM-DD'), title: 'Ca làm chiều', shift: '18:00 - 00:00' },
    { date: dayjs().date(30).format('YYYY-MM-DD'), title: 'Ca làm tối', shift: '18:00 - 00:00' },
  ]);

  useEffect(() => {
    const upcomingEvent = nextEvent();
    if (upcomingEvent.date) {
      toast.info(`Sự kiện kế tiếp: ${upcomingEvent.title} - ${dayjs(upcomingEvent.date).format('DD/MM/YYYY')}`);
    } else {
      toast.info('Không có ca làm tiếp theo!');
    }
  }, [events]);

  const generateDaysInMonth = () => {
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const daysInMonth = [];
    let day = startOfMonth;

    while (day.isBefore(endOfMonth, 'day')) {
      daysInMonth.push(day);
      day = day.add(1, 'day');
    }

    return daysInMonth;
  };

  const handleEventClick = (date) => {
    alert(`Sự kiện cho ngày ${date.format('DD/MM/YYYY')}`);
  };

  const generateScheduleTable = () => {
    const shifts = [
      '06:00 - 12:00',
      '12:00 - 18:00',
      '18:00 - 00:00',
      '00:00 - 06:00',
    ];

    return (
      <table className="scheduleTable">
        <thead>
          <tr>
            <th>Ca làm</th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
            <th>Chủ nhật</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift, index) => (
            <tr key={index}>
              <td>{shift}</td>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <td
                  key={i}
                  className={events.some(
                    event =>
                      dayjs(event.date).day() === i &&
                      event.shift === shift
                  )
                    ? 'highlight'
                    : ''}
                >
                  {events.some(
                    event =>
                      dayjs(event.date).day() === i &&
                      event.shift === shift
                  )
                    ? 'Có ca làm'
                    : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const nextEvent = () => {
    const upcomingEvent = events.find(event => dayjs(event.date).isAfter(dayjs()));
    return upcomingEvent ? upcomingEvent : { title: 'Không có ca làm tiếp theo', date: '' };
  };

  return (
    <div className="calendarContainer">
      <ToastContainer />
      <div className="calendar">
        <div className="monthHeader">
          <button onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}>{"<"}</button>
          <h3>{currentDate.format('MMMM YYYY')}</h3>
          <button onClick={() => setCurrentDate(currentDate.add(1, 'month'))}>{">"}</button>
        </div>
        <div className="daysGrid">
          {generateDaysInMonth().map((day) => (
            <div
              key={day.format('YYYY-MM-DD')}
              className={`day ${day.isSame(dayjs(), 'day') ? 'today' : ''} ${
                events.some(event => event.date === day.format('YYYY-MM-DD')) ? 'hasEvent' : ''
              }`}
              onClick={() => handleEventClick(day)}
            >
              <span>{day.date()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bảng thời khóa biểu */}
      <div className="scheduleSection">
        <h3>Thời khóa biểu</h3>
        {generateScheduleTable()}
      </div>

      {/* Thông báo lịch tiếp theo */}
      <div className="nextEventSection">
        <h3>Lịch kế tiếp</h3>
        <p>{nextEvent().title} - {nextEvent().date ? dayjs(nextEvent().date).format('DD/MM/YYYY') : 'Không có sự kiện'}</p>
      </div>
    </div>
  );
};

export default Calendar;
