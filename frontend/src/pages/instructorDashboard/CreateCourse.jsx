import React, { useEffect, useState } from "react";
import { Upload, X, AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getYouTubeInfo } from "@/lib/getYouTubeInfo";
import { supabase } from "@/supabaseClient";
import { useUser } from "@/utils/UserProvider";
import CourseCreationProgress from "@/components/CourseCreationProgress";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "",
    price: "",
    thumbnail_url: "",
    skill_path: "",
    badge: "",
    learning_plan: "",
    requirements: "",
    learning_outcomes: "",
  });
  const { userProfile, isLoading } = useUser();
  const [courseUploadStatus, setCourseUploadStatus] = useState({
    status: "",
    index: 0,
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [isExtractingLesson, setIsExtractingLesson] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({
    youtube_url: "",
    title: "",
    runtime: 0,
    description: "",
  });
  const [lessonErrors, setLessonErrors] = useState({
    youtube_url: "",
    title: "",
    runtime: "",
    description: "",
  });
  const levels = ["beginner", "intermediate", "advanced"];
  const skillPaths = [
    "web development",
    "python programming",
    "3d modeling and printing",
    "drone piloting",
    "entrepreneurship",
    "virtual reality development",
  ];
  const badges = [
    {
      value: "Junior Programmer",
      label: "⭐ Junior Programmer",
    },
  ];
  // Format duration from seconds to readable format
  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return "0m";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          thumbnail_url: "Please upload an image file",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          thumbnail_url: "Image size must be less than 5MB",
        }));
        return;
      }
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({
        ...prev,
        thumbnail_url: "",
      }));
    }
  };
  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    setFormData((prev) => ({
      ...prev,
      thumbnail_url: "",
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Course title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.level) newErrors.level = "Please select a level";
    if (!formData.price || isNaN(formData.price) || formData.price < 0)
      newErrors.price = "Valid price is required";
    if (!thumbnailPreview)
      newErrors.thumbnail_url = "Thumbnail image is required";
    if (!formData.skill_path)
      newErrors.skill_path = "Please select a skill path";
    if (!formData.badge) newErrors.badge = "Please select a badge";
    if (!formData.learning_plan.trim())
      newErrors.learning_plan = "Learning plan is required";
    if (!formData.requirements.trim())
      newErrors.requirements = "Requirements are required";
    if (!formData.learning_outcomes.trim())
      newErrors.learning_outcomes = "Learning outcomes are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateLesson = () => {
    const newErrors = {};
    if (!newLesson.youtube_url.trim()) {
      newErrors.youtube_url = "YouTube URL is required";
    }
    if (!newLesson.title.trim()) {
      newErrors.title = "Lesson title is required";
    }
    if (!newLesson.runtime || newLesson.runtime <= 0) {
      newErrors.runtime = "Lesson duration is required";
    }
    if (!newLesson.description.trim()) {
      newErrors.description = "Lesson description is required";
    }
    setLessonErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  window.addEventListener("focus", async () => {
    console.log(`runnin...`);
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      // If the session is bugged or gone, refresh it explicitly
      await supabase.auth.refreshSession();
    }

    console.log(`done...`);
  });

  const uploadThumbnail = async () => {
    try {
      setCourseUploadStatus({
        status: "Uploading course thumbnail...",
        index: 1,
      });
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("course_thumbnails")
        .upload(`${Date.now()}_${thumbnail.name}`, thumbnail, {
          contentType: thumbnail.type,
        });

      if (uploadError) {
        throw new Error(
          `Error uploading thumbnail image: ${uploadError.message}`,
        );
      }

      setCourseUploadStatus({
        status: "Received thumbnail path...",
        index: 2,
      });
      return uploadData.path;
    } catch (error) {
      console.error(`Error in thumbnail upload:`, error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    console.log("Form submission started");

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    try {
      setIsSubmitting(true);
      const path = await uploadThumbnail();
      console.log(path, "path");
      const publicURL = `${import.meta.env.VITE_SUPABASE_BUCKET_URL}${path}`;
      console.log("Public URL generated:", publicURL);

      console.log("Course insertion starting...");

      setCourseUploadStatus({
        status: "Course insertion starting...",
        index: 3,
      });

      const { data: insertCourseData, error: insertCourseError } =
        await supabase
          .from("course")
          .insert({
            title: formData.title,
            badge_title: formData.badge,
            price: parseFloat(formData.price),
            rating: 0,
            thumbnail_url: publicURL,
            instructor_id: userProfile.id,
            skill_path: formData.skill_path,
            level: formData.level,
            description: formData.description,
            learning_plan: formData.learning_plan,
            learning_outcomes: formData.learning_outcomes,
            requirements: formData.requirements,
            is_published: true,
          })
          .select("id")
          .maybeSingle();

      console.log({
        title: formData.title,
        badge_title: formData.badge,
        price: parseFloat(formData.price),
        rating: 0,
        thumbnail_url: publicURL,
        instructor_id: userProfile.id,
        skill_path: formData.skill_path,
        level: formData.level,
        description: formData.description,
        learning_plan: formData.learning_plan,
        learning_outcomes: formData.learning_outcomes,
        requirements: formData.requirements,
        is_published: true,
      });

      if (insertCourseError) {
        throw new Error(`Error creating course: ${insertCourseError.message}`);
      }

      setCourseUploadStatus({
        status: "Course data saved!! Inserting Lessons...",
        index: 4,
      });

      const courseId = insertCourseData.id;
      console.log("Course created with ID:", courseId);

      console.log("Inserting lessons...");
      const lessonsToInsert = lessons.map((lesson) => {
        console.log({
          course_id: courseId,
          title: lesson.title,
          description: lesson.description,
          video_url: lesson.youtube_url,
          runtime: lesson.runtime,
        });
        return {
          course_id: courseId,
          title: lesson.title,
          description: lesson.description,
          video_url: lesson.youtube_url,
          runtime: lesson.runtime,
        };
      });

      const { data: insertLessonData, error: insertLessonError } =
        await supabase
          .from("lessons")
          .insert(lessonsToInsert) // Pass the entire array here
          .select()
          .maybeSingle();

      if (insertLessonError) {
        throw new Error(`Error inserting lesson: ${insertLessonError.message}`);
      }

      setCourseUploadStatus({
        status: "Lessons Saved!! Course Created Successfully...",
        index: 5,
      });

      console.log(insertLessonData);
      console.log("All lessons inserted successfully");

      setSuccessMessage("Course created successfully!");
      setFormData({
        title: "",
        description: "",
        level: "",
        price: "",
        thumbnail_url: "",
        skill_path: "",
        badge: "",
        learning_plan: "",
        requirements: "",
        learning_outcomes: "",
      });
      removeThumbnail();
      setLessons([]);
    } catch (error) {
      console.error("Error creating course:", error);
      setErrors({
        submit: "Failed to create course. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      console.log("Submission complete");
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      level: "",
      price: "",
      thumbnail_url: "",
      skill_path: "",
      badge: "",
      learning_plan: "",
      requirements: "",
      learning_outcomes: "",
    });
    removeThumbnail();
    setLessons([]);
    setNewLesson({
      youtube_url: "",
      title: "",
      runtime: 0,
      description: "",
    });
    setErrors({});
    setLessonErrors({
      youtube_url: "",
      title: "",
      runtime: "",
      description: "",
    });
  };
  const extractYouTubeInfo = async (url) => {
    if (!url.trim()) {
      setLessonErrors((prev) => ({
        ...prev,
        youtube_url: "YouTube URL is required",
      }));
      return;
    }
    setIsExtractingLesson(true);
    try {
      const data = await getYouTubeInfo(url);
      setNewLesson((prev) => ({
        ...prev,
        title: data.title,
        runtime: data.duration,
      }));
      setLessonErrors((prev) => ({
        ...prev,
        youtube_url: "",
      }));
    } catch (error) {
      console.error("Error extracting youtube video:", error);
      setLessonErrors((prev) => ({
        ...prev,
        youtube_url:
          "Failed to extract video info. Please enter details manually.",
      }));
    } finally {
      setIsExtractingLesson(false);
    }
  };
  const handleLessonAdd = () => {
    if (!validateLesson()) {
      return;
    }
    setLessons((prev) => [
      ...prev,
      {
        ...newLesson,
        id: Date.now(),
      },
    ]);
    setNewLesson({
      youtube_url: "",
      title: "",
      runtime: 0,
      description: "",
    });
    setLessonErrors({
      youtube_url: "",
      title: "",
      runtime: "",
      description: "",
    });
  };
  const removeLesson = (id) => {
    setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {isSubmitting && (
        <CourseCreationProgress courseStatus={courseUploadStatus} />
      )}
      <div className="max-w-4xl mx-auto">
        {/* <button onClick={insertCourseData}>Test Submission</button> */}
        {/* <p>{courseUploadStatus}</p> */}
        <div
          className="flex gap-2 text-foreground/50 items-center mb-8 cursor-pointer hover:text-foreground/40"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={12} /> Back
        </div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Create New Course
          </h1>
          <p className="text-muted-foreground mt-2">
            Fill in the details below to create your new course
          </p>
        </div>
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-chart-4/10 border border-chart-4 text-chart-4 rounded-xl flex items-center gap-3">
            <span className="text-xl">✓</span>
            <p>{successMessage}</p>
          </div>
        )}
        {/* Error Message */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive text-destructive rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p>{errors.submit}</p>
          </div>
        )}
        {/* Form */}
        <form
          className="bg-card rounded-xl border border-border p-8 space-y-8 shadow-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Title */}
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-2"
              htmlFor="title"
            >
              Course Title *
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Introduction to Web Development"
              className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.title
                  ? "border-destructive ring-destructive/20"
                  : "border-border"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-destructive mt-1.5">{errors.title}</p>
            )}
          </div>
          {/* Description */}
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-2"
              htmlFor="description"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide a detailed description of your course..."
              rows="4"
              className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                errors.description
                  ? "border-destructive ring-destructive/20"
                  : "border-border"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-destructive mt-1.5">
                {errors.description}
              </p>
            )}
          </div>
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level */}
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-2"
                htmlFor="level"
              >
                Level *
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer ${
                  errors.level
                    ? "border-destructive ring-destructive/20"
                    : "border-border"
                }`}
              >
                <option value="">Select a level</option>
                {levels.map((level) => (
                  <option key={level} value={level} className="capitalize">
                    {level}
                  </option>
                ))}
              </select>
              {errors.level && (
                <p className="text-xs text-destructive mt-1.5">
                  {errors.level}
                </p>
              )}
            </div>
            {/* Price */}
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-2"
                htmlFor="price"
              >
                Price (GH₵) *
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 99.99"
                min="0"
                step="0.01"
                className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.price
                    ? "border-destructive ring-destructive/20"
                    : "border-border"
                }`}
              />
              {errors.price && (
                <p className="text-xs text-destructive mt-1.5">
                  {errors.price}
                </p>
              )}
            </div>
          </div>
          {/* Thumbnail Image */}
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-2"
              htmlFor="thumbnail"
            >
              Thumbnail Image *
            </label>
            {thumbnailPreview ? (
              <div className="relative w-full">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-64 object-cover rounded-[calc(var(--radius)-2px)] border border-border"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute top-2 right-2 p-1 bg-destructive text-primary-foreground rounded-[calc(var(--radius)-4px)] hover:opacity-90 transition-opacity"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-[calc(var(--radius)-2px)] cursor-pointer transition-colors ${
                  errors.thumbnail_url
                    ? "border-destructive bg-destructive/5 hover:bg-destructive/10"
                    : "border-border bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
            )}
            {errors.thumbnail_url && (
              <p className="text-xs text-destructive mt-1.5">
                {errors.thumbnail_url}
              </p>
            )}
          </div>
          {/* Skill Path and Badge */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skill Path */}
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-2"
                htmlFor="skill_path"
              >
                Skill Path *
              </label>
              <select
                id="skill_path"
                name="skill_path"
                value={formData.skill_path}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer ${
                  errors.skill_path
                    ? "border-destructive ring-destructive/20"
                    : "border-border"
                }`}
              >
                <option value="">Select a skill path</option>
                {skillPaths.map((path) => (
                  <option key={path} value={path} className="capitalize">
                    {path}
                  </option>
                ))}
              </select>
              {errors.skill_path && (
                <p className="text-xs text-destructive mt-1.5">
                  {errors.skill_path}
                </p>
              )}
            </div>
            {/* Badge */}
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-2"
                htmlFor="badge"
              >
                Course Badge *
              </label>
              <select
                id="badge"
                name="badge"
                value={formData.badge}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer ${
                  errors.badge
                    ? "border-destructive ring-destructive/20"
                    : "border-border"
                }`}
              >
                <option value="">Select a badge</option>
                {badges.map((badge, index) => (
                  <option key={index} value={badge.value}>
                    {badge.label}
                  </option>
                ))}
              </select>
              {errors.badge && (
                <p className="text-xs text-destructive mt-1.5">
                  {errors.badge}
                </p>
              )}
            </div>
          </div>
          {/* Learning Plan */}
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-2"
              htmlFor="learning_plan"
            >
              Learning Plan *
            </label>
            <textarea
              id="learning_plan"
              name="learning_plan"
              value={formData.learning_plan}
              onChange={handleInputChange}
              placeholder="Outline the structure and modules of your course..."
              rows="4"
              className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                errors.learning_plan
                  ? "border-destructive ring-destructive/20"
                  : "border-border"
              }`}
            />
            {errors.learning_plan && (
              <p className="text-xs text-destructive mt-1.5">
                {errors.learning_plan}
              </p>
            )}
          </div>
          {/* Requirements */}
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-2"
              htmlFor="requirements"
            >
              Requirements *
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              placeholder="List prerequisites or requirements for this course..."
              rows="4"
              className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                errors.requirements
                  ? "border-destructive ring-destructive/20"
                  : "border-border"
              }`}
            />
            {errors.requirements && (
              <p className="text-xs text-destructive mt-1.5">
                {errors.requirements}
              </p>
            )}
          </div>
          {/* Learning Outcomes */}
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-2"
              htmlFor="learning_outcomes"
            >
              Learning Outcomes *
            </label>
            <textarea
              id="learning_outcomes"
              name="learning_outcomes"
              value={formData.learning_outcomes}
              onChange={handleInputChange}
              placeholder="Describe what students will learn by the end of this course..."
              rows="4"
              className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                errors.learning_outcomes
                  ? "border-destructive ring-destructive/20"
                  : "border-border"
              }`}
            />
            {errors.learning_outcomes && (
              <p className="text-xs text-destructive mt-1.5">
                {errors.learning_outcomes}
              </p>
            )}
          </div>
          {/* Add Lessons Section */}
          <div className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Add Lessons
            </h2>
            {/* Add Lesson Form */}
            <div className="bg-muted/30 rounded-[calc(var(--radius)-2px)] p-6 mb-6 space-y-4">
              {/* YouTube URL */}
              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-2"
                  htmlFor="youtube_url"
                >
                  YouTube URL *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    id="youtube_url"
                    name="youtube_url"
                    value={newLesson.youtube_url}
                    onChange={(e) => {
                      setNewLesson((prev) => ({
                        ...prev,
                        youtube_url: e.target.value,
                      }));
                    }}
                    placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    className={`flex-1 px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      lessonErrors.youtube_url
                        ? "border-destructive ring-destructive/20"
                        : "border-border"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => extractYouTubeInfo(newLesson.youtube_url)}
                    disabled={
                      isExtractingLesson || !newLesson.youtube_url.trim()
                    }
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-[calc(var(--radius)-2px)] hover:opacity-90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isExtractingLesson ? "Extracting..." : "Extract Info"}
                  </button>
                </div>
                {lessonErrors.youtube_url && (
                  <p className="text-xs text-destructive mt-1.5">
                    {lessonErrors.youtube_url}
                  </p>
                )}
              </div>
              {/* Lesson Title */}
              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-2"
                  htmlFor="lesson_title"
                >
                  Lesson Title *
                </label>
                <input
                  type="text"
                  id="lesson_title"
                  name="title"
                  value={newLesson.title}
                  onChange={(e) =>
                    setNewLesson((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Lesson title will appear here after extraction..."
                  className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    lessonErrors.title
                      ? "border-destructive ring-destructive/20"
                      : "border-border"
                  }`}
                />
                {lessonErrors.title && (
                  <p className="text-xs text-destructive mt-1.5">
                    {lessonErrors.title}
                  </p>
                )}
              </div>
              {/* Runtime */}
              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-2"
                  htmlFor="runtime"
                >
                  Duration (seconds) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    id="runtime"
                    name="runtime"
                    value={newLesson.runtime}
                    onChange={(e) =>
                      setNewLesson((prev) => ({
                        ...prev,
                        runtime: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="Duration in seconds (auto-filled)"
                    className={`flex-1 px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      lessonErrors.runtime
                        ? "border-destructive ring-destructive/20"
                        : "border-border"
                    }`}
                  />
                  {newLesson.runtime > 0 && (
                    <div className="px-4 py-2 bg-background border border-border rounded-[calc(var(--radius)-2px)] text-foreground text-sm font-medium flex items-center whitespace-nowrap">
                      {formatDuration(newLesson.runtime)}
                    </div>
                  )}
                </div>
                {lessonErrors.runtime && (
                  <p className="text-xs text-destructive mt-1.5">
                    {lessonErrors.runtime}
                  </p>
                )}
              </div>
              {/* Lesson Description */}
              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-2"
                  htmlFor="lesson_description"
                >
                  Lesson Description *
                </label>
                <textarea
                  name="description"
                  id="lesson_description"
                  value={newLesson.description}
                  onChange={(e) =>
                    setNewLesson((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe what this lesson covers..."
                  rows="3"
                  className={`w-full px-4 py-2 bg-background border rounded-[calc(var(--radius)-2px)] text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                    lessonErrors.description
                      ? "border-destructive ring-destructive/20"
                      : "border-border"
                  }`}
                />
                {lessonErrors.description && (
                  <p className="text-xs text-destructive mt-1.5">
                    {lessonErrors.description}
                  </p>
                )}
              </div>
              {/* Add Lesson Button */}
              <button
                type="button"
                onClick={handleLessonAdd}
                className="w-full px-4 py-2 bg-chart-4 text-primary-foreground rounded-[calc(var(--radius)-2px)] hover:opacity-90 transition-all font-medium"
              >
                Add Lesson
              </button>
            </div>
            {/* Lessons List */}
            {lessons.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Added Lessons ({lessons.length})
                </h3>
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="bg-muted/30 rounded-[calc(var(--radius)-2px)] p-4 border border-border flex items-start justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDuration(lesson.runtime)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {lesson.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLesson(lesson.id)}
                      className="p-2 hover:bg-destructive/10 rounded-[calc(var(--radius)-4px)] transition-colors shrink-0"
                    >
                      <X className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Submit Button */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <button
              onClick={handleSubmit}
              // onClick={uploadThumbnail}
              // disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Course..." : "Create Course"}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-border text-foreground rounded-xl hover:bg-muted transition-colors font-medium"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateCourse;
