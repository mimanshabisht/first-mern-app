import { useProductStore } from "@/store/product";
import { Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import ProductCard from "@/elements/ProductCard";

import { Toaster, toaster } from "@/components/ui/toaster";

const HomePage = () => {
  const { products, fetchProducts, deleteProduct } = useProductStore();
  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, [fetchProducts]);

  const handleDelete = async (pId) => {
    console.log(pId);
    const { success, message } = await deleteProduct(pId);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
      });
    }
  };
  //if product = [] return No products found. Create a product.
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Heading
          color="#4299E1"
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          marginBottom={8}
        >
          Current Products
        </Heading>
        {products.length == 0 ? (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
            marginTop={8}
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  handleDelete={handleDelete}
                />
              );
            })}
          </SimpleGrid>
        )}
        <Toaster />
      </VStack>
    </Container>
  );
};

export default HomePage;
