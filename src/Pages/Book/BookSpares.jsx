import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookSpareCard from "../../Components/BookSpareCard";
import { getSpares } from "../../Redux/Actions/AdminActions";
import { CircularProgress, TextField, FormControl, Box } from "@mui/material";

const BookSpares = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpares());
  }, [dispatch]);

  const { getSparesLoading, getSparesResponse, getSparesError } = useSelector(
    (state) => state.getSpares
  );

  console.log(getSparesResponse);

  return (
    <Box>
      <FormControl fullWidth>
        <TextField placeholder="Search Spare..." type="text" size="medium" />
      </FormControl>
      <Box sx={{ m: 5 }}>
        {getSparesLoading && (
          <Box sx={{ textAlign: "center", m: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {!getSparesLoading &&
          getSparesResponse &&
          getSparesResponse.map((spare) => <BookSpareCard spare={spare} />)}
      </Box>
    </Box>
  );
};

export default BookSpares;
