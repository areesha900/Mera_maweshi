import { API_BASE_URL } from './config';
import { DiagnosisResult } from './diagnosisApi';

export type FarmerProfile = {
  device_id: string;
  name: string;
  phone?: string | null;
  province: string;
  district: string;
  tehsil: string;
  created_at: string;
};

export type FarmerProfileInput = {
  device_id: string;
  name: string;
  phone?: string | null;
  province: string;
  district: string;
  tehsil: string;
};

export type DiagnosisRecord = {
  id: number;
  device_id: string;
  animal_type: string;
  sex: string;
  age_range: string;
  symptoms: string[];
  llm_disease_en?: string | null;
  llm_disease_ur?: string | null;
  llm_confidence?: number | null;
  model_disease_en?: string | null;
  model_disease_ur?: string | null;
  model_confidence?: number | null;
  serious: boolean;
  status: 'ongoing' | 'treated';
  first_aid_snapshot?: {
    llm: { en: string[]; ur: string[] } | null;
    model: { en: string[]; ur: string[] } | null;
  } | null;
  created_at: string;
};

export type SaveDiagnosisInput = {
  device_id: string;
  animal_type: string;
  sex: string;
  age_range: string;
  symptoms: string[];
  llm?: DiagnosisResult | null;
  model?: DiagnosisResult | null;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      ...options,
    });
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error(`Could not reach the server at ${API_BASE_URL}.`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request to ${path} failed (${res.status}): ${text}`);
  }
  return res.json();
}

/** Create or update the farmer's profile, keyed by device_id. */
export function upsertFarmer(payload: FarmerProfileInput): Promise<FarmerProfile> {
  return request<FarmerProfile>('/api/farmers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getFarmer(deviceId: string): Promise<FarmerProfile> {
  return request<FarmerProfile>(`/api/farmers/${encodeURIComponent(deviceId)}`);
}

/**
 * Save a completed diagnosis to history. Call this once, right after
 * fetchDiagnosis() resolves -- pass through whatever llm/model results
 * came back (either or both may be null if that source failed).
 */
function toSourceInput(result?: DiagnosisResult | null) {
  if (!result) return undefined;
  return {
    disease_en: result.disease_en,
    disease_ur: result.disease_ur,
    confidence: result.confidence,
    serious: result.serious,
    first_aid_en: result.first_aid_en,
    first_aid_ur: result.first_aid_ur,
  };
}

export function saveDiagnosis(input: SaveDiagnosisInput): Promise<DiagnosisRecord> {
  return request<DiagnosisRecord>('/api/diagnoses', {
    method: 'POST',
    body: JSON.stringify({
      device_id: input.device_id,
      animal_type: input.animal_type,
      sex: input.sex,
      age_range: input.age_range,
      symptoms: input.symptoms,
      llm: toSourceInput(input.llm),
      model: toSourceInput(input.model),
    }),
  });
}

export function listDiagnoses(deviceId: string): Promise<DiagnosisRecord[]> {
  return request<DiagnosisRecord[]>(`/api/diagnoses?device_id=${encodeURIComponent(deviceId)}`);
}

export function updateDiagnosisStatus(
  diagnosisId: number,
  deviceId: string,
  status: 'ongoing' | 'treated'
): Promise<DiagnosisRecord> {
  return request<DiagnosisRecord>(`/api/diagnoses/${diagnosisId}`, {
    method: 'PATCH',
    body: JSON.stringify({ device_id: deviceId, status }),
  });
}