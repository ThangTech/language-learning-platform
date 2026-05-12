import api from "./api";
import type { ApiResponse, PagedResult } from "../interfaces/common";
import type { ListeningLessonDto, DictationSetDto } from "../interfaces/listening";

const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h} giờ ${m} phút` : `${m} phút`;
};

const getLevelColor = (level: string): string => {
  const colors: Record<string, string> = {
    A1: "bg-green-100 text-green-800",
    A2: "bg-yellow-100 text-yellow-800",
    B1: "bg-blue-100 text-blue-800",
    B2: "bg-purple-100 text-purple-800",
  };
  return colors[level] || "bg-gray-100 text-gray-800";
};

const getTopicIcon = (topic: string): string => {
  const icons: Record<string, string> = {
    Announcements: "announcement",
    Conversations: "conversation",
    Talks: "talk",
  };
  return icons[topic] || "listening";
};

const toDto = (lesson: any): ListeningLessonDto => {
  const totalMinutes = lesson.duration || 0;
  return {
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    audioUrl: lesson.audioUrl,
    level: lesson.level,
    levelColor: getLevelColor(lesson.level),
    topic: lesson.topic,
    topicIcon: getTopicIcon(lesson.topic),
    duration: totalMinutes,
    totalDuration: totalMinutes * 60,
    durationText: formatDuration(totalMinutes),
    transcriptJson: lesson.transcriptJson,
    audioTitle: lesson.title,
    totalExercises: lesson.quizzes?.length || 0,
  };
};

export const getLessons = async (page: number = 1, pageSize: number = 20, level?: string, search?: string) => {
  const response = await api.get<ApiResponse<PagedResult<ListeningLessonDto>>>("/api/listening", {
    params: { page, pageSize, level, search },
  });

  if (response.data?.success && response.data.data) {
    response.data.data.items = response.data.data.items.map(toDto);
  }

  return response.data;
};

export const getLessonById = async (id: string) => {
  const response = await api.get<ApiResponse<ListeningLessonDto>>(`/api/listening/${id}`);
  if (response.data?.success && response.data.data) {
    response.data.data = toDto(response.data.data);
  }
  return response.data;
};

export const submitListeningResult = async (lessonId: string, score: number) => {
  const response = await api.post<ApiResponse<any>>("/api/listening/result", { lessonId, score });
  return response.data;
};

export const getUserListeningResults = async () => {
  const response = await api.get<ApiResponse<any[]>>("/api/listening/results");
  return response.data;
};

export const getDictationSets = async () => {
  const response = await api.get<ApiResponse<DictationSetDto[]>>("/api/dictation");
  return response.data;
};

export const getDictationSetById = async (id: string) => {
  const response = await api.get<ApiResponse<DictationSetDto>>(`/api/dictation/${id}`);
  return response.data;
};
