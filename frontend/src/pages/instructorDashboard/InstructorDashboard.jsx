import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, BookOpen, Plus, Clock, Award } from "lucide-react";
import { ModeToggle } from "@/components/ThemeToggle";
// import ProfileButton from "@/components/ProfileButton";
import InstructorProfileButton from "@/components/InstructorProfileButton";
import StatCard from "@/components/InstructorStatCard";
import { useUser } from "@/utils/UserProvider";
import Loading from "@/components/Loading";
import { InstructorCourseCard } from "@/components/InstructorCourseCard";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { loggedUser, userProfile, isLoading } = useUser();
  const [isFetching, setIsFetching] = useState(true);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [chartData, setChartData] = useState();
  const [completion, setCompletion] = useState();
  const [lessonComments, setLessonComments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      // Guard against undefined userProfile
      if (!userProfile?.id) {
        setIsFetching(false);
        return;
      }

      try {
        setIsFetching(true);
        const { data: instructorCoursesData, error: instructorCoursesError } =
          await supabase
            .from("course")
            .select(
              `*, 
              profile (username),
              badge (title),
              lessons (runtime),
              user_courses(user_id, status, enrolled_at)
              `,
            )
            .eq("instructor_id", userProfile.id);

        if (instructorCoursesError) {
          console.error("Error fetching courses:", instructorCoursesError);
          return;
        }
        setInstructorCourses(instructorCoursesData || []);

        const studentCounts = Array(12).fill(0);
        //The select statement in instructorCoursesData fetches all the user enrollment data for the instructor for each course object. So I just select one of them to evaluate the enrollment pattern.
        if (instructorCoursesData && instructorCoursesData.length > 0) {
          instructorCoursesData[0].user_courses.forEach((user_course) => {
            if (!user_course.enrolled_at) return;
            const month = new Date(user_course.enrolled_at).getMonth();
            studentCounts[month]++;
          });

          // Format for chart
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          const formatted = studentCounts.map((count, i) => ({
            month: months[i],
            students: count,
          }));
          setChartData(formatted);

          let enrollmentCount = 0;
          instructorCoursesData[0].user_courses.map((user_course) => {
            user_course.status === "enrolled" && enrollmentCount++;
          });

          console.log(enrollmentCount);

          setCompletion([
            {
              name: "In Progress",
              value:
                enrollmentCount /
                  instructorCoursesData[0].user_courses.length || 0,
            },
            {
              name: "Completed",
              value:
                (instructorCoursesData[0].user_courses.length -
                  enrollmentCount) /
                  instructorCoursesData[0].user_courses.length || 0,
            },
          ]);
        }
      } catch (error) {
        console.error("Exception fetching courses:", error);
      } finally {
        setIsFetching(false);
      }
    };

    if (!isLoading) {
      fetchInstructorCourses();
    }
  }, [userProfile, isLoading]);

  // Load comments based on selected course
  const handleCourseChange = async (courseId) => {
    const course = instructorCourses.find((c) => c.id === courseId);
    setSelectedCourse(course || null);

    if (!course?.id) {
      setLessonComments([]);
      return;
    }

    // Fetch comments immediately with the course ID
    try {
      const { data, error } = await supabase
        .from("lesson_comment")
        .select(
          "content, created_at, lessons(course_id, title), profile(username)",
        )
        .eq("lessons.course_id", course.id);

      console.log(data);
      console.log(error);

      if (error) throw error;
      setLessonComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Calculate total students from courses
  const totalStudents = instructorCourses.reduce(
    (sum, course) => sum + (course.user_courses?.length || 0),
    0,
  );

  const totalRating =
    instructorCourses.length > 0
      ? instructorCourses.reduce((sum, course) => sum + (course.rating || 0), 0)
      : 0;

  let totalCourseRuntime = 0;
  instructorCourses.map((course) => {
    if (course.lessons && course.lessons.length > 0) {
      for (let i = 0; i < course.lessons.length; i++) {
        totalCourseRuntime =
          (course.lessons[i].runtime || 0) + totalCourseRuntime;
      }
    }
  });

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <>
      <InstructorProfileButton />
      <ModeToggle />

      <main className="max-w-7xl mx-auto px-6 pb-16 pt-22 min-h-screen">
        {/* Welcome Section */}
        <div className="flex justify-between w-full sm:items-center sm:flex-row flex-col">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Welcome back,{" "}
              {loggedUser?.user_metadata?.display_name?.split(" ")[0] ||
                "Instructor"}
              !
            </h2>
            <p className="text-muted-foreground mt-1">
              Here's your teaching overview for all the courses you have
              published or drafted
            </p>
          </div>
          <button
            className="w-fit flex mb-8 items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity font-medium cursor-pointer"
            onClick={() => {
              navigate("/instructor/create-course");
            }}
          >
            <Plus className="w-4 h-4" />
            Create New Course
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Students"
            value={totalStudents.toString()}
            subtext={`across ${instructorCourses.length} course${
              instructorCourses.length !== 1 ? "s" : ""
            }`}
          />
          <StatCard
            icon={BookOpen}
            label="Active Courses"
            value={instructorCourses.length.toString()}
            subtext={`${
              instructorCourses.filter((c) => c.is_published).length
            } published`}
          />
          <StatCard
            icon={Award}
            label="Avg Rating"
            value={
              instructorCourses.length > 0
                ? (totalRating / instructorCourses.length).toFixed(1)
                : "0"
            }
            subtext="out of 5 stars"
          />
          <StatCard
            icon={Clock}
            label="Total Hours"
            value={(totalCourseRuntime / 3600).toFixed(2)}
            subtext="of content taught"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-border mb-8">
          {["overview", "courses", "comments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-1 py-3 font-medium text-sm border-b-2 transition-colors cursor-pointer capitalize ${
                activeTab === tab
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Enrollment Chart */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-6">
                Student Enrollment Trend This Year
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="2 2"
                    stroke="var(--muted-foreground)"
                    opacity="20%"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="var(--muted-foreground)"
                    opacity="60%"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      fontSize: "12px",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="var(--primary)"
                    strokeWidth={1}
                    dot={{ fill: "var(--primary)", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Completion Pie Chart */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-6">
                Course Completion
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={completion}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    <Cell fill="var(--chart-1)" stroke="none" />
                    <Cell fill="var(--chart-2)" stroke="none" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {completion &&
                  completion.map((item, idx) => {
                    const colors = ["var(--chart-1)", "var(--chart-2)"];
                    return (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors[idx] }}
                          ></div>
                          <span className="text-muted-foreground">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-medium text-foreground">
                          {(item.value * 100).toFixed(0)}%
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            {instructorCourses.length === 0 ? (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  You haven't created any courses yet
                </p>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity font-medium">
                  <Plus className="w-4 h-4" />
                  Create Your First Course
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {instructorCourses.map((course, index) => (
                  <InstructorCourseCard
                    course={course}
                    key={course.id || index}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === "comments" && (
          <div className="space-y-6">
            {/* Course Selector */}
            <div className="bg-card rounded-xl border border-border p-6">
              <label className="text-sm font-medium text-foreground block mb-3">
                Select Course
              </label>
              <select
                value={selectedCourse?.id || ""}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Choose a course...</option>
                {instructorCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Comments List */}
            {selectedCourse ? (
              <div className="bg-card rounded-xl border border-border shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-6">
                    Lesson Comments - {selectedCourse.title}
                  </h3>
                  {lessonComments.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No comments on lessons yet
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {lessonComments.map((comment, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 pb-4 border-b border-border last:border-0"
                        >
                          <div className="w-10 h-10 rounded-[calc(var(--radius)-2px)] bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-primary">
                              {comment.profile?.username?.[0]?.toUpperCase() ||
                                "U"}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground">
                                {comment.profile?.username || "Unknown User"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(
                                  comment.created_at,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 mb-2">
                              On: {comment.lessons?.title || "Unknown Lesson"}
                            </p>
                            <p className="text-sm text-foreground">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select a course to view lesson comments
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default InstructorDashboard;
