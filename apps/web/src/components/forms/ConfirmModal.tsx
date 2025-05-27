import Modal from "../Modal";

type ConfirmModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
  objectName: string;
  objectType: string;
};

export default function ConfirmModal({
  isOpen,
  closeModal,
  onConfirm,
  objectName,
  objectType,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="💁‍♀️" width="w-[265px]">
      <div className="p-5 pt-0">
        <h1 className="text-lg font-semibold">Are you sure?</h1>
        <p className="text-sm text-gray-400">
          Do you really want to delete the{" "}
          <span className="font-semibold text-gray-800">{objectName}</span>{" "}
          {objectType}?
        </p>
      </div>
      <div className="divider border-t border-gray-200"></div>
      <div className="p-5 flex items-center justify-end gap-2">
        <button
          className="border border-gray-200 rounded-lg px-4 py-2 basis-1/2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="bg-[#7446EA] hover:bg-violet-800 text-white px-4 py-2 rounded-lg basis-1/2"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
