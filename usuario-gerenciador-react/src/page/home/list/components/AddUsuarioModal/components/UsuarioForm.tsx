import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type {
     CreateUsuarioDTO,
     UpdateUsuarioDTO,
} from "../../../../../../services/usuario.service";
import type { Usuario } from "../../../../../../models/usuario.model";
import FormInput from "./FormInput";

interface UsuarioFormProps {
     onSubmit: (data: CreateUsuarioDTO | UpdateUsuarioDTO) => Promise<void>;
     onCancel: () => void;
     isSubmitting: boolean;
     usuario?: Usuario;
}

function UsuarioForm({
     onSubmit,
     onCancel,
     isSubmitting,
     usuario,
}: UsuarioFormProps) {
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm<CreateUsuarioDTO | UpdateUsuarioDTO>({
          mode: "onChange",
          defaultValues: usuario
               ? { nome: usuario.nome, email: usuario.email }
               : undefined,
     });

     useEffect(() => {
          if (usuario) {
               reset({ nome: usuario.nome, email: usuario.email });
          }
     }, [usuario, reset]);

     const onSubmitForm = async (data: CreateUsuarioDTO | UpdateUsuarioDTO) => {
          await onSubmit(data);
     };

     return (
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
               <FormInput
                    label="Nome"
                    error={errors.nome?.message}
                    required
                    disabled={isSubmitting}
                    placeholder="Digite o nome completo"
                    {...register("nome", {
                         required: "Nome é obrigatório",
                    })}
               />

               <FormInput
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    required
                    disabled={isSubmitting}
                    placeholder="usuario@exemplo.com"
                    {...register("email", {
                         required: "Email é obrigatório",
                         pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Email inválido",
                         },
                    })}
               />

               <div className="flex justify-between gap-3 pt-4">
                    <button
                         type="button"
                         onClick={onCancel}
                         disabled={isSubmitting}
                         className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                         Cancelar
                    </button>
                    <button
                         type="submit"
                         disabled={isSubmitting}
                         className="px-6 py-2 text-white bg-primary hover:bg-green-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                         {isSubmitting ? "Salvando..." : "Salvar"}
                    </button>
               </div>
          </form>
     );
}

export default UsuarioForm;
