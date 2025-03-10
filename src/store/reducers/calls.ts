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

export interface CallFilters {
  date_start: string; // Дата начала периода
  date_end: string; // Дата конца периода
  in_out?: number; // Тип звонка: 0 - входящий, 1 - исходящий, undefined - все
  sort_by: 'date' | 'duration'; // Поле сортировки
  order: 'ASC' | 'DESC'; // Направление сортировки
}

export interface Call {
  id: number; // Уникальный идентификатор звонка
  partnership_id: string; // ID партнёрства
  partner_data: PartnerData; // Данные о партнёре
  date: string; // Дата и время звонка (YYYY-MM-DD HH:mm:ss)
  date_notime: string; // Дата звонка без времени (YYYY-MM-DD)
  time: number; // Длительность звонка в секундах
  from_number: string; // Номер, с которого звонили
  from_extension: string; // Внутренний номер отправителя (если есть)
  to_number: string; // Номер, на который звонили
  to_extension: string; // Внутренний номер получателя (если есть)
  is_skilla: number; // Флаг звонка через Skilla (0 - нет, 1 - да)
  status: string; // Статус звонка (например, "Дозвонился")
  record: string; // Код записи звонка
  line_number: string; // SIP-номер линии
  line_name: string; // Название линии (источник)
  in_out: number; // Направление звонка (0 - входящий, 1 - исходящий)
  from_site: number; // Звонок с сайта (0 - нет, 1 - да)
  source: string; // Источник звонка (если указан)
  errors: any[]; // Массив ошибок, связанных со звонком (если есть)
  disconnect_reason: string; // Причина завершения звонка
  results: any[]; // Результаты звонка (если есть)
  stages: any[]; // Этапы обработки звонка (если есть)
  abuse?: Abuse; // Жалобы, связанные с этим звонком (если есть)
  contact_name: string; // Имя контакта (если есть)
  contact_company: string; // Название компании (если есть)
  person_id: number; // ID человека, связанного со звонком
  person_name: string; // Имя человека
  person_surname: string; // Фамилия человека
  person_avatar: string; // URL аватара человека
}

export interface CallsState {
  items: Call[];
}

const initialState: CallsState = {
  items: [],
};

export const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    setCalls: (state, action: PayloadAction<Call[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setCalls } = callsSlice.actions;
export default callsSlice.reducer;
