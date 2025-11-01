import { useState } from "react";
import { DefaultModal } from "../../../../../components/modal";
import UsuarioForm from "./components/UsuarioForm";
import type {
     CreateUsuarioDTO,
     UpdateUsuarioDTO,
} from "../../../../../services/usuario.service";
import type { Usuario } from "../../../../../models/usuario.model";

interface AddUsuarioModalProps {
     isOpen: boolean;
     onClose: () => void;
     onSubmit: (data: CreateUsuarioDTO | UpdateUsuarioDTO) => Promise<void>;
     usuario?: Usuario;
}

function AddUsuarioModal({
     isOpen,
     onClose,
     onSubmit,
     usuario,
}: AddUsuarioModalProps) {
     const [isSubmitting, setIsSubmitting] = useState(false);

     const handleSubmit = async (data: CreateUsuarioDTO | UpdateUsuarioDTO) => {
          setIsSubmitting(true);
          try {
               await onSubmit(data);
               onClose();
          } catch {
          } finally {
               setIsSubmitting(false);
          }
     };

     return (
          <DefaultModal
               isOpen={isOpen}
               onRequestClose={onClose}
               type="success"
               title={usuario ? "Editar Usuário" : "Adicionar Usuário"}
               showFooter={false}
          >
               <UsuarioForm
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    isSubmitting={isSubmitting}
                    usuario={usuario}
               />
          </DefaultModal>
     );
}

export default AddUsuarioModal;
