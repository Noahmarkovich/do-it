import { useRef, type ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import useClickOutside from "@/hooks/useClickOutside";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  width,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => onClose());

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className={`bg-white rounded-xl shadow-lg relative z-100 ${width}`}
      >
        <div className="flex justify-between items-center p-5 pb-0">
          <h2 className="text-2xl font-semibold tracking-wide">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition"
            onClick={onClose}
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
