import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

  const handleClick = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  useEffect(() => {
    const data2 = JSON.parse(localStorage.getItem("userDetails"));
    const id = data2._id;
    setLoading(true);
    const apiUrl = "https://tech-cart-6em1.vercel.app/histories/orders";

    axios
      .post(apiUrl, { id })
      .then((response) => {
        console.log("API response:", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Products</StyledTableCell>
            <StyledTableCell align="right">CartNo</StyledTableCell>
            <StyledTableCell align="right">TransactionId</StyledTableCell>
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

                <StyledTableCell style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
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
                      <ListItemText primary="Products" />
                      {open[row._id] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open[row._id]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {row.Products.map((product, index) => (
                          <ListItemButton key={index} sx={{ pl: 4 }}>
                            <ListItemText
                              primary={`${product.Product} - ${
                                product.Price 
                              }`}
                            />
                            <ListItemText
                              primary={`Qty - ${
                                 product.Quantity
                              }`}
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
  );
};

export default Orders;
