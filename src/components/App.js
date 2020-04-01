import React, { useState, useEffect } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import { without } from 'lodash';

function App() {

  const [myAppointments, updateMyAppointments] = useState([])

  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        const apts = data.map(item => item)
        updateMyAppointments(apts)
      })
  }, [])

  const deleteAppointment = apt => {
    let tempApts = myAppointments;
    tempApts = without(tempApts, apt);
    updateMyAppointments(tempApts)
  }

  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppointments />
              <SearchAppointments />
              <ListAppointments appointments={myAppointments}
                deleteAppointment={deleteAppointment} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
