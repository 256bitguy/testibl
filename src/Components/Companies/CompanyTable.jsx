import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  tableCellClasses,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../../Redux/Actions/AdminActions";
import ActionsMenu from "../ActionsMenu";
import DeleteConfirmationDialog from "../../Utils/Layouts/DeleteConfirmationDialog";

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

function CompanyTable() {
  const dispatch = useDispatch();

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [companyId, setCompanyId] = useState("");

  useEffect(() => {
    if (!getCompaniesResponse) {
      dispatch(getCompanies());
    }
  }, [dispatch]);

  const { getCompaniesLoading, getCompaniesResponse, getCompaniesError } =
    useSelector((state) => state.getCompanies);

  const handleClose = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleDialog = (companyId) => {
    setCompanyId(companyId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteCompany = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Company Name</StyledTableCell>
            <StyledTableCell align="center">Industory</StyledTableCell>

            <StyledTableCell align="center">Users In Company</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!getCompaniesLoading &&
            getCompaniesResponse &&
            getCompaniesResponse.length > 0 &&
            getCompaniesResponse.map((company) => (
              <StyledTableRow key={company.get("companyId")}>
                <StyledTableCell align="center" component="th" scope="row">
                  {company.get("name")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {company.get("industory")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {company.get("users") && company.get("users").length}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <ActionsMenu
                    viewMoreLink={`/company-profile/${company.get(
                      "companyId"
                    )}`}
                    handleUpdate={`/update-company/${company.get("companyId")}`}
                    handleDelete={() => handleDialog(company.get("companyId"))}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {!getCompaniesLoading &&
        getCompaniesResponse &&
        getCompaniesResponse.length === 0 && (
          <Box sx={{ textAlign: "center", m: 5 }}>
            <Typography sx={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
              No Companies Found
            </Typography>
          </Box>
        )}
      {getCompaniesLoading && (
        <Box sx={{ textAlign: "center", m: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <DeleteConfirmationDialog
        itemId={companyId}
        isOpen={isDeleteConfirmationOpen}
        handleClose={handleClose}
        handleConfirm={handleDeleteCompany}
      />
    </TableContainer>
  );
}

export default CompanyTable;
