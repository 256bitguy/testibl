import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { deleteSpare, getSpares } from "../../Redux/Actions/AdminActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteConfirmationDialog from "../../Utils/Layouts/DeleteConfirmationDialog";
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

function SparesTable() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [spareDeleteId, setSpareDeleteId] = useState("");

  const { getSparesLoading, getSparesResponse, getSparesError } = useSelector(
    (state) => state.getSpares
  );

  useEffect(() => {
    if (!getSparesResponse) {
      dispatch(getSpares());
    }
  }, [dispatch, getSparesResponse]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDialog = (spareId) => {
    setSpareDeleteId(spareId);
    setIsOpen(true);
  };

  const handleDeleteSpare = (spareId) => {
    dispatch(deleteSpare(spareId));
    setIsOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Spare Name</StyledTableCell>
            <StyledTableCell align="center">Spare Type</StyledTableCell>

            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!getSparesLoading &&
            getSparesResponse &&
            getSparesResponse.length > 0 &&
            getSparesResponse.map((spare) => (
              <StyledTableRow key={spare.get("spareId")}>
                <StyledTableCell align="center" user="th" scope="row">
                  {spare.get("name")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {spare.get("type")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  ₹ {spare.get("price")}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <ActionsMenu
                    viewMoreLink={``}
                    handleUpdate={`/update-spare/${spare.get("spareId")}`}
                    handleDelete={() => handleDialog(spare.get("spareId"))}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {getSparesLoading && (
        <Box sx={{ textAlign: "center", m: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {!getSparesLoading &&
        getSparesResponse &&
        getSparesResponse.length === 0 && (
          <Box sx={{ textAlign: "center", m: 5 }}>
            <Typography sx={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
              No Spares Found
            </Typography>
          </Box>
        )}
      <DeleteConfirmationDialog
        itemId={spareDeleteId}
        isOpen={isOpen}
        handleClose={handleClose}
        handleConfirm={handleDeleteSpare}
      />
    </TableContainer>
  );
}

export default SparesTable;
