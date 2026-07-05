import { API_BASE_URL } from './config';

export type DiagnosisResult = {
  source: 'llm' | 'model';
  disease_en: string;
  disease_ur: string;
  confidence: number;
  serious: boolean;
  first_aid_en: string[];
  first_aid_ur: string[];
  reasoning_en?: string | null;
  reasoning_ur?: string | null;
  differential?: { disease_en: string; disease_ur: string; confidence: number }[] | null;
};

export type DiagnoseResponse = {
  llm: DiagnosisResult | null;
  model: DiagnosisResult | null;
  llm_error?: string | null;
  model_error?: string | null;
};

export type DiagnoseRequest = {
  animal: string;
  sex: string;
  age: string;
  symptoms: string[];
  lang?: string;
};

export async function fetchDiagnosis(payload: DiagnoseRequest): Promise<DiagnoseResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}/api/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error(
        `Could not reach the server at ${API_BASE_URL}. Check that your phone and computer are on the same Wi-Fi, and that the backend IP in config.ts is current.`
      );
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Diagnosis request failed (${res.status}): ${text}`);
  }

  return res.json();
}