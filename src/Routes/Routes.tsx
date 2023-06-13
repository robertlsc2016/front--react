import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Users } from "../Pages/Users";
// import { UserEdit } from "../Pages/UserEdit";
import { Home } from "../Pages/Home";
// import { UserDelete } from "../Pages/UserDelete";
import { UserCreate } from "../Pages/UserCreate";
import { UserSearch } from "../Pages/UserSearch";
import { UserEdit } from "../Pages/UserEdit";
import { UsersImport } from "../Pages/UsersImport";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Users />} />
        
        <Route path="/editar-usuario/:id" element={<UserEdit />} />
        {/* <Route path="/deletar-usuario" element={<UserDelete />} /> */}
        <Route path="/cadastrar-usuario" element={<UserCreate />} />
        <Route path="/buscar-usuario" element={<UserSearch />} />
        <Route path="/importar-usuarios" element={<UsersImport />} />

        <Route path="*" element={<>not found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
