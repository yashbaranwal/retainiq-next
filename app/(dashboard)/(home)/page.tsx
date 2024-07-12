"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Grip, Plus, SquarePen, Trash2 } from "lucide-react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import { Button } from "@/components/ui/button";
import {
  addProduct,
  removeProduct,
  selectProducts,
  selectColVariants,
  addColVariant,
  removeColVariant,
  reorderProducts,
  addDynamicVariant,
  removeDynamicVariant,
} from "@/redux/slices/collection-slice";

const InsertDesignModal = dynamic(() => import("./_components/insert-design")
// , {
//   ssr: false,
// }
);

const Home = () => {
  const dispatch = useDispatch();

  const [isOpenModal, setIsModalOpen] = useState<boolean>(false);
  const products = useSelector(selectProducts);
  const colVariants = useSelector(selectColVariants);

  const [variantType, setvariantType] = useState<string>("");
  const [productId, setSelectedProductId] = useState<number>();

  // dynamic variant id
  const [variantId, setVariantId] = useState<string>();

  const handleAddProduct = (): void => {
    const variants = colVariants.map((item, idx) => ({
      id: uuidv4(),
      image: null,
      name: `Variant ${colVariants.length + idx}`,
    }));

    dispatch(
      addProduct({
        id: products.length + 1,
        filters: [],
        primaryVariant: null,
        variants: variants,
      }),
    );
  };

  const handleRemoveProduct = (id: number): void => {
    dispatch(removeProduct(id));
  };

  const handleAddColVariant = (): void => {
    const obj = {
      id: uuidv4(),
      image: null,
      name: `Variant ${colVariants.length + 2}`,
    };
    dispatch(addColVariant(obj));
    dispatch(addDynamicVariant(obj));
  };

  const handleRemoveColVariant = (id: string, name: string): void => {
    dispatch(removeColVariant(id));
    dispatch(removeDynamicVariant(name));
  };

  const handlePrimaryVariant = (id) => {
    setvariantType("primary");
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleDynamicVariant = (prodId, varId) => {
    setvariantType("dynamic");
    setSelectedProductId(prodId);
    setVariantId(varId);
    setIsModalOpen(true);
  };

  const handleOnDragEnd = (result: any): void => {
    if (!result.destination) return;
    const reorderedProducts = Array.from(products);
    const [reorderedItem] = reorderedProducts.splice(result.source.index, 1);
    reorderedProducts.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderProducts(reorderedProducts));
  };

  const ProductRow = ({ product, index }): React.ReactNode => {
    return (
      <Draggable
        key={product.id}
        draggableId={product.id.toString()}
        index={index}
      >
        {(provided) => (
          <tr
            className="group divide-x divide-lightGray"
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <td>
              <Trash2
                size={24}
                className="text-danger invisible group-hover:visible cursor-pointer"
                onClick={() => handleRemoveProduct(product.id)}
              />
              <div className="flex items-center gap-1">
                <p className="font-semibold text-3xl">{index + 1}</p>
                <Grip size={24} className="text-darkGray" />
              </div>
            </td>
            <td>
              <div className="bg-white h-[22vh] px-8 flex-center shadow-sm rounded-md">
                <Button variant="outline">+ Add Product Filters</Button>
              </div>
            </td>
            <td>
              {product.primaryVariant ? (
                <div className="relative flex-center">
                  <Image
                    src={product.primaryVariant}
                    className="rounded-md"
                    width={120}
                    height={120}
                    alt={product.id}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute cursor-pointer invisible group-hover:visible"
                    onClick={() => handlePrimaryVariant(product.id)}
                  >
                    <SquarePen size={20} className="text-darkGray" />
                  </Button>
                </div>
              ) : (
                <div className="bg-white h-[22vh] px-4 flex-center shadow-sm rounded-md">
                  <Button
                    variant="outline"
                    onClick={() => handlePrimaryVariant(product.id)}
                  >
                    + Add design
                  </Button>
                </div>
              )}
            </td>
            {product?.variants?.map((variant, index) => (
              <td key={index}>
                {variant.image ? (
                  <div className="relative flex-center">
                    <Image
                      src={variant.image}
                      className="rounded-md"
                      width={120}
                      height={120}
                      alt={variant.id}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute cursor-pointer invisible group-hover:visible"
                      onClick={() =>
                        handleDynamicVariant(product.id, variant.id)
                      }
                    >
                      <SquarePen size={20} className="text-darkGray" />
                    </Button>
                  </div>
                ) : (
                  <div className="bg-white h-[22vh] px-4 flex-center shadow-sm rounded-md">
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleDynamicVariant(product.id, variant.id)
                      }
                    >
                      + Add design
                    </Button>
                  </div>
                )}
              </td>
            ))}
            <td>
              <Button
                variant="outline"
                size="icon"
                onClick={handleAddColVariant}
              >
                <Plus size={16} className="text-gray" />
              </Button>
            </td>
          </tr>
        )}
      </Draggable>
    );
  };

  return (
    <>
      <div className="p-4">
        <div className="flex-center justify-between">
          <div className="flex-center justify-between gap-3">
            <ArrowLeft size={30} className="text-black" />
            <p className="font-serif text-2xl border-b border-b-darkGray">
              Rules creation
            </p>
          </div>
          <Button>Publish Feed</Button>
        </div>

        <div className="mt-8 p-8 bg-lightestGray rounded-xl overflow-x-auto">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="products">
              {(provided) => (
                <table
                  className="w-full border-collapse"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <thead>
                    <tr className="h-20">
                      <th className="text-left p-2" />
                      <th className="text-left p-2 w-6/12">Product Filter</th>
                      <th className="text-left p-2">Primary Variant</th>
                      {colVariants.map((variant, idx) => (
                        <th className="text-left p-2 group" key={idx}>
                          {variant.name}
                          <Trash2
                            size={24}
                            className="text-danger cursor-pointer hidden group-hover:inline-flex ml-2"
                            onClick={() =>
                              handleRemoveColVariant(variant.id, variant.name)
                            }
                          />
                        </th>
                      ))}
                      <th className="text-left p-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product, idx) => (
                        <React.Fragment key={idx}>
                          <ProductRow product={product} index={idx} />
                          {/* spacer */}
                          <tr className="h-[8vh]" />
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-2xl font-semibold text-center"
                        >
                          No products! Please add one.
                        </td>
                      </tr>
                    )}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>

          <div className="p-4">
            <Button variant="outline" size="icon" onClick={handleAddProduct}>
              +
            </Button>
          </div>
        </div>
      </div>
      <InsertDesignModal
        isModalOpen={isOpenModal}
        setIsModalOpen={setIsModalOpen}
        variantType={variantType}
        variantId={variantId}
        productId={productId}
      />
    </>
  );
};

export default Home;
