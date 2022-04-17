import React from "react";
import { useSearchParams } from "react-router-dom";

function Edit() {
  const [searchParms, setSearchParms] = useSearchParams();
  const id = searchParms.get("id");
  console.log(id);

  return <div>{id == 10 ? alert(id) : null}</div>;
}

export default Edit;
