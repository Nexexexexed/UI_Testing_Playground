import React, { useState, useEffect } from "react";
import "./Website.css";

// Типы для данных
interface Course {
  id: number;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  progress?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  enrolledCourses: number[];
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

// Имитация бэкенда
class TestingBackendService {
  private courses: Course[] = [
    {
      id: 1,
      title: "Основы тестирования",
      description: "Изучите базовые принципы тестирования ПО",
      level: "beginner",
      duration: "2 недели",
    },
    {
      id: 2,
      title: "Автоматизация тестирования",
      description: "Освойте инструменты автоматизированного тестирования",
      level: "intermediate",
      duration: "4 недели",
    },
    {
      id: 3,
      title: "Производительность и нагрузочное тестирование",
      description: "Научитесь тестировать производительность систем",
      level: "advanced",
      duration: "3 недели",
    },
  ];

  private users: User[] = [
    {
      id: 1,
      name: "Иван Петров",
      email: "ivan@example.com",
      enrolledCourses: [1],
    },
  ];

  // Имитация задержки сети
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getCourses(): Promise<ApiResponse<Course[]>> {
    await this.delay(800);
    return {
      data: this.courses,
      success: true,
      message: "Courses fetched successfully",
    };
  }

  async getUser(userId: number): Promise<ApiResponse<User>> {
    await this.delay(500);
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      return {
        data: user,
        success: true,
        message: "User found",
      };
    }
    throw new Error("User not found");
  }

  async enrollCourse(
    userId: number,
    courseId: number
  ): Promise<ApiResponse<User>> {
    await this.delay(1000);
    const userIndex = this.users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    if (!this.users[userIndex].enrolledCourses.includes(courseId)) {
      this.users[userIndex].enrolledCourses.push(courseId);
    }

    return {
      data: this.users[userIndex],
      success: true,
      message: "Successfully enrolled in course",
    };
  }
}

const Website: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [enrolling, setEnrolling] = useState<number | null>(null);

  const backendService = new TestingBackendService();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [coursesResponse, userResponse] = await Promise.all([
        backendService.getCourses(),
        backendService.getUser(1),
      ]);

      setCourses(coursesResponse.data);
      setUser(userResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: number) => {
    if (!user) return;

    try {
      setEnrolling(courseId);
      setError("");

      const response = await backendService.enrollCourse(user.id, courseId);
      setUser(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка при записи на курс"
      );
    } finally {
      setEnrolling(null);
    }
  };

  const isEnrolled = (courseId: number): boolean => {
    return user?.enrolledCourses.includes(courseId) || false;
  };

  const getLevelColor = (level: string): string => {
    switch (level) {
      case "beginner":
        return "#2ecc71";
      case "intermediate":
        return "#f39c12";
      case "advanced":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  return (
    <div className="testing-education-site">
      <header className="site-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>QA Academy</h1>
            </div>
            <nav className="main-nav">
              <ul>
                <li>
                  <a href="#courses">Курсы</a>
                </li>
                <li>
                  <a href="#about">О нас</a>
                </li>
                {user && <li className="user-info">Привет, {user.name}</li>}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Образовательный портал по тестированию ПО</h1>
          <p>Освойте профессию тестировщика с нуля до продвинутого уровня</p>
        </div>
      </section>

      {error && (
        <div className="error-message">
          <div className="container">
            <p>{error}</p>
            <button onClick={() => setError("")}>×</button>
          </div>
        </div>
      )}

      <section id="courses" className="courses-section">
        <div className="container">
          <h2 className="section-title">Доступные курсы</h2>

          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div
                  className="course-level-badge"
                  style={{ backgroundColor: getLevelColor(course.level) }}
                >
                  {course.level === "beginner"
                    ? "Начальный"
                    : course.level === "intermediate"
                    ? "Средний"
                    : "Продвинутый"}
                </div>

                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span className="duration">⏱️ {course.duration}</span>
                  </div>

                  {isEnrolled(course.id) ? (
                    <button className="btn enrolled" disabled>
                      ✅ Записан на курс
                    </button>
                  ) : (
                    <button
                      className="btn enroll-btn"
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrolling === course.id}
                    >
                      {enrolling === course.id
                        ? "Запись..."
                        : "Записаться на курс"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>{user?.enrolledCourses.length || 0}</h3>
              <p>Активных курсов</p>
            </div>
            <div className="stat-item">
              <h3>{courses.length}</h3>
              <p>Доступных программ</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Практических знаний</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; 2024 QA Academy. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Website;
