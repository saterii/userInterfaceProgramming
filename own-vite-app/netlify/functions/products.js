import axios from "axios";

const handler = async (event) => {
  const { id } = event.queryStringParameters;

  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const product = response.data;
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch product" }),
    };
  }
};

export {handler}