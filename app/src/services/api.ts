import { supabase } from '@/lib/supabase';
import type { Test, TestResult } from '@/types';

export interface DbTest {
  id: string;
  title: string;
  description: string;
  category_id: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  questions_count: number;
  created_at: string;
  categories?: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
}

export interface DbQuestion {
  id: number;
  test_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
  order_index: number;
}

export interface DbTestResult {
  id: string;
  test_id: string;
  user_id: string | null;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_spent: number;
  answers: Record<number, number>;
  completed_at: string;
}

export async function getTests(): Promise<Test[]> {
  const { data: tests, error } = await supabase
    .from('tests')
    .select(`
      *,
      categories (id, name, icon, color)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tests:', error);
    return [];
  }

  return tests.map((t: DbTest) => ({
    id: t.id,
    title: t.title,
    description: t.description || '',
    category: t.categories?.name || 'Frontend',
    difficulty: t.difficulty,
    duration: t.duration,
    questionsCount: t.questions_count,
    icon: t.categories?.icon || '📝',
    color: t.categories?.color || '#00ffe0',
    questions: []
  }));
}

export async function getTestById(testId: string): Promise<Test | null> {
  const { data: test, error } = await supabase
    .from('tests')
    .select(`
      *,
      categories (id, name, icon, color)
    `)
    .eq('id', testId)
    .single();

  if (error || !test) {
    console.error('Error fetching test:', error);
    return null;
  }

  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('test_id', testId)
    .order('order_index', { ascending: true });

  return {
    id: test.id,
    title: test.title,
    description: test.description || '',
    category: test.categories?.name || 'Frontend',
    difficulty: test.difficulty,
    duration: test.duration,
    questionsCount: test.questions_count,
    icon: test.categories?.icon || '📝',
    color: test.categories?.color || '#00ffe0',
    questions: (questions || []).map((q: DbQuestion) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correct_answer,
      explanation: q.explanation || undefined
    }))
  };
}

export async function saveTestResult(result: TestResult): Promise<boolean> {
  const { error } = await supabase
    .from('test_results')
    .insert({
      test_id: result.testId,
      score: result.score,
      total_questions: result.totalQuestions,
      correct_answers: result.correctAnswers,
      time_spent: result.timeSpent,
      answers: result.answers,
      completed_at: result.completedAt
    });

  if (error) {
    console.error('Error saving test result:', error);
    return false;
  }

  return true;
}

export async function getTestResults(): Promise<TestResult[]> {
  const { data: results, error } = await supabase
    .from('test_results')
    .select('*')
    .order('completed_at', { ascending: false });

  if (error) {
    console.error('Error fetching test results:', error);
    return [];
  }

  return (results || []).map((r: DbTestResult) => ({
    testId: r.test_id,
    score: r.score,
    totalQuestions: r.total_questions,
    correctAnswers: r.correct_answers,
    timeSpent: r.time_spent,
    answers: r.answers,
    completedAt: r.completed_at
  }));
}

export async function clearTestResults(): Promise<boolean> {
  const { error } = await supabase
    .from('test_results')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (error) {
    console.error('Error clearing test results:', error);
    return false;
  }

  return true;
}

export async function getTestsByCategory(category: string): Promise<Test[]> {
  const { data: categories } = await supabase
    .from('categories')
    .select('id')
    .eq('name', category)
    .single();

  if (!categories) return [];

  const { data: tests, error } = await supabase
    .from('tests')
    .select(`
      *,
      categories (id, name, icon, color)
    `)
    .eq('category_id', categories.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tests by category:', error);
    return [];
  }

  return tests.map((t: DbTest) => ({
    id: t.id,
    title: t.title,
    description: t.description || '',
    category: t.categories?.name || 'Frontend',
    difficulty: t.difficulty,
    duration: t.duration,
    questionsCount: t.questions_count,
    icon: t.categories?.icon || '📝',
    color: t.categories?.color || '#00ffe0',
    questions: []
  }));
}
