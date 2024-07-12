import Image from "next/image";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IMG_BASE_URL } from "@/general";
import {
  updateDynamicVariant,
  updatePrimaryVariant,
} from "@/redux/slices/collection-slice";

const InsertDesignModal = ({
  isModalOpen,
  setIsModalOpen,
  variantType,
  productId,
  variantId,
}) => {
  const dispatch = useDispatch();

  const dresses = [
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcQbiXlOuL9Xmy4e6EZiMpkq1s2frMkWZ20A1g&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcRr0vSif79WvAeS6EHrpOTaHNPjxabhHMkI1Q&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcQzLaZsrr8c2_XYw_9DlWz7462__-yBoQx7Sg&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcRn9bHeqFfWTC0GnZWO3rJ2kpIMzPZUQSnY2A&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcRn9bHeqFfWTC0GnZWO3rJ2kpIMzPZUQSnY2A&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcQzLaZsrr8c2_XYw_9DlWz7462__-yBoQx7Sg&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcRr0vSif79WvAeS6EHrpOTaHNPjxabhHMkI1Q&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcQbiXlOuL9Xmy4e6EZiMpkq1s2frMkWZ20A1g&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcQbiXlOuL9Xmy4e6EZiMpkq1s2frMkWZ20A1g&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcRr0vSif79WvAeS6EHrpOTaHNPjxabhHMkI1Q&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcQzLaZsrr8c2_XYw_9DlWz7462__-yBoQx7Sg&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcRn9bHeqFfWTC0GnZWO3rJ2kpIMzPZUQSnY2A&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcRn9bHeqFfWTC0GnZWO3rJ2kpIMzPZUQSnY2A&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcQzLaZsrr8c2_XYw_9DlWz7462__-yBoQx7Sg&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcRr0vSif79WvAeS6EHrpOTaHNPjxabhHMkI1Q&s`,
    `${IMG_BASE_URL}/images?q=tbn:ANd9GcQbiXlOuL9Xmy4e6EZiMpkq1s2frMkWZ20A1g&s`,
  ];

  const handleInsert = (img) => {
    switch (variantType) {
      case "primary":
        dispatch(
          updatePrimaryVariant({
            id: productId,
            img: img,
          }),
        );
        break;
      case "dynamic":
        dispatch(
          updateDynamicVariant({
            prodId: productId,
            varId: variantId,
            img: img,
          }),
        );
        break;
      default:
        return null;
    }
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger />
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select a design to link</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-4 gap-4 h-80 overflow-y-scroll">
              {dresses.map((dress, idx) => (
                <div
                  className="relative flex items-center justify-center"
                  key={idx}
                >
                  <Image
                    src={dress}
                    width={140}
                    height={140}
                    className="rounded-lg"
                    alt={`Dress - ${idx}`}
                  />
                  <Button
                    variant="outline"
                    className="absolute"
                    onClick={() => handleInsert(dress)}
                  >
                    Insert
                  </Button>
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InsertDesignModal;
