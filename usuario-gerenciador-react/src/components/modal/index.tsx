import type { ReactNode } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

interface DefaultModalProps {
     isOpen: boolean;
     onRequestClose: () => void;
     type?: "success" | "danger";
     title?: string;
     children: ReactNode;
     onSubmit?: () => void;
     submitText?: string;
     cancelText?: string;
     showFooter?: boolean;
}

Modal.setAppElement("#root");

export const DefaultModal = ({
     isOpen,
     onRequestClose,
     type = "success",
     title,
     children,
     onSubmit,
     submitText = "Confirmar",
     cancelText = "Cancelar",
     showFooter = true,
}: DefaultModalProps) => {
     const typeStyles = {
          success: {
               button: "bg-primary hover:bg-green-600",
          },
          danger: {
               button: "bg-red-500 hover:bg-red-600",
          },
     };

     const currentStyle = typeStyles[type];

     return (
          <Modal
               isOpen={isOpen}
               onRequestClose={onRequestClose}
               className="bg-white rounded-lg shadow-2xl max-w-lg w-full mx-auto outline-none"
               overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
               closeTimeoutMS={200}
          >
               <div className="flex flex-col">
                    {title && (
                         <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                              <h2 className="font-semibold text-gray-800">
                                   {title}
                              </h2>
                              <button
                                   onClick={onRequestClose}
                                   className="text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                   <IoClose className="w-5 h-5" />
                              </button>
                         </div>
                    )}

                    <div className="px-6 py-6">{children}</div>

                    {showFooter && (
                         <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between gap-3">
                              <button
                                   onClick={onRequestClose}
                                   className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors font-medium"
                              >
                                   {cancelText}
                              </button>
                              {onSubmit && (
                                   <button
                                        onClick={onSubmit}
                                        className={`px-6 py-2 text-white rounded transition-colors font-medium ${currentStyle.button}`}
                                   >
                                        {submitText}
                                   </button>
                              )}
                         </div>
                    )}
               </div>
          </Modal>
     );
};
