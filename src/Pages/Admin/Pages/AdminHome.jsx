    import NoticeBoard from "../Components/NoticeBoard.jsx";
    import TopPerformer from "../Components/TopPerformer.jsx";

    import UpperNavbar from "../Components/UpperNavbar.jsx";
    import SideNavbar from "../../../components/SideNavbar.jsx";
    import DataCard from "../Components/DataCard.jsx";
    import AttendanceGraph from "../Components/AttendanceGraph.jsx";
    import "./AdminHome.css";
    import { useAuth } from "../../../context/auth.jsx";
    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import CardWithPopUp from "../Components/CardWithPopUp.jsx";


    const AdminHome = () => {
      const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

      const [alerts, setAlerts] = useState([]);
      const PlaySound = ()=>{
        const audio = new Audio("https://upload.wikimedia.org/wikipedia/commons/8/81/Alarm_or_siren.ogg");
        audio.play()
      }
      const sendMail = async () => {
        setLoading(true);
        setStatus('');
    
        try {
          // Call the backend endpoint to send the mail
          const response = await axios.get('http://localhost:3000/mail');
    
    
          if (response.status === 200) {
            setStatus('Email sent successfully!');
            console.log(response);
            
          } else {
            setStatus('Failed to send email.');
          }
        } catch (error) {
          console.error('Error sending email:', error);
          setStatus('Error sending email. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      const [SMSstatus, SMSsetStatus] = useState("");
  const [SMSloading, SMSsetLoading] = useState(false);


  const sendSMS = async () => {
    SMSsetLoading(true);
    SMSsetStatus("");

    try {
      const response = await axios.post("http://localhost:3000/send-sms", {
        to: "+917778005062", // Replace with recipient's phone number
        body: "Ahoy 👋 hii abhay", // Replace with the message body
      });

      if (response.data.success) {
        setStatus("SMS sent successfully!");
      } else {
        setStatus("Failed to send SMS.");
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

      // Fetch alerts from the backend
      const fetchAlerts = async () => {
          try {
              const response = await axios.get('http://localhost:3000/emergency/admin');
              setAlerts(response.data);
          } catch (error) {
              console.error('Error fetching alerts:', error);
          }
      };
  
      useEffect(() => {
          // Initial fetch of alerts
          fetchAlerts();
  
          // Auto refresh every 10 seconds
          const intervalId = setInterval(fetchAlerts, 10000);
  
          // Cleanup interval when component unmounts
          return () => clearInterval(intervalId);
      }, []);
  
      // Delete alert by ID
      const handleDelete = async (id) => {
          try {
              await axios.delete(`http://localhost:3000/emergency/admin/${id}`);
           toast.success("Deleted succesfully")
              // Remove the deleted alert from state
              setAlerts(alerts.filter((alert) => alert._id !== id));
          } catch (error) {
              console.error('Error deleting alert:', error);
              alert('Failed to delete alert');
          }
      };
      return (
        <>
          <div className="   w-screen h-screen" id="main-home-window">
            <div className="bg-red" id="side-nav-container">
              <div className="h-screen flex fixed">
                <SideNavbar />
              </div>
            </div>
            <div className="h-screen  " id="middle-container">
              {/* <div id="upper-nav" className="">
                <div id="upperNav" className="flex w-3/4 h-auto">
                  <UpperNavbar />
                </div>
              </div> */}
              <div id="main-container" className="bg-green-500">
                <div
                
                  id="middle-left "
                  className=" h-screen bg-white p-5 shadow-2xl"
                >
                  <DataCard />

                  <div className="flex flex-col" id="top-performer">
                    <h1 className="text-xl font-bold pt-5">Top Performers</h1>
                    <div className="w-9/12  h-1/5  overflow-hidden no-scrollbar mb-2  overflow-y-auto  rounded-md p-5 mt-5 ">
                      {/* {auth?.token
                        ? (console.log("auth.email exists:", auth.token),
                          (
                            <> */}
                              <TopPerformer />
                            
                          {/* ))
                        : (navigate("/login/admin"),
                          console.log("Rendering TopPerformer"))} */}
                    </div>

                    <div className="  p-2  w-3/4 flex flex-col mt-2   ">
                      <NoticeBoard />
                    </div>
                  </div>
                </div>

                <div id="middle-right" className="bg-black shadow-xl ">
                <div className=" h-full overflow-hidden flex flex-col bg-white min-h-screen w-full p-6">
                <button
        onClick={sendMail}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Sending...' : 'Email parents'}
      </button>
      {status && <p >{status}</p>}
      <button style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#0000FF',
          color: '#fff',
          marginTop:'5px',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }} onClick={sendSMS} disabled={loading}>
        {loading ? "Sending..." : "Send SMS"}
      </button>
      {SMSstatus && <p>{SMSstatus}</p>}


      
  <h2 className="text-xl font-bold text-red-500 mb-6">
    Emergency Notifications
    
<button type="button" className="bg-blue-300

 text-gray-500 px-5 mt-5 border-none rounded-lg  py-1" onClick={sendMail}>Inform Parents </button>
  </h2>

<div className="h-96 w-full mx-1 rounded p-2 flex flex-col items-center shadow-lg">
 
  <div className=" bg-red-100 rounded-full w-20 h-20 mb-5">
  <img onClick={PlaySound}  src="https://cdn-icons-png.flaticon.com/128/2014/2014825.png"></img>
  </div>



  {
    alerts.map((alert)=>
      (
        <>
        <div className="h-22rounded-md bg-white rounded  shadow-2xl border-blue-500    border sha flex justify-between w-full items-center mb-2">
  
  <div className="p-2 w-full h-full flex flex-col">
  
  <p className="text-sm   text-gray-600">
            <strong className="font-medium text-gray-800">Type:</strong> {alert.emergencyType}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Severity:</strong> {alert.severity}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Location:</strong> {alert.location}
          </p>
          
  
  </div>
  <div className="pr-1 w-5/4 flex items-center justify-center h-full">
  <button
          onClick={() => handleDelete(alert._id)}
          className="bg-red-500 text-white text-sm font-medium px-2 py-1 rounded-lg shadow hover:bg-red-600 transition-colors duration-200"
        >
          Delete
        </button>
  </div>
   </div>
        </>
      )
      

  )}
</div>






  {/* <div className="grid grid-cols-1 gap-6">
    {alerts.map((alert) => (
      <div
        key={alert._id}
        className="p-5 shadow-lg rounded-lg flex justify-between items-center border border-gray-200"
      >     
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Type:</strong> {alert.emergencyType}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Severity:</strong> {alert.severity}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Location:</strong> {alert.location}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Created At:</strong>{' '}
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => handleDelete(alert._id)}
          className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    ))}
  </div> */}
</div>

                </div>
              </div>
            </div>
          </div>
        </>
      );
    };

    export default AdminHome;
