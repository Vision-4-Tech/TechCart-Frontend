import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  CircularProgress,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "1rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.9rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState({});
  const navigate = useNavigate()
  const handleClick = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  useEffect(() => {
    // Check if user details exist in localStorage
    const userDetails = localStorage.getItem("userDetails");

    if (userDetails == null) {
      // Navigate to login page if userDetails are not found
      navigate("/signin");
    } 
      // Parse userDetails from localStorage and update state
      
  }, [navigate]);

  const fetchData = () => {
    const data2 = JSON.parse(localStorage.getItem("userDetails"));
    if(data2){
       const id = data2._id;
       setLoading(true);
       const apiUrl = "https://tech-cart-6em1.vercel.app/histories/orders";

       axios
         .post(apiUrl, { id })
         .then((response) => {
           setData(response.data);
           localStorage.setItem("orders", JSON.stringify(response.data));
           setLoading(false);
         })
         .catch((error) => {
           console.error("API error:", error);
           setLoading(false);
         });
    }
    else{
      return
    }
    
    
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          paddingTop: "48px",
          // textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Orders
      </h1>
      <TableContainer
        component={Paper}
        elevation={4}
        style={{ padding: "10px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Products</StyledTableCell>
              <StyledTableCell align="center">Cart Number</StyledTableCell>
              <StyledTableCell align="center">Transaction ID</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => (
                <StyledTableRow
                  key={row.Product}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>{row.Date}</StyledTableCell>
                  <StyledTableCell align="right">{row.Amount}</StyledTableCell>
                  <StyledTableCell>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      <ListItemButton onClick={() => handleClick(row._id)}>
                        <ListItemText primary="View Products" />
                        {open[row._id] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={open[row._id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {row.Products.map((product, index) => (
                            <ListItemButton key={index} sx={{ pl: 4 }}>
                              <ListItemText
                                primary={`${product.Product} - ₹${product.Price}`}
                              />
                              <ListItemText
                                primary={`Qty: ${product.Quantity}`}
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </List>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Cartno}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.TransactionId}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
