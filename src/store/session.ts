import { generateQuestions } from '@/lib/generate';
import { QuestionResult, SessionConfig, SessionState } from '@/lib/types';
import { create } from 'zustand';

interface SessionStore {
  session: SessionState | null;
  startSession: (config: SessionConfig) => void;
  answerQuestion: (answer: number | null, duration: number) => void;
  endSession: () => void;
  reset: () => void;
}

const useSessionStore = create<SessionStore>((set, get) => ({
  session: null,
  startSession: (config) => {
    set({
      session: {
        config,
        questions: generateQuestions(config),
        currentQuestionIndex: 0,
        results: [],
        startTime: Date.now(),
        endTime: null
      }
    });
  },
  answerQuestion: (answer, duration) => {
    const session = get().session;
    if (!session) return;

    const currentQuestion = session.questions[session.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    set(state => {
      if (!state.session) return state;

      const result: QuestionResult = {
        userAnswer: answer,
        isCorrect,
        durationSeconds: duration,
        question: currentQuestion
      };

      return {
        ...state,
        session: {
          ...state.session,
          results: [...state.session.results, result],
          currentQuestionIndex: state.session.currentQuestionIndex + 1
        }
      };
    });
  },
  endSession: () => {
    set(state => ({
      ...state,
      session: {
        ...state.session!,
        endTime: Date.now()
      }
    }));
  },
  reset: () => set({ session: null }),
}));