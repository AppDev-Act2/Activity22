import { useEffect, useState } from "react";
import ProductCard from "../component/explore/ProductCard";
import fetchFromApi from "../utils/fetchFromApi";
import SelectCategory from "../component/explore/SelectCategory";
import PriceFilter from "../component/explore/PriceFilter";
import "./ExploreProducts.css";
import { useParams } from "react-router-dom";
import Shimmer from "../component/shimmer/Shimmer";
import axios from 'axios';
import "../component/explore/ProductCard.css";

function ExploreProduct() {
  //akong version
  const [djproducts, djsetProducts] = useState([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // If user is not logged in, do not fetch products
          return;
        }
        const userData = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const userId = userData.data.id;
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user_products/${userId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        djsetProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchUserProducts();
  }, []);



  //cloned
  const [products, setProducts] = useState([]);
  const [priceFlter, setPriceFilter] = useState("default");
  const [checkBoxState, setCheckBoxState] = useState({
    men: false,
    women: false,
  });
  let { category } = useParams();

  useEffect(() => {
    let resetCheckBoxState = {
      men: false,
      women: false,
    };
    if (category === "all") {
      setCheckBoxState(resetCheckBoxState);
      return;
    }
    setCheckBoxState({ ...resetCheckBoxState, [category]: true });
  }, [category]);

  useEffect(() => {
    async function getData() {
      let res = await fetchFromApi("products");
      function getFilteredData() {
        // if both men and women checkbox are not true than load both men's and women's clothing
        // we are filtering this since the default request also provide result for category that we don't want
        if (!checkBoxState.men && !checkBoxState.women) {
          let filteredData = res.filter((product) => {
            return (
              product.category === "men's clothing" ||
              product.category === "women's clothing"
            );
          });
          return filteredData;
        }

        let filteredData = res.filter((product) => {
          if (checkBoxState.men && product.category === "men's clothing") {
            return product;
          } else if (
            checkBoxState.women &&
            product.category === "women's clothing"
          ) {
            return product;
          }
        });
        return filteredData;
      }
      setProducts(getFilteredData());
      setPriceFilter("default");
    }
    getData();
  }, [checkBoxState]);

  function handleCategoryCheckBox(e) {
    let { name, checked } = e.target;
    setCheckBoxState({ ...checkBoxState, [name]: checked });
  }

  function handlePriceFilter(e) {
    let filter = e.target.value;
    if (filter === "low-to-high") {
      let priceFilteredData = products
        .slice()
        .sort((a, b) => a.price - b.price);
      setProducts(priceFilteredData);
    }
    if (filter === "high-to-low") {
      let priceFilteredData = products
        .slice()
        .sort((a, b) => b.price - a.price);
      setProducts(priceFilteredData);
    }
    setPriceFilter(filter);
  }

  return (
    <main className="product-main">
      <PriceFilter
        priceFlter={priceFlter}
        handlePriceFilter={handlePriceFilter}
      />
      <SelectCategory
        checkBoxState={checkBoxState}
        handleCheckBox={handleCategoryCheckBox}
      />
      <div className="products-container">
        {djproducts.map(product => (
          <div key={product.id} className="product-card_wrapper">
            <div className="product-card_img">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBqYEUHs9SPync2bo8AmdYjzW5WYicOWF8lreCXnMcQ&s" />
            </div>
            <div className="product-card_description">
              <h3>{product.product_name}</h3>
              <p>{product.description}</p>
              <span className="product-card_bottom">
                <b className="product-card_price">${product.price}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function AllProducts({ products }) {
  let productCards = products.length ? (
    products?.map((product) => {
      return <ProductCard product={product} key={product.id} />;
    })
  ) : (
    <Skeleton />
  );

  return productCards;
}

function Skeleton() {
  let a = [];
  for (let i = 0; i < 4; i++) {
    a.push(<Shimmer key={i} />);
  }
  return a;
}

export default ExploreProduct;
