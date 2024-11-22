import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoFilter } from 'react-icons/io5';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";


// ... (import statements)

// ... (import statements)

const History = () => {
  const [loading,setLoading]=useState(false);
  const [data, setData] = useState([]);
  const [filteredDate, setFilteredDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showCartNoInput, setShowCartNoInput] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showOrderIdInput, setShowOrderIdInput] = useState(false);

  const [inputValues, setInputValues] = useState({
    date: '',
    cartNo: '',
    phone: '',
    name: '',
    orderId: '',
    Payment:'',
  });

  useEffect(() => {
    const filterHistory = async () => {
      try {
        setLoading(true)
        const response = await axios.post(
          " https://tech-cart-6em1.vercel.app/filterHistory",
          inputValues
        );
        console.log(response.data)
        setLoading(fasle)
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error filtering history:', error);
      }
    };

    filterHistory();
  }, [inputValues]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/history');
        console.log('Items retrieved successfully:', response.data);
        setData(response.data);
        setFilteredData(response.data);
        
      } catch (error) {
        console.error('Error retrieving items:', error);
      }
    };
    fetchData();
  }, []);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setFilteredDate(selectedDate);
    // filterDataByDate(selectedDate);
    setInputValues({
      ...inputValues,
      date: selectedDate,
    });
    // Close other input boxes when date filter is opened
    closeOtherInputBoxes('date');
  };

  const handleInputChange = (inputName, value) => {
    setInputValues({
      ...inputValues,
      [inputName]: value,
    });
  };

  const handleFilterIconClick = (filterName) => {
    // Toggle the visibility of the input box for the clicked filter
    switch (filterName) {
      case 'cartNo':
        setShowCartNoInput(!showCartNoInput);
        closeOtherInputBoxes('cartNo');
        break;
      case 'name':
        setShowNameInput(!showNameInput);
        closeOtherInputBoxes('name');
        break;
      case 'phone':
        setShowPhoneInput(!showPhoneInput);
        closeOtherInputBoxes('phone');
        break;
      case 'orderId':
        setShowOrderIdInput(!showOrderIdInput);
        closeOtherInputBoxes('orderId');
        break;
      default:
        break;
    }
  };

  // const filterDataByDate = (selectedDate) => {
  //   if (selectedDate) {
  //     const updatedFilteredData = data.filter((item) => item.Date === selectedDate);
  //     setFilteredData(updatedFilteredData);
  //   } else {
  //     setFilteredData(data);
  //   }
  // };

  const closeOtherInputBoxes = (currentInput) => {
    // Close other input boxes based on the current input
    if (currentInput !== 'cartNo') setShowCartNoInput(false);
    if (currentInput !== 'name') setShowNameInput(false);
    if (currentInput !== 'phone') setShowPhoneInput(false);
    if (currentInput !== 'orderId') setShowOrderIdInput(false);
  };
  if(loading){
     return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </h1>
    );
  }  
 

  return (
    <div style={{ marginLeft: '5rem' }}>
      <div className="mt-14 ">
        <div className="block ">
          <h2 className="text-3xl font-bold">History</h2>
        </div>

        <table className="table mt-12" style={{ width: '100%' }}>
          <thead style={{ color: 'white' }}>
            <tr>
              <th>
                Date <IoFilter onClick={() => setShowDatePicker(!showDatePicker)} />
                {showDatePicker && (
                  <input
                    type="date"
                    value={filteredDate}
                    onChange={handleDateChange}
                   
                  />
                )}
              </th>
              <th>
                Cart NO <IoFilter onClick={() => handleFilterIconClick('cartNo')} />
                {showCartNoInput && (
                  <input
                    type="text"
                    value={inputValues.cartNo}
                    onChange={(e) => handleInputChange('cartNo', e.target.value)}
                   
                  />
                )}
              </th>
              <th>
                Name <IoFilter onClick={() => handleFilterIconClick('name')} />
                {showNameInput && (
                  <input
                    type="text"
                    value={inputValues.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                 
                  />
                )}
              </th>
             
              <th>Email</th>
              <th>
                Order ID <IoFilter onClick={() => handleFilterIconClick('orderId')} />
                {showOrderIdInput && (
                  <input
                    type="text"
                    value={inputValues.orderId}
                    onChange={(e) => handleInputChange('orderId', e.target.value)}
                   
                  />
                )}
              </th>
              <th>Amount</th>
             
              
            </tr>
          </thead>
          <tbody className="tbody">
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item.date}</td>
                <td>{item.Cartno}</td>
                <td>{item.Name}</td>
                
                <td>{item.Email}</td>
                <td><Link to={`/details/${item.OrderId}`}>{item.OrderId}</Link></td>
                <td>{item.Amount}</td>
               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;