// "use client";
interface ModalProps {
  modalOpen: boolean;
  setModalOpen: () => void;
  children: React.ReactNode;
}

const CreateTaskModal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  children,
}) => {
  //   const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <dialog className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-white">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={setModalOpen}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default CreateTaskModal;
