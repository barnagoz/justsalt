import React from "react";
import { Helmet } from "react-helmet";

function ErrNotFound(props) {
  return (
    <div className="w-full overflow-hidden h-screen bg-pic1 bg-cover flex flex-col justify-center">
      <Helmet>
        <title>404 | A keresett oldal nem található | justsalt</title>
      </Helmet>
      <h1 className="text-center overflow-hidden text-white font-bold text-4xl bg-red-200">
        Hát... Ez nem jött össze. 404. Az univerzum sem szeretné ha te főznél.
      </h1>
    </div>
  );
}

ErrNotFound.propTypes = {};

export default ErrNotFound;
