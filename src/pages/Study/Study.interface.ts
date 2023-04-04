import { StudyListInfo } from '@api/dto';

export interface ModalInfo {
  mode: 'add' | 'modify';
  selectedStudy?: StudyListInfo;
}
