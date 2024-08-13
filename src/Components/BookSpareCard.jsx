import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../Redux/Actions/CartActions";
import Iconify from "../Utils/Layouts/Iconify";

const BookSpareCard = ({ spare }) => {
  const dispatch = useDispatch();

  const { loading, cartInfo, cartError } = useSelector(
    (state) => state.cartDetails
  );

  const handleAddToCart = () => {
    if (cartInfo && !cartInfo.map((i) => i.id).includes(spare.id)) {
      console.log("Here");
      let item = {
        id: spare.id,
        name: spare.get("name"),
        price: spare.get("price"),
        quantity: 1,
        total: spare.get("price"),
      };

      dispatch(addCartItem(item));
    }
  };

  return (
    <Box sx={{ m: 1 }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            {spare.get("name")}
          </Typography>

          <Typography variant="body2">{spare.get("description")}</Typography>
          <Typography variant="h6">₹{spare.get("price")}</Typography>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 1,
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1EBB86",
              color: "white",
            }}
            onClick={handleAddToCart}
          >
            {cartInfo && cartInfo.map((i) => i.id).includes(spare.id) ? (
              <>
                <Iconify
                  icon="ic:round-done-outline"
                  color="white"
                  sx={{ mx: 0.5 }}
                />
                Added to cart
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1EBB86",
              color: "white",
            }}
          >
            Request Spare
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default BookSpareCard;
