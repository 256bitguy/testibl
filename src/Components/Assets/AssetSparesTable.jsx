import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteAssetSpare, getSpares } from "../../Redux/Actions/AdminActions";
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

const AssetSparesTable = ({
  assetId,
  getAssetSparesLoading,
  getAssetSparesResponse,
}) => {
  const dispatch = useDispatch();

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [spareId, setSpareId] = useState("");

  const { getSparesLoading, getSparesResponse, getSparesError } = useSelector(
    (state) => state.getSpares
  );

  useEffect(() => {
    if (!getSparesResponse) {
      dispatch(getSpares());
    }
  }, [dispatch]);

  const handleClose = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleDialog = (spareId) => {
    setSpareId(spareId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteAssetSpare = () => {
    dispatch(deleteAssetSpare(assetId, spareId));
    setIsDeleteConfirmationOpen(false);
  };

  const renderSpareDetails = (spare) => {
    let spareDetails =
      !getSparesLoading &&
      getSparesResponse &&
      getSparesResponse.length > 0 &&
      getSparesResponse[
        getSparesResponse.map((spare) => spare.id).indexOf(spare.spareId)
      ];

    return (
      <StyledTableRow key={spare.spareId}>
        <StyledTableCell align="center" component="th" scope="row">
          {spareDetails && spareDetails.get("name")}
        </StyledTableCell>
        <StyledTableCell align="center">
          {spareDetails && spareDetails.get("type")}
        </StyledTableCell>
        <StyledTableCell align="center">
          ₹ {spareDetails && spareDetails.get("price")}
        </StyledTableCell>

        <StyledTableCell align="center">
          <ActionsMenu
            viewMoreLink={""}
            handleUpdate={""}
            handleDelete={() => handleDialog(spare.spareId)}
          />
        </StyledTableCell>
      </StyledTableRow>
    );
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
          {!getAssetSparesLoading &&
            getAssetSparesResponse &&
            getAssetSparesResponse.length > 0 &&
            getAssetSparesResponse.map((spare) => renderSpareDetails(spare))}
        </TableBody>
      </Table>
      {!getAssetSparesLoading &&
        getAssetSparesResponse &&
        getAssetSparesResponse.length === 0 && (
          <Box sx={{ textAlign: "center", m: 5 }}>
            <Typography sx={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
              No Spares Found
            </Typography>
          </Box>
        )}
      {getAssetSparesLoading && (
        <Box sx={{ textAlign: "center", m: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <DeleteConfirmationDialog
        itemId={spareId}
        isOpen={isDeleteConfirmationOpen}
        handleClose={handleClose}
        handleConfirm={handleDeleteAssetSpare}
      />
    </TableContainer>
  );
};

export default AssetSparesTable;
