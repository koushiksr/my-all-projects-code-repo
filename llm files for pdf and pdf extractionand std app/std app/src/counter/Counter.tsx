import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { increment, decrement, fetchProductData } from "./counterSlice";
import {
  Button,
  CircularProgress,
  Typography,
  Card,
  CardMedia,
  Grid,
  CardContent,
} from "@mui/material";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const productData = useSelector(
    (state: RootState) => state.counter.productData
  );
  const loadingProduct = useSelector(
    (state: RootState) => state.counter.loadingProduct
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div className="p-4">
      <Typography variant="h3" className="mb-4">
        Counter App
      </Typography>
      <div className="mb-4">
        <Typography variant="h5">Count: {count}</Typography>
        <div className="mt-4">
          <Button variant="contained" onClick={handleIncrement}>
            Increment
          </Button>
          <Button
            variant="contained"
            onClick={handleDecrement}
            disabled={count === 0}
            className="ml-4"
          >
            Decrement
          </Button>
        </div>
      </div>
      <div>
        <Typography variant="h4" className="mb-2">
          Product Data:
        </Typography>
        {loadingProduct ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div>
            {productData && (
              <Card>
                <CardMedia
                  component="img"
                  image={productData.thumbnail}
                  alt={productData.title}
                  className="main-image"
                />
                <div className="p-4">
                  <Typography variant="h6" className="mb-1">
                    Title: {productData.title}
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    Description: {productData.description}
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    Price: {productData.price}
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    Discount Percentage: {productData.discountPercentage}
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    Rating: {productData.rating}
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    Stock: {productData.stock}
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    Brand: {productData.brand}
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    Category: {productData.category}
                  </Typography>
                </div>
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    className="overflow-x-auto whitespace-nowrap"
                  >
                    {productData.images.map(
                      (image: string | undefined, index: number) => (
                        <Grid item key={index}>
                          <CardMedia
                            component="img"
                            image={image}
                            alt={`Image ${index + 1}`}
                            className="scrolling-image"
                            style={{ width: "200px", height: "150px" }}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
