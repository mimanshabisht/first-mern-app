import React, { useState } from "react";
import {
  Box,
  DialogActionTrigger,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";

const ProductCard = ({ product, handleDelete }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { updateProduct } = useProductStore();
  const handleUpdate = async (pId, updatedProduct) => {
    const { success, data } = await updateProduct(pId, updatedProduct);
    console.log(success, data);
    if (!success) {
      toaster.create({
        title: "Error",
        description: "Please provide all the fields",
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: "Product updated successfully",
        type: "success",
      });
    }
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={"white"}
      margin={3}
      padding={2}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={"gray.600"} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <Dialog.Root placement={"center"}>
            <Dialog.Trigger asChild>
              <FaEdit
                size={30}
                color="#4299E1"
                _hover={{ bg: "red.500" }}
                cursor={"pointer"}
              />
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack spacing={4}>
                      <Input
                        placeholder="Product Name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Price"
                        name="price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            price: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            image: e.target.value,
                          })
                        }
                      />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <DialogActionTrigger>
                      <Button
                        onClick={() =>
                          handleUpdate(product._id, updatedProduct)
                        }
                        bg={"#4299E1"}
                      >
                        Update
                      </Button>
                    </DialogActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <AiFillDelete
            onClick={() => handleDelete(product._id)}
            size={30}
            color="#F56565"
            cursor={"pointer"}
          />
        </HStack>
      </Box>
      <Toaster />
    </Box>
  );
};

export default ProductCard;
