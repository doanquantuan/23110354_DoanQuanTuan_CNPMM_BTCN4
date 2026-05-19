// src/pages/CourseDetailPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Clock3,
  BookOpen,
  Users,
  Star,
  PlayCircle,
  CheckCircle2,
  CalendarDays,
  Award,
  CheckCircle,
  Lightbulb,
  ChevronDown,
} from "lucide-react";

import {
  fetchCourseDetail,
  fetchCourseSections,
} from "../redux/slices/courseSlice";

import { fetchLessonsBySectionId } from "../redux/slices/sectionSlice";

const CourseDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { courseDetail, sections, loading } = useSelector(
    (state) => state.course,
  );

  const [activeSectionId, setActiveSectionId] = useState(null);

  const [sectionData, setSectionData] = useState([]);

  const { lessonsBySection } = useSelector((state) => state.section);
  console.log(lessonsBySection);

  useEffect(() => {
    dispatch(fetchCourseDetail(id));
    dispatch(fetchCourseSections(id));
  }, [dispatch, id]);

  useEffect(() => {
    setSectionData(sections || []);
  }, [sections]);

  const handleToggleSection = async (sectionId) => {
    if (activeSectionId === sectionId) {
      setActiveSectionId(null);
      return;
    }

    // nếu chưa có data mới fetch
    if (!lessonsBySection[sectionId]) {
      dispatch(fetchLessonsBySectionId(sectionId));
    }

    setActiveSectionId(sectionId);
  };

  if (loading || !courseDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-10">
      {/* HERO */}
      <section className="bg-[#072B59] text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <p className="text-sm text-slate-300 mb-3">
              Trang chủ / Khóa học / Chi tiết
            </p>

            <h1 className="text-4xl font-bold leading-tight mb-4">
              {courseDetail.title}
            </h1>

            <p className="text-slate-300 leading-7 mb-6">
              {courseDetail.description}
            </p>

            {/* INFO */}
            <div className="flex flex-wrap gap-6 text-sm mb-8">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-yellow-400" />
                <span>4.9 đánh giá</span>
              </div>

              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>500+ học viên</span>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>40 bài học</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={18} />
                <span>200 giờ</span>
              </div>
            </div>

            {/* TEACHER */}
            {/*<div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4 max-w-md">
              <img
                src={
                  courseDetail.teacher?.avatar || "https://i.pravatar.cc/100"
                }
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {courseDetail.teacher?.name}
                </h3>

                <p className="text-sm text-slate-300">
                  Giảng viên Fullstack Developer
                </p>
              </div>
            </div>
                */}
          </div>

          {/* RIGHT CARD */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl sticky top-5">
              <img
                src={courseDetail.thumbnail}
                alt=""
                className="w-full h-52 object-cover"
              />

              <div className="p-6">
                <div className="flex items-end gap-3 mb-5">
                  <h2 className="text-3xl font-bold text-blue-700">
                    {Number(courseDetail.price).toLocaleString("vi-VN")}đ
                  </h2>

                  <span className="text-slate-400 line-through">
                    16,000,000đ
                  </span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 rounded-xl mb-3">
                  Đăng ký ngay
                </button>

                <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all font-semibold py-3 rounded-xl">
                  Học thử miễn phí
                </button>

                <div className="border-t mt-6 pt-6 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Khai giảng</span>
                    <span className="font-medium">24/12/2025</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Lịch học</span>
                    <span className="font-medium">T2 - T4 - T6</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Hình thức</span>
                    <span className="font-medium">Online</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Trình độ</span>
                    <span className="font-medium">Tất cả</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-3 space-y-6">
          {/* COURSE INTRO */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              Tổng quan khóa học
            </h2>

            <div className="w-20 h-1 bg-blue-600 rounded-full mb-6"></div>

            <div
              className="prose max-w-none text-slate-700"
              dangerouslySetInnerHTML={{
                __html: courseDetail?.overview,
              }}
            />
          </div>

          {/* COURSE CONTENT */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Nội dung khóa học</h2>

              <span className="text-slate-500">
                {sectionData?.length} chương
              </span>
            </div>

            <div className="space-y-4">
              {sectionData?.map((section, index) => {
                const isOpen = activeSectionId === section.id;

                return (
                  <div
                    key={section.id}
                    className="border rounded-xl overflow-hidden"
                  >
                    <div
                      onClick={() => handleToggleSection(section.id)}
                      className="bg-slate-50 px-5 py-4 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h3 className="font-semibold">
                          Chương {index + 1}: {section.title}
                        </h3>

                        <span className="text-sm text-slate-500">
                          {section.lessons?.length || 0} bài học
                        </span>
                      </div>

                      <ChevronDown
                        size={20}
                        className={`transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {isOpen && (
                      <div>
                        {lessonsBySection[section.id]?.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between px-5 py-4 border-t"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle size={18} className="text-blue-600" />

                              <span>{lesson.title}</span>
                            </div>

                            <span className="text-sm text-slate-500">
                              {lesson.duration} phút
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Mục tiêu khóa học</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {courseDetail?.objectives?.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-2xl
                    p-5
                    hover:border-blue-500
                    hover:shadow-md
                    transition-all
                "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Award size={20} className="text-blue-600" />
                    </div>

                    <p className="text-slate-700 leading-7">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">
              Kết quả đạt được sau khóa học
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {courseDetail?.outcomes?.map((item) => (
                <div
                  key={item.id}
                  className="
          bg-slate-50
          border
          border-slate-200
          rounded-2xl
          p-5
          hover:border-green-500
          hover:shadow-md
          transition-all
        "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>

                    <p className="text-slate-700 leading-7">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">
              Đối tượng tham gia khóa học
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {courseDetail?.targets?.map((item) => (
                <div
                  key={item.id}
                  className="
          bg-slate-50
          border
          border-slate-200
          rounded-2xl
          p-5
          hover:border-purple-500
          hover:shadow-md
          transition-all
        "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <Users size={20} className="text-purple-600" />
                    </div>

                    <p className="text-slate-700 leading-7">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">
              Lý do bạn nên học khóa học này
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {courseDetail?.reasons?.map((item) => (
                <div
                  key={item.id}
                  className="
          bg-slate-50
          border
          border-slate-200
          rounded-2xl
          p-5
          hover:border-yellow-500
          hover:shadow-md
          transition-all
        "
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                      <Lightbulb size={20} className="text-yellow-600" />
                    </div>

                    <p className="text-slate-700 leading-7">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REVIEW */}
          {/*<div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Đánh giá học viên</h2>

            <div className="flex items-center gap-10">
              <div>
                <h3 className="text-6xl font-bold text-blue-700">4.9</h3>

                <div className="flex mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-slate-500 mt-2">999 đánh giá</p>
              </div>

              <div className="flex-1 space-y-3">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-3">{star}</span>

                    <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-yellow-400 ${
                          star === 5
                            ? "w-[90%]"
                            : star === 4
                              ? "w-[8%]"
                              : "w-[2%]"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* COUNTDOWN */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-5">Ưu đãi kết thúc sau</h3>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-blue-50 rounded-xl py-4">
                <h4 className="text-2xl font-bold text-blue-700">02</h4>
                <p className="text-sm text-slate-500">Ngày</p>
              </div>

              <div className="bg-blue-50 rounded-xl py-4">
                <h4 className="text-2xl font-bold text-blue-700">14</h4>
                <p className="text-sm text-slate-500">Giờ</p>
              </div>

              <div className="bg-blue-50 rounded-xl py-4">
                <h4 className="text-2xl font-bold text-blue-700">37</h4>
                <p className="text-sm text-slate-500">Phút</p>
              </div>
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-5">Lịch học chi tiết</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <CalendarDays className="text-blue-600" />

                <div>
                  <p className="font-medium">Ngày khai giảng</p>
                  <p className="text-sm text-slate-500">24/12/2025</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock3 className="text-blue-600" />

                <div>
                  <p className="font-medium">Giờ học</p>
                  <p className="text-sm text-slate-500">19:00 - 21:00</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Users className="text-blue-600" />

                <div>
                  <p className="font-medium">Số lượng</p>
                  <p className="text-sm text-slate-500">30 học viên</p>
                </div>
              </div>
            </div>
          </div>

          {/* RELATED */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-5">Khóa học liên quan</h3>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3 border-b pb-4">
                  <img
                    src="https://picsum.photos/200/200"
                    alt=""
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div>
                    <h4 className="font-medium line-clamp-2">
                      React NodeJS Fullstack
                    </h4>

                    <p className="text-blue-600 font-semibold mt-2">
                      3,500,000đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
