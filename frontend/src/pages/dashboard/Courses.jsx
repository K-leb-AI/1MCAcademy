import React, { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "../../supabaseClient";
import { PiSpinner } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courseList, setCourseList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = (courseId) => {
    navigate(`/dashboard/courses/${courseId}`);
  };

  const handleChange = (value) => {
    setSearchTerm(value);
    setFilteredSearch(
      courseList.filter(
        (course) =>
          course.title?.toLowerCase().includes(value.toLowerCase()) ||
          course.topic?.toLowerCase().includes(value.toLowerCase()) ||
          course.description?.toLowerCase().includes(value.toLowerCase()) ||
          course.instructor?.name?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data: courseData, error } = await supabase.from("course")
          .select(`
            *,
            instructor: instructor_id (name),
            badge: badge_id (title)
          `);

        if (error) {
          console.error("Error fetching courses:", error);
          return;
        }

        setCourseList(courseData);
        setFilteredSearch(courseData);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background flex-col gap-3">
        <PiSpinner className="animate-spin" size={40} />
        <p className="mt-4 text-foreground">Loading...</p>
      </div>
    );

  return (
    <div className="mb-5 px-4 md:px-10">
      <div className="flex w-full max-w-xl items-center gap-2 relative">
        <Input
          type="text"
          placeholder="Search a course area, or instructor"
          onChange={(e) => handleChange(e.target.value)}
          value={searchTerm}
          className="py-6 pl-10 rounded-xl"
        />
        <Search
          size={15}
          className="absolute top-4 left-3 text-foreground/30"
        />
      </div>

      <div className="my-4 lg:mt-8 lg:mb-5 items-center flex">
        <span className="font-bold text-2xl">All Courses</span>
        <span className="text-foreground/50 ml-3">
          ({filteredSearch.length} result{filteredSearch.length > 1 ? "s" : ""})
        </span>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSearch.map((course, index) => (
          <CourseCard
            key={course.id || index}
            course={course}
            onClick={() => handleClick(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
