import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  List,
  Badge,
  Button,
  Divider,
  Typography,
  IconButton,
  Grid,
  TextField,
  FormControl,
  Card,
} from "@mui/material";

import Iconify from "../Utils/Layouts/Iconify";
import Scrollbar from "./Scrollbar";
import MenuPopover from "./MenuPopover";
import {
  addCartItemQuantity,
  removeCartItem,
  subtractCartItemQuantity,
} from "../Redux/Actions/CartActions";

export default function CartPopover() {
  const anchorRef = useRef(null);

  const { loading, cartInfo, cartError } = useSelector(
    (state) => state.cartDetails
  );

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={cartInfo && cartInfo.length} color="error">
          <Iconify icon="eva:shopping-cart-fill" width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">
              {cartInfo && cartInfo.length === 0 ? "Cart is empty" : "Cart"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {cartInfo && cartInfo.length} items in cart
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar
          sx={{
            height: 1,
            "& .simplebar-content": {
              height: 1,
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Box>
            {cartInfo && cartInfo.map((item) => <CartItem item={item} />)}
          </Box>
        </Scrollbar>

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            Request All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const { loading, cartInfo, cartError } = useSelector(
    (state) => state.cartDetails
  );

  const handleRemoveItem = () => {
    dispatch(removeCartItem(item));
  };

  const handleAddQuantity = () => {
    dispatch(addCartItemQuantity(item));
  };

  const handleSubtractQuantity = () => {
    dispatch(subtractCartItemQuantity(item));
  };

  return (
    <Box>
      {item.quantity > 0 && (
        <>
          <Grid
            container
            sx={{
              m: 1,
              px: 1,
            }}
          >
            <Grid xs={6}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body1">₹{item.total}</Typography>
            </Grid>
            <Grid
              xs={6}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box sx={{ display: "flex" }}>
                <Iconify
                  icon="akar-icons:minus"
                  height={60}
                  sx={{ fontSize: 18, mx: 0.5 }}
                  onClick={handleSubtractQuantity}
                />

                <Card
                  variant="outlined"
                  sx={{ borderRadius: 0.5, height: 30, width: 30, mt: 2 }}
                >
                  <Typography sx={{ textAlign: "center", mt: 0.2 }}>
                    {item.quantity}
                  </Typography>
                </Card>

                <Iconify
                  icon="carbon:add"
                  height={60}
                  sx={{ fontSize: 22, mx: 0.5 }}
                  onClick={handleAddQuantity}
                />
              </Box>

              <Iconify
                icon="fluent:delete-20-filled"
                height={60}
                color="red"
                sx={{ fontSize: 22, mr: 1 }}
                onClick={handleRemoveItem}
              />
            </Grid>
          </Grid>
          <Divider sx={{ borderStyle: "dashed" }} />
        </>
      )}
    </Box>
  );
};
