import React, {useEffect, useState} from 'react'
import {
  CCol,
  CContainer,
  CRow,
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CButton
} from '@coreui/react'
import axios from "axios";
import './tasks.scss';

const Tasks = () => {

  // const [number, setNumber] = useState(3);
  const [modal, setModal] = useState(false)
  const [tasks, setTasks] = useState(null);
  const [title, setTitle] = useState('');
  const [uuid, setUuid] = useState('');
  const [taskId, setTaskId] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4000/api/getTasks`, {
      params: {
        number: 9
      }
    })
      .then(res => {
        setTasks(res.data);
      })
  }, [])

  function TaskDetail(title, index, task_id) {
    setTitle(title);
    setUuid(index);
    setTaskId(task_id);
    setModal(!modal);
  }

  const completed = async () => {
    axios.put(`http://localhost:4000/api/completed`, {'taskID': taskId})
      .then(res => {
        let newArr = [...tasks];
        for (let i = 0; i < tasks.length; i++){
          if(newArr[i]._id === taskId){
            newArr[i].mark= 1;
          }
        }
        setTasks(newArr);
        setModal(!modal);
      })
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow>
          {tasks && tasks.map((task, index) =>
            <CCol xs="12" sm="6" md="4" key={index}>
              <CCard className="task-card" onClick={() => TaskDetail(task.title, index + 1, task._id)}>
                <CCardBody>
                  <p className={task.mark ? "uuidStyle" : ""}><b>Task #{index + 1}</b></p>
                  <p>{task.title}</p>
                </CCardBody>
              </CCard>
            </CCol>
          )}
        </CRow>

        <CModal
          show={modal}
          onClose={setModal}
          className='modal'
        >
          <CModalBody>
            <h4>Task {uuid} - a {title}</h4>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" size='sm' onClick={() => completed()}>Complete</CButton>{' '}
            <CButton
              color="secondary"
              size='sm'
              onClick={() => setModal(false)}
            >Close</CButton>
          </CModalFooter>
        </CModal>

      </CContainer>
    </div>
  )
}

export default Tasks
