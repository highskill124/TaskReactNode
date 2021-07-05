import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {
  CCol,
  CContainer,
  CRow,
  CCard,
  CCardBody
} from '@coreui/react'
import axios from "axios";

const Tasks = () => {

  const [number, setNumber] = useState(3);

  useEffect(() => {
    axios.post(`http://localhost:4000/api/getTasks`, {'number': number})
      .then(res => {

        // setNumber(number);
      })
  }, [])


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow>
          <CCol xs={4}>
            <CCard>
              <CCardBody>
                <p>Express-Delivery</p>
                <p>90 min express delivery</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={4}>
            <CCard>
              <CCardBody>
                <p>Express-Delivery</p>
                <p>90 min express delivery</p>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs={4}>
            <CCard>
              <CCardBody>
                <p>Express-Delivery</p>
                <p>90 min express delivery</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Tasks
