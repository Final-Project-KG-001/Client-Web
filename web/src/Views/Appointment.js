import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Navigation from "../components/Navigation";

const SUBSCRIBE_NEW_APPOINTMENT = gql`
  subscription onAppointmentAdded {
    newAppointment {
      _id
      userId
      doctorId
      queueNumber
      status
      createdAt
      doctor {
        name
        polyclinic
      }
      user {
        name
      }
    }
  }
`;

const SUBSCRIBE_NEW_DENTAL = gql`
  subscription onDentalAdded {
    newDental {
      _id
      appointmentId
    }
  }
`;

const SUBSCRIBE_NEW_GENERAL = gql`
  subscription onGeneralAdded {
    newGeneral {
      _id
      appointmentId
    }
  }
`;

const GET_APPOINTMENTS = gql`
  query Appointments($access_token: String) {
    appointments(access_token: $access_token) {
      _id
      userId
      doctorId
      queueNumber
      status
      createdAt
      doctor {
        name
        polyclinic
      }
      user {
        name
      }
    }
    dentals(access_token: $access_token) {
      _id
      appointmentId
    }
    generals(access_token: $access_token) {
      _id
      appointmentId
    }
  }
`;

function Appointment() {
  const [ date, setDate ] = useState("");
  const { loading, error, data, subscribeToMore } = useQuery(GET_APPOINTMENTS, {
    variables: {
      access_token: localStorage.getItem('access_token')
    }
  });

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_NEW_APPOINTMENT,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) {
          return prev;
        }

        const newAppointment = subscriptionData.data.newAppointment;

        return {
          ...prev,
          appointments: [ ...prev.appointments, newAppointment ]
        };
      }
    });

    subscribeToMore({
      document: SUBSCRIBE_NEW_DENTAL,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) {
          return prev;
        }
        const newDental = subscriptionData.data.newDental;

        return {
          ...prev,
          dentals: [ ...prev.dentals, newDental ]
        };
      }
    });

    subscribeToMore({
      document: SUBSCRIBE_NEW_GENERAL,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) {
          return prev;
        }
        const newGeneral = subscriptionData.data.newGeneral;

        return {
          ...prev,
          generals: [ ...prev.generals, newGeneral ]
        }
      }
    });
  }, [ subscribeToMore ])

  const allOnBoardPasien = [];
  if (data) {
    if (data.dentals && data.dentals.length !== 0) {
      data.dentals.forEach((appointment) => allOnBoardPasien.push(appointment));
    }
    if (data.generals && data.generals.length !== 0) {
      data.generals.forEach((appointment) =>
        allOnBoardPasien.push(appointment)
      );
    }
  }

  function getDate() {
    const now = new Date();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "Apryl",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = days[ now.getDay() ];
    const today = now.getDate();
    const month = months[ now.getMonth() ];
    const year = now.getFullYear();

    return `${ day },   ${ today }   ${ month }   ${ year }`;
  }
  useEffect(() => {
    setDate(getDate);
  }, []);

  return (
    <>
      <Navigation />
      <div className="div-information container">
        { error && <Error /> }
        <h1>Appointments Table</h1>
        <p className="div-date">{ date }</p>
        { loading && <Loading /> }
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Pasien</th>
              <th scope="col">Polyclinic</th>
              <th scope="col">Doctor</th>
              <th scope="col">Booked Time</th>
              <th scope="col">Status</th>
              <th scope="col">Queue Number</th>
              <th scope="col">Attendance</th>
            </tr>
          </thead>
          <tbody>
            { data &&
              allOnBoardPasien &&
              data.appointments.map((data, index) => (
                <tr
                  key={ index }
                  style={
                    data.doctor[ 0 ].polyclinic === "umum"
                      ? { backgroundColor: "#85a392" }
                      : { backgroundColor: "#dee3e2" }
                  }
                >
                  <td>{ index + 1 }</td>
                  <td>{ data.user[ 0 ].name }</td>
                  <td>{ data.doctor[ 0 ].polyclinic }</td>
                  <td>{ data.doctor[ 0 ].name }</td>
                  <td>{ data.createdAt }</td>
                  { data.status === "on process" ? (
                    <td style={ { color: "#006a71" } }>{ data.status }</td>
                  ) : data.status === "done" ? (
                    <td style={ { color: "#ea5455" } }>{ data.status }</td>
                  ) : (
                        <td style={ { color: "#fa7d09" } }>{ data.status }</td>
                      ) }

                  <td>{ data.queueNumber }</td>
                  { allOnBoardPasien.find(
                    (pasien) => pasien.appointmentId === data._id
                  ) ? (
                      <td>on board</td>
                    ) : (
                      <td>off board</td>
                    ) }
                </tr>
              )) }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Appointment;
