import React, { Fragment, useEffect, useState, useCallback } from "react";
import moment from "moment";
import "./calendar.css";

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState(Date);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedMonthTotalDays, setSelectedMonthDayTotalDays] = useState<
    number
  >(0);
  const [calendarDates, setCalanderDates] = useState<number[]>([]);

  const _getCurrentState = () => {
    const dayList = moment(selectedDate).daysInMonth();
    setSelectedMonthDayTotalDays(dayList);
    let calendarDate = [];
    for (var i = 1; i <= selectedMonthTotalDays; i++) {
      calendarDate.push(i);
    }
    setCalanderDates(calendarDate);
  };
  const defaulSettings = useCallback(_getCurrentState, []);

  useEffect(() => {
    if (localStorage.getItem("SelectedDate")) {
      const newSelectedDate = localStorage.getItem("SelectedDate");
      newSelectedDate && setSelectedDate(newSelectedDate);
    }
    const month = moment(selectedDate).month();
    setSelectedMonth(month);
    defaulSettings();
  }, [defaulSettings]);

  const _changeDate = (newDate: number) => {
    const newSelectedDate = moment(selectedDate).date(newDate).toString();
    setSelectedDate(newSelectedDate);
    localStorage.setItem("SelectedDate", newSelectedDate);
  };

  const _checkSelectedDate = (item: number) => {
    return moment(selectedDate).date() === item;
  };

  const _changeMonth = (event: any) => {
    const val = event.target.value;
    const diff = selectedMonth - val;
    const newDate = moment(selectedDate).add(diff, "M");
    setSelectedMonth(val);
    _getCurrentState();
  };

  return (
    <Fragment>
      <h1>Calendar</h1>
      <br />
      <b> {selectedDate} </b>
      <select onClick={_changeMonth}>
        <option selected={selectedMonth === 9} value="9">
          October{" "}
        </option>
        <option selected={selectedMonth === 10} value="10">
          November{" "}
        </option>
        <option selected={selectedMonth === 11} value="11">
          December{" "}
        </option>
      </select>
      <b> {selectedMonth} </b>
      <br />
      <div id="çalendar">
        {calendarDates.map((item) => (
          <div
            className={`${_checkSelectedDate(item) ? "active" : ""}`}
            onClick={() => _changeDate(item)}
          >
            {" "}
            {item}
          </div>
        ))}
      </div>
    </Fragment>
  );
}
