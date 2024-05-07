import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [applications, setApplications] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  useEffect(() => {
    fetch('/applications')
     .then((res) => res.json())
     .then((data) => {
        setApplications(data);
      });
  }, []);
  return (
    <div className="max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6">
        {/* Card */}

        {applications.map(({ name, address, gender, createdAt}, index) => {
          return (
            <button onClick={e => {
              setName(name)
              setGender(gender)
              setAddress(address)
              setCreatedAt(new Date(createdAt))
              setShowModal(true)
            }}
              className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <h5
                className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {name}
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {address}
              </p>
              <div className='mt-auto'>
              </div>
            </button>
          );
        })}
      
    {
      showModal ?  <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none w-50 h-50 focus:outline-none"
      >
        <div className="relative w-30 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {name}
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
             <p className='text-black text-center'>Address: {address}</p>
            <p className='text-black text-center'>Gender: {gender}</p>
            <p className='text-black text-center'>Date Submitted:{createdAt.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'})}</p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
              onClick={e=> {
                async function approve(name,address,gender){
                  await fetch(`/applications/approve`, {
                    method: 'POST',
                    body: JSON.stringify({
                      name: name,
                      address: address,
                      gender: gender,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  window.location.reload();
                }
                approve(name,address,gender).then(res => res.json())
                .then(res => {setShowModal(false)});
              }}
                className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"

              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    
    </> : null}
    </div>
)}

export default App;
