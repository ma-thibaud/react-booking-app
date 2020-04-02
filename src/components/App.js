import React, { useState, useEffect } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import { without, findIndex } from 'lodash';

function App() {

  const [myAppointments, updateMyAppointments] = useState([])
  const [formDisplay, updateFormDisplay] = useState(false)
  const [orderBy, updateOrderBy] = useState('aptDate')
  const [orderDir, updateOrderDir] = useState('desc')
  const [queryText, updateQueryText] = useState('')
  const [lastIndex, updateLastIndex] = useState(0)

  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        const apts = data.map((item, index) => {
          item.aptId = index
          updateLastIndex(index + 1)
          return item
        });
        updateMyAppointments(apts)
      })
  }, [])

  // Edit appointment infos
  const updateInfo = (name, value, id) => {
    let tempApts = myAppointments;
    let aptIndex = findIndex(myAppointments, {
      aptId: id
    });
    console.log(tempApts[aptIndex])
    tempApts[aptIndex][name] = value;
      updateMyAppointments(tempApts);
  }

  // Close form after Submit
  const toggleForm = () =>
    updateFormDisplay(!formDisplay)

  // Add appointment
  const addAppointment = apt => {
    let tempApts = myAppointments;
    apt.aptId = lastIndex
    // updateLastIndex(lastIndex + 1)
    tempApts.unshift(apt)
    updateMyAppointments(tempApts)
    console.log(myAppointments)
  }

  // Delete appointments
  const deleteAppointment = apt => {
    let tempApts = myAppointments;
    tempApts = without(tempApts, apt);
    updateMyAppointments(tempApts)
  }

  // Filter appointments
  const searchApts = query =>
    updateQueryText(query)

  const changeOrder = (order, dir) => {
    updateOrderBy(order);
    updateOrderDir(dir)
  }
  
  let order;
  let filteredApts = myAppointments;
  orderDir === 'asc' ? order = 1 : order  = -1;

  filteredApts = filteredApts.sort((a,b) => {
    return a[orderBy].toLowerCase() < b[orderBy].toLowerCase()
    ? -1 * order
    : 1 * order;
  }).filter(eachItem => {
    return(
      eachItem['petName']
        .toLowerCase()
        .includes(queryText.toLowerCase()) ||
      eachItem['ownerName']
        .toLowerCase()
        .includes(queryText.toLowerCase()) ||
      eachItem['aptNotes']
        .toLowerCase()
        .includes(queryText.toLowerCase())
    )
  })

  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppointments
                formDisplay={formDisplay}
                toggleForm={toggleForm}
                addAppointment={addAppointment}
              />
              <SearchAppointments
                orderBy={orderBy}
                orderDir={orderDir}
                changeOrder={changeOrder}
                searchApts={searchApts}
              />
              <ListAppointments
                appointments={filteredApts}
                deleteAppointment={deleteAppointment}
                updateInfo={updateInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
