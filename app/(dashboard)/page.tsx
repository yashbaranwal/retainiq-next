"use client";

import { Button } from "@/components/ui/button";
import {
  addProduct,
  removeProduct,
  selectProducts,
  selectColVariants,
  addColVariant,
  removeColVariant,
} from "@/redux/slices/collection-slice";
import { ArrowLeft, Grip, Plus, Trash2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const products = useSelector(selectProducts);
  const colVariants = useSelector(selectColVariants);
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    dispatch(addProduct({ id: products.length + 1 }));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  const handleAddColVariant = (id) => {
    dispatch(
      addColVariant({
        id: uuidv4(),
        image: "",
        name: `Variant ${colVariants.length + 2}`,
      })
    );
  };

  const handleRemoveColVariant = (id) => {
    dispatch(removeColVariant(id));
  };

  const ProductRow = ({ product }) => {
    return (
      <tr className="group divide-x-[1px] divide-lightGray">
        <td className="px-4">
          <Trash2
            size={24}
            className="text-danger invisible group-hover:visible cursor-pointer"
            onClick={() => handleRemoveProduct(product.id)}
          />
          <div className="flex items-center gap-1">
            <p className="font-semibold text-3xl">{product.id}</p>
            <Grip size={24} className="text-darkGray" />
          </div>
        </td>
        <td className="px-4">
          <div className="bg-white h-[20vh] flex items-center justify-center shadow-sm rounded-md">
            <Button variant="outline">+ Add Product Filters</Button>
          </div>
        </td>
        <td className="px-4">
          <div className="bg-white h-[20vh] flex items-center justify-center shadow-sm rounded-md">
            <Button variant="outline">+ Add design</Button>
          </div>
        </td>
        {colVariants.map((variant, index) => (
          <td key={index} className="px-4">
            <div className="bg-white h-[20vh] flex items-center justify-center shadow-sm rounded-md">
              <Button variant="outline">+ Add design</Button>
            </div>{" "}
          </td>
        ))}
        <td className="px-4">
          <Button variant="outline" size="icon" onClick={handleAddColVariant}>
            <Plus size={16} className="text-gray" />
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          <ArrowLeft size={30} className="text-black" />
          <p className="font-serif text-2xl border-b border-b-darkGray">
            Rules creation
          </p>
        </div>
        <Button>Publish Feed</Button>
      </div>

      <div className="mt-8 p-8 bg-lightestGray rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="h-20">
              <th className="text-left p-2">Index</th>
              <th className="text-left p-2">Product Filter</th>
              <th className="text-left p-2">Primary Variant</th>
              {colVariants.map((variant, idx) => (
                <th className="text-left p-2 group" key={idx}>
                  {variant.name}
                  <Trash2
                    size={24}
                    className="text-danger cursor-pointer hidden group-hover:inline-flex"
                    onClick={() => handleRemoveColVariant(variant.id)}
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
                  <ProductRow product={product} />
                  <tr className="h-[8vh]" />
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-2xl font-semibold text-center">
                  No products! Please add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4">
          <Button variant="outline" size="icon" onClick={handleAddProduct}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;