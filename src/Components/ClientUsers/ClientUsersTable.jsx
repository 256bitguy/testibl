import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { getClientUsers, getUsers } from "../../Redux/Actions/AdminActions";
import ActionsMenu from "../ActionsMenu";

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
    backgroundColor: "#D1DAF0",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F5F5F5",
  },

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ClientUsersTable({ usersIds }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!getClientUsersResponse) {
      dispatch(getClientUsers(usersIds));
    }
  }, [dispatch]);

  const { getClientUsersLoading, getClientUsersResponse, getClientUsersError } =
    useSelector((state) => state.getClientUsers);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">User Name</StyledTableCell>
            <StyledTableCell align="center">Company</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!getClientUsersLoading &&
            getClientUsersResponse &&
            getClientUsersResponse.length > 0 &&
            getClientUsersResponse.map((user) => (
              <StyledTableRow key={user.get("userId")}>
                <StyledTableCell align="center" user="th" scope="row">
                  {user.get("name")}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {user.get("company")}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {user.get("role")}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <ActionsMenu
                    viewMoreLink={""}
                    handleUpdate={() => {}}
                    handleDelete={() => {}}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {getClientUsersLoading && (
        <Box sx={{ textAlign: "center", m: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {!getClientUsersLoading &&
        getClientUsersResponse &&
        getClientUsersResponse.length === 0 && (
          <Box sx={{ textAlign: "center", m: 5 }}>
            <Typography sx={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
              No Users Found
            </Typography>
          </Box>
        )}
    </TableContainer>
  );
}

export default ClientUsersTable;
