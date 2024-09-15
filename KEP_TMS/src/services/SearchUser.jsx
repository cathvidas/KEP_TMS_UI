import { useEffect, useState } from "react";
import { getAllUsers } from "../api/UserAccountApi";
import { UserList } from "../components/List/UserList";

export const SearchUser = ( usersList, search ) => {
  const filteredUsers = usersList.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(usersList);
  return filteredUsers;
};