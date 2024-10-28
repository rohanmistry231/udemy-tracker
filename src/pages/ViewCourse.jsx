// src/pages/ViewCourse.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Import theme context

const ViewCourse = () => {
  const { id } = useParams(); // Get course ID from URL params
  const { theme } = useTheme(); // Use theme context
  const isDarkMode = theme === 'dark'; // Determine if dark mode is active
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/courses/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading course details...</p>;

  return (
    <div className={`container mx-auto px-4 py-8 mt-10 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h2 className="text-4xl font-bold mb-4">{course.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-2xl font-semibold mb-2">Course Details</h3>
            <p><strong>Course Number:</strong> {course.no}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Priority:</strong> {course.categoryPriority}</p>
            <p><strong>Sub-Category:</strong> {course.subCategory}</p>
            <p><strong>Sub-Sub-Category:</strong> {course.subSubCategory}</p>
          </div>

          <div className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-2xl font-semibold mb-2">Additional Info</h3>
            <p><strong>Important Status:</strong> {course.importantStatus}</p>
            <p><strong>Status:</strong> {course.status}</p>
            <p><strong>Duration (Hours):</strong> {course.durationInHours}</p>
            <p><strong>Learning Skills Set:</strong> {course.learningSkillsSet}</p>
            <p><strong>Date Added:</strong> {new Date(course.dateAdded).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-2">Sub Learning Skills Set:</h3>
          <ul className="list-disc ml-6">
            {course.subLearningSkillsSet.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Notes</h3>
          {course.notes.length > 0 ? (
            <ul className="space-y-4">
              {course.notes.map((note, index) => (
                <li key={index} className={`border p-4 rounded shadow ${isDarkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                  <p><strong>Q:</strong> {note.question}</p>
                  <p><strong>A:</strong> {note.answer}</p>
                  <p className="text-sm text-gray-500">
                    Added on: {new Date(note.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notes available for this course.</p>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          <Link to={`/edit-course/${id}`} className={`p-2 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}>
            Edit Course
          </Link>
          <Link to="/courses" className={`p-2 rounded ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white transition`}>
            Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
