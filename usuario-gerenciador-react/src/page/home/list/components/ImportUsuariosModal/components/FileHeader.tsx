import { FiX } from "react-icons/fi";

interface FileHeaderProps {
     fileName: string;
     selectedCount: number;
     errorCount: number;
     onRemoveFile: () => void;
}

function FileHeader({
     fileName,
     selectedCount,
     errorCount,
     onRemoveFile,
}: FileHeaderProps) {
     return (
          <div className="flex items-center justify-between pb-2 border-b">
               <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                         {fileName}
                    </span>
                    <button
                         onClick={onRemoveFile}
                         className="p-1 hover:bg-gray-100 rounded"
                    >
                         <FiX className="w-4 h-4 text-gray-500" />
                    </button>
               </div>
               <div className="text-sm text-gray-600">
                    <span className="font-medium text-green-600">
                         {selectedCount}
                    </span>{" "}
                    selecionados
                    {errorCount > 0 && (
                         <>
                              {" "}
                              |{" "}
                              <span className="font-medium text-red-600">
                                   {errorCount}
                              </span>{" "}
                              com erros
                         </>
                    )}
               </div>
          </div>
     );
}

export default FileHeader;
