import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loader/Loading";
import {
  AddProducts,
  GetAllProducts,
  UpdateProducts,
} from "../../Redux/product/product.action";
import {
  Addprod_store,
  GetAllprod_store,
} from "../../Redux/product_store/product_store.action";

const Dashboard = () => {
  const [store, setStore] = useState("");
  const [editProducts, setEditProducts] = useState({});
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [productsModal, setproductsModal] = useState(false);
  const [storeModal, setstoreModal] = useState(false);
  const [storeData, setstoreData] = useState({});
  const [filter, setFilter] = useState({});

  const { AllProd_store, isProd_storeLoading } = useSelector(
    (state) => state.Prod_Store
  );

  const { AllProducts, isProductssLoading, isProductssError } = useSelector(
    (state) => state.Product
  );

  // console.log(AllProducts);

  useEffect(() => {
    dispatch(GetAllprod_store());
  }, [dispatch]);

  const handleCloseproductsModal = () => {
    setproductsModal((prev) => !prev);
  };
  const handleCloseStoreModal = () => {
    setstoreModal((prev) => !prev);
  };
  const handleUpdateproducts = () => {
    dispatch(UpdateProducts(store?._id, editId, editProducts));
    setproductsModal((prev) => !prev);
  };

  const handleAddProducts = () => {
    dispatch(AddProducts(store?._id, editProducts));
    setproductsModal((prev) => !prev);
  };

  const handleAddStore = () => {
    dispatch(Addprod_store(storeData));
    setStore((prev) => !prev);
  };

  if (isProductssLoading || isProd_storeLoading) return <Loading />;

  return (
    <>
      <Box width={"65%"} mx={"auto"} mt={8}>
        <Typography variant="h4" mb={4}>
          Store-level Product Catalog
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mb: "2rem",
            padding: "10px",
          }}
        >
          <Autocomplete
            fullWidth
            options={AllProd_store || []}
            getOptionLabel={(option) => option?.name || ""}
            value={store}
            onChange={(event, newValue) => {
              setStore(newValue);
              dispatch(GetAllProducts({}, newValue?._id));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search and select Store"
                required
              />
            )}
          />
        </Box>

        {!store && (
          <Button
            sx={{
              mb: "1rem",
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              setstoreModal((prev) => !prev);
            }}
          >
            Add New Store
          </Button>
        )}

        {store && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              mb: "1rem",
              padding: "5px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditProducts({});
                setEditId(null);
                setproductsModal((prev) => !prev);
              }}
            >
              Add Product
            </Button>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel>Sort by price</InputLabel>
                <Select
                  value={filter?.price || ""}
                  label="Sort by price"
                  onChange={(e) =>
                    setFilter({ ...filter, price: e.target.value })
                  }
                >
                  <MenuItem value={"l2h"}>Low to High</MenuItem>
                  <MenuItem value={"h2l"}>High to low</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField label="Search" variant="outlined" onChange={(e) => setFilter({ ...filter, name: e.target.value })}/>
            <Button variant="contained" color="primary" onClick={() => {dispatch(GetAllProducts(filter, store?._id))}}>
              Apply
            </Button>
          </Box>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#1e3a8a", color: "white" }}>
                <TableCell sx={{ color: "white" }}>Products Name</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Price/kg
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Unit
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  KG/unit
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!store ? (
                <TableRow>
                  <TableCell colSpan={3}>Please select a store</TableCell>
                </TableRow>
              ) : isProductssError || AllProducts?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    No Products Found / Something went wrong
                  </TableCell>
                </TableRow>
              ) : (
                AllProducts?.data?.map((products) => (
                  <TableRow key={products?._id}>
                    <TableCell>{products?.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {products?.category}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {products?.price}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {products?.unit}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {products?.kg_per_unit}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setEditId(products?._id);
                          setproductsModal((prev) => !prev);
                          setEditProducts(products);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* New Store Modal */}
      <Modal open={storeModal} onClose={handleCloseStoreModal}>
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            right: "50%",
            transform: "translateX(50%)",
            width: { xs: "90%", sm: "75%", md: "50%", lg: "30%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          {/* products Information */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Name"
              value={storeData.name}
              onChange={(e) => {
                setstoreData({ ...storeData, name: e.target.value });
              }}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Address"
              value={storeData.address}
              onChange={(e) => {
                setstoreData({
                  ...storeData,
                  address: e.target.value,
                });
              }}
            />
            <Button variant="contained" size="small" onClick={handleAddStore}>
              Add Store
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit/Add Modal */}
      <Modal open={productsModal} onClose={handleCloseproductsModal}>
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            right: "50%",
            transform: "translateX(50%)",
            width: { xs: "90%", sm: "75%", md: "50%", lg: "30%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          {/* products Information */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Name"
              value={editProducts.name}
              onChange={(e) => {
                setEditProducts({ ...editProducts, name: e.target.value });
              }}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Description"
              value={editProducts.description}
              onChange={(e) => {
                setEditProducts({
                  ...editProducts,
                  description: e.target.value,
                });
              }}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Category"
              value={editProducts.category}
              onChange={(e) => {
                setEditProducts({ ...editProducts, category: e.target.value });
              }}
            />
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              label="Price"
              value={editProducts.price}
              onChange={(e) => {
                setEditProducts({ ...editProducts, price: e.target.value });
              }}
            />
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              label="Unit"
              value={editProducts.unit}
              onChange={(e) => {
                setEditProducts({ ...editProducts, unit: e.target.value });
              }}
            />
            <TextField
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              label="kg_per_unit"
              value={editProducts.kg_per_unit}
              onChange={(e) => {
                setEditProducts({
                  ...editProducts,
                  kg_per_unit: e.target.value,
                });
              }}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={editId ? handleUpdateproducts : handleAddProducts}
            >
              {editId ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
