import React from "react";
import useGetListMovie from "../../../hooks/useGetListMovie";
import MovieHorizontalSection from "./SectionMovieHorizontal";

const CATEGORY_SECTIONS = [
  {
    title: "Tâm lí giật gân",
    category: "Tâm lí",
  },
  {
    title: "Hành động mãn nhãn",
    category: "Hành động",
  },
  {
    title: "Kinh dị rùng rợn",
    category: "Kinh dị",
  },
  {
    title: "Hài hước tột độ",
    category: "Hài kịch",
  },
];

const SectionFillerCategoryMovie = ({ country }) => {
  const { data } = useGetListMovie();

  const getMoviesByCategory = (category) =>
    data
      ?.filter(
        (item) =>
          item.categories === category &&
          (!country || item.country === country),
      )
      ?.sort((a, b) => b.year - a.year)
      ?.slice(0, 10) || [];

  return (
    <>
      {CATEGORY_SECTIONS.map((section) => (
        <MovieHorizontalSection
          key={section.category}
          title={section.title}
          movies={getMoviesByCategory(section.category)}
        />
      ))}
    </>
  );
};

export default SectionFillerCategoryMovie;
