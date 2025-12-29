import React from "react";
import { useSearchParams } from "react-router-dom";
import useGetDetailMovie from "../hooks/useGetDetailMovie";

const WatchMovie = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data } = useGetDetailMovie(id);
  console.log(data);

  return (
    <>
      <div>watch movie</div>
    </>
  );
};

export default WatchMovie;
