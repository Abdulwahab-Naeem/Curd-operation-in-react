import React, { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  let [formData, setFormData] = useState({
    uname: '',
    uemail: '',
    uphone: '',
    umessage: '',
    index: '',
  });
  let [userData, setUserData] = useState([]);

  let getValue = (event) => {
    let oldData = { ...formData };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
   
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    let currentuserformdata = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umessage: formData.umessage,
    };
        if(formData.index===""){
    let filteruser=userData.filter((v)=>v.uemail==formData.uemail || v.uphone==formData.uphone);
    if(filteruser.length==1){
 
      toast.error("'Email or Phone Number Exist!");
    }
    else{
    let oldUserData = [...userData, currentuserformdata];
    console.log(oldUserData);
    setUserData(oldUserData);
    event.preventDefault();
    setFormData({
      uname: '',
    uemail: '',
    uphone: '',
    umessage: '',
    index: '',
     })}}
     else{
    
       let editIndex=formData.index;
       let oldData=userData;
       let filteruser=userData.filter((v,i)=>(v.uemail==formData.uemail || v.uphone==formData.uphone)
       && i!=editIndex  )
       if(filteruser.length==0){
         oldData[editIndex]['uname']=formData.uname;
         oldData[editIndex]['uemail']=formData.uemail;
         oldData[editIndex]['uphone']=formData.uphone;
         oldData[editIndex]['umessage']=formData.umessage;
         setUserData(oldData);
         setFormData({
          uname: '',
        uemail: '',
        uphone: '',
        umessage: '',
        index: '',
         })
         toast.success("Successfully Updated!");
     }
    else{
      toast.error("'Email or Phone Number Already Exist!");
    }
    }
    };
    let DeleteRow=(indexNumber)=>{
      //  alert(indexNumbber);
      let DeleteAfterfilter=userData.filter((v,i)=>i!=indexNumber)
      console.log(DeleteAfterfilter);
      setUserData(DeleteAfterfilter);
      toast.success("'Succesfully Deleted!");
    }
let editRow=(indexNumber)=>{
  // alert(indexNumber)
  let editRow=userData.filter((v,i)=>i==indexNumber)[0];
  // console.log(editRow);
  editRow['index']=indexNumber;
  setFormData(editRow);
}
  return (
    
    
    <div className="App">
      <h1>Curd Operation With Form</h1>
      {userData.length}
      <div className="contact-form-container">
      <ToastContainer />
        <form id="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={getValue}
            value={formData.uname}
            id="name"
            name="uname"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={getValue}
            value={formData.uemail}
            id="email"
            name="uemail"
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            onChange={getValue}
            value={formData.uphone}
            id="phone"
            name="uphone"
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            onChange={getValue}
            value={formData.umessage}
            name="umessage"
            rows="4"
            required
          ></textarea>

          <button type="submit">{formData.index !== '' ? 'Update' : 'Save'}</button>
        </form>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.length >= 1 ? (
                <>
                  {userData.map((user, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.uname}</td>
                        <td>{user.uemail}</td>
                        <td>{user.uphone}</td>
                        <td>{user.umessage}</td>
                        <td>
                          <button  onClick={()=>editRow(index)}>Update</button>
                          <button onClick={()=>DeleteRow(index)}>Delete</button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan="6">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
