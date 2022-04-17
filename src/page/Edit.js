import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

function Edit() {
  const [searchParms, setSearchParms] = useSearchParams();
  const id = searchParms.get("id");
  console.log(id);
  // const { id } = useParams();

  return <div>{id == 10 ? alert(id) : null}</div>;
}

export default Edit;
