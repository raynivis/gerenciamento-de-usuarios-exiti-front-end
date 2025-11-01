export interface Usuario {
     id: number;
     nome: string;
     email: string;
     status: string;
     createdAt: string;
     updatedAt: string;
}

export interface UsuarioResponse {
     content: Usuario[];
     pageable: {
          pageNumber: number;
          pageSize: number;
          sort: {
               empty: boolean;
               sorted: boolean;
               unsorted: boolean;
          };
          offset: number;
          paged: boolean;
          unpaged: boolean;
     };
     last: boolean;
     totalElements: number;
     totalPages: number;
     size: number;
     number: number;
     first: boolean;
     numberOfElements: number;
     sort: {
          empty: boolean;
          sorted: boolean;
          unsorted: boolean;
     };
     empty: boolean;
}
