import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PartnerData {
  id: string;
  name: string;
  phone: string;
}

interface AbuseAnswer {
  message: string;
  from_support: number; // 1 - ответ от поддержки, 0 - от пользователя
  support_read_status: number;
  person_read_status: number;
}

interface Abuse {
  date: string; // Дата жалобы в формате YYYY-MM-DD HH:mm:ss
  person_name: string; // Имя человека, подавшего жалобу
  message: string; // Текст жалобы
  support_read_status: number; // Прочитала ли поддержку (1 - да, 0 - нет)
  support_answer_status: number; // Отвечена ли жалоба (1 - да, 0 - нет)
  answers: AbuseAnswer[]; // Массив ответов на жалобу
}

export interface Call {
  id: number;
  partnership_id: string;
  partner_data: PartnerData;
  date: string;
  date_notime: string;
  time: number;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: string;
  record: string;
  line_number: string;
  line_name: string;
  in_out: number;
  from_site: number;
  source: string;
  errors: any[];
  disconnect_reason: string;
  results: any[];
  stages: any[];
  abuse?: Abuse;
  contact_name: string;
  contact_company: string;
  person_id: number;
  person_name: string;
  person_surname: string;
  person_avatar: string;
}

export type Header = { type: 'header'; date: string; count: number };
export type CallItem = Call | Header;

export interface CallsState {
  items: CallItem[];
}

const initialState: CallsState = {
  items: [],
};

export const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    setCalls: (state, action: PayloadAction<CallItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setCalls } = callsSlice.actions;
export default callsSlice.reducer;
