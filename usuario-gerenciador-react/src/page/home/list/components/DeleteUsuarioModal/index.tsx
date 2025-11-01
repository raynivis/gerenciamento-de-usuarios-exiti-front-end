import { DefaultModal } from "../../../../../components/modal";

interface DeleteUsuarioModalProps {
     isOpen: boolean;
     onClose: () => void;
     onConfirm: () => Promise<void>;
     usuarioNome: string;
     isDeleting: boolean;
}

function DeleteUsuarioModal({
     isOpen,
     onClose,
     onConfirm,
     usuarioNome,
     isDeleting,
}: DeleteUsuarioModalProps) {
     const handleConfirm = async () => {
          await onConfirm();
          onClose();
     };

     return (
          <DefaultModal
               isOpen={isOpen}
               onRequestClose={onClose}
               type="danger"
               title="Excluir Usuário"
               onSubmit={handleConfirm}
               submitText={isDeleting ? "Excluindo..." : "Excluir"}
               cancelText="Cancelar"
          >
               <div className="py-4">
                    <p className="text-gray-700">
                         Tem certeza que deseja excluir o usuário{" "}
                         <span className="font-semibold">{usuarioNome}</span>?
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                         Esta ação não pode ser desfeita.
                    </p>
               </div>
          </DefaultModal>
     );
}

export default DeleteUsuarioModal;
