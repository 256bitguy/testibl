import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import ActionsMenu from "../ActionsMenu";
import DeleteConfirmationDialog from "../../Utils/Layouts/DeleteConfirmationDialog";
import { deleteAsset } from "../../Redux/Actions/AdminActions";

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

const AssetTable = () => {
  const dispatch = useDispatch();

  const {
    getCompanyAssetsLoading,
    getCompanyAssetsResponse,
    getCompanyAssetsError,
  } = useSelector((state) => state.getCompanyAssets);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [assetId, setAssetId] = useState("");
  const handleClose = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleDialog = (assetId) => {
    setAssetId(assetId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteAsset = () => {
    dispatch(deleteAsset(assetId));
    setIsDeleteConfirmationOpen(false);
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Asset Name</StyledTableCell>
            <StyledTableCell align="center">Asset Type</StyledTableCell>

            <StyledTableCell align="center">Job Status</StyledTableCell>
            <StyledTableCell align="center">Job Queued Number</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!getCompanyAssetsLoading &&
            getCompanyAssetsResponse &&
            getCompanyAssetsResponse.length > 0 &&
            getCompanyAssetsResponse.map((asset) => (
              <StyledTableRow key={asset.get("assetId")}>
                <StyledTableCell align="center" component="th" scope="row">
                  {asset.get("name")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {asset.get("type")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {asset.get("jobStatus")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {asset.get("jobQueuedNumber")}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <ActionsMenu
                    viewMoreLink={`/asset-profile/${asset.get("assetId")}`}
                    handleUpdate={`/update-asset/${asset.get("assetId")}`}
                    handleDelete={() => handleDialog(asset.get("assetId"))}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {!getCompanyAssetsLoading &&
        getCompanyAssetsResponse &&
        getCompanyAssetsResponse.length === 0 && (
          <Box sx={{ textAlign: "center", m: 5 }}>
            <Typography sx={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
              No Assets Found
            </Typography>
          </Box>
        )}
      {getCompanyAssetsLoading && (
        <Box sx={{ textAlign: "center", m: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <DeleteConfirmationDialog
        itemId={assetId}
        isOpen={isDeleteConfirmationOpen}
        handleClose={handleClose}
        handleConfirm={handleDeleteAsset}
      />
    </TableContainer>
  );
};

export default AssetTable;
